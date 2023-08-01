# Youtube API Search Endpoint

This project provides an API endpoint for searching Youtube videos.

## Prerequisites

- Node.js
- npm

## Setup

1. Clone the repository:

    ```
    git clone https://github.com/yourusername/yourrepository.git
    ```

2. Navigate to the project directory:

    ```
    cd yourrepository
    ```

3. Install the necessary packages:

    ```
    npm install
    ```

## Usage

1. Start the server:

    ```
    npm start
    ```

2. You can then send GET requests to `http://localhost:3000/api/youtube` with the `search` query parameter.

For example: 

    ```
    http://localhost:3000/api/youtube?search=muse
    ```

This will return up to 10 Youtube videos that match the search query.

## Testing

To run the tests:

    ```
    npm test
    ```

This will execute all test cases located in the `test` directory.

## Endpoint

The endpoint has the following structure:

    GET /api/youtube?search=your_search_term

And the response will be an array of videos with the following structure:

    ```
    [
      {
        "published_at": "2009-10-09T13:15:12.000Z",
        "id": "X8f5RgwY8CI",
        "title": "MUSE - Algorithm [Official Music Video]",
        "description": "Description here...",
        "thumbnail": "https://i.ytimg.com/vi/TPE9uSFFxrI/default.jpg",
        "video_link": "https://www.youtube.com/watch?v=X8f5RgwY8CI",
        "extra": {
          "something": "extra"
        }
      },
      //... more videos
    ]
    ```
