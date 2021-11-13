const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;

describe('Testing GET routes for blog posts', async function () {
  it('Get ping result', (done) => {
    request(app)
    .get('/api/ping')
    .expect(200)
    .end((err, res) => {
        expect(res.body.success).equal(true)
        done();
    })
})
  it('Get posts match tags in query params', (done) => {
    request(app)
    .get('/api/posts?tags=history,tech')
    .expect(200)
    .end((err, res) => {
        expect(res.body.posts).to.be.an('array')
        done();
    })
  })
});