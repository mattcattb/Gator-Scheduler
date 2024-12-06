require('dotenv').config();

// Import testing utilities
let expect;
(async () => {
  const chai = await import('chai');
  expect = chai.expect;
})();

const request = require('supertest'); // For HTTP request testing
const app = require('../server.js'); // Application server

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
