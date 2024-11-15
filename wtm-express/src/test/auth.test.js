require('dotenv').config();

let expect;
(async () => {
  const chai = await import('chai');
  expect = chai.expect;
})();

const request = require('supertest');
const app = require('../server.js');
;

describe('API Endpoint Tests', () => {
  it('should register a new user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        username: 'testuser@example.com',
        password: 'password123',
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'User registered successfully');
        done();
      });
  });

  it('should fail to register an already existing user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        username: 'testuser@example.com',
        password: 'password123',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'User already exists');
        done();
      });
  });

  it('should fail login with incorrect password', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser@example.com',
        password: 'wrongpassword',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'Username or password is incorrect');
        done();
      });
  });

  it('should login successfully with correct credentials', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser@example.com',
        password: 'password123',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('userId');
        done();
      });
  });
});
