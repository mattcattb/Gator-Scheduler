require('dotenv').config();

let expect;
(async () => {
  const chai = await import('chai');
  expect = chai.expect;
})();

const request = require('supertest');
const app = require('../server.js');

/*
describe('API Endpoints Tests', () => {
    it('should create a new event', (done)=>{
        request(app)
        .post('/api/event')
        .send({
            title:
        })
    })
})

*/