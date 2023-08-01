const app = require('../app'); // path to your app.js file
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/youtube', () => {
  it('should return 200 and an array of videos for a valid search query', (done) => {
    chai.request(app)
      .get('/api/youtube?search=muse')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.most(10);
        done();
      });
  });

  it('should return 400 when not provided a search query', (done) => {
    chai.request(app)
      .get('/api/youtube')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.deep.equal({ error: 'Missing required parameter: search' });
        done();
      });
  });

  it('should return 404 when a search query does not match any videos', (done) => {
    chai.request(app)
      .get('/api/youtube?search=asdjklghasdkjlg') // unlikely to match any videos
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equal({ error: 'No videos found' });
        done();
      });
  });
});
