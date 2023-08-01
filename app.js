const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/api/youtube', async (req, res) => {
    const search = req.query.search;

    if(!search){
        return res.status(400).json({
            error: "Missing required parameter: search"
        });
    }

    try {
        const searchResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                key: 'AIzaSyDzEfOcS00m4agK8K_mZWI7_jg1ogNkw-o',
                type: 'video',
                part: 'snippet',
                maxResults: 10,
                q: search
            }
        });

        if (searchResponse.data.items.length === 0) {
            return res.status(404).json({
                error: "No videos found"
            });
        }

        const videoPromises = searchResponse.data.items.map(async (item) => {
            const videoId = item.id.videoId;

            // Getting the statistics for each video
            const videoResponse = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    key: 'AIzaSyDzEfOcS00m4agK8K_mZWI7_jg1ogNkw-o',
                    id: videoId,
                    part: 'statistics'
                }
            });

            const stats = videoResponse.data.items[0].statistics;
            return {
                published_at: item.snippet.publishedAt,
                id: videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.default.url,
                extra: {
                    views: stats.viewCount,
                    likes: stats.likeCount,
                    dislikes: stats.dislikeCount,
                    video_link: `https://www.youtube.com/watch?v=${videoId}`
                }
            };
        });

        const videos = await Promise.all(videoPromises);

        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({
            error: error.toString()
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
