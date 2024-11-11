require('dotenv').config();

const request = require('supertest');
const app = require('../server.js');
const { expect } = require('chai');
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