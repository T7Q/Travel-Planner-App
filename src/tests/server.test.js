const app = require('../server/index');
const supertest = require('supertest');
const request = supertest(app);

describe('get endpoints correct', () => {
    it ('return html file', async done => {
        const res =  await request.get('/')
        expect(res.status).toBe(200);
        done();
    })
})