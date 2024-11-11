require('dotenv').config();

const request = require('supertest');
const app = require('../server.js');
const { expect } = require('chai');


describe("Sample test", ()=>{
    it('should assert 2==2 correctly', ()=>{
        let pi = 2;
        let rounded = 2;
        expect(pi).to.equal(rounded);
        //note: for floats, there is a "to.be.closeTo" because of float imprecision
    })
})