require('dotenv').config();

// Import testing utilities
let expect;
(async () => {
  const chai = await import('chai');
  expect = chai.expect;
})();

const request = require('supertest'); // For HTTP request testing
const app = require('../server.js'); // Application server

// Test suite for Authentication API Endpoints
describe('Auth API Endpoint Tests', () => {
  let userId;

  // Test: Register a new user successfully
  it('should register a new user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        username: 'testuser',
        password: 'password123',
      })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'User registered successfully');
        expect(res.body).to.have.property('userId');
        userId = res.body.userId;
        done();
      });
  });

  // Test: Fail to register a user due to missing username
  it('should fail to register a user with missing username', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        password: 'password123',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'Bad Request');
        expect(res.body).to.have.property('msg', 'Missing required fields: username');
        done();
      });
  });
  // Test: Fail to register a user due to user already existing
  it('should fail to register an already existing user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        username: 'testuser',
        password: 'password123',
      })
      .expect(409)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'Conflict');
        expect(res.body).to.have.property('msg', 'User already exists');
        done();
      });
  });
  // Test: Fail to register a user due to missing information
  it('should fail to register with missing fields', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        username: 'incompleteuser',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'Bad Request');
        expect(res.body).to.have.property('msg').that.includes('Missing required fields');
        done();
      });
  });
  // Test: Fail to login user due to incorrect password
  it('should fail login with incorrect password', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'Bad Request');
        expect(res.body).to.have.property('msg', 'Username or password is incorrect');
        done();
      });
  });
 // Test: Fail to login due to missing username
  it('should fail login with missing username', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        password: 'password123',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'Bad Request');
        expect(res.body).to.have.property('msg', 'Missing required fields: username');
        done();
      });
  });
  // Test: Successful login 
  it('should login successfully with correct credentials', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'User logged in successfully');
        expect(res.body).to.have.property('userId');
        done();
      });
  });
 // Test: Fail to delete user due to wrong password
  it('should fail to delete a user with incorrect password', (done) => {
    request(app)
      .delete('/api/auth/delete')
      .send({
        userId,
        password: 'wrongpassword',
      })
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'Forbidden');
        expect(res.body).to.have.property('msg', 'Password is incorrect');
        done();
      });
  });
  // Test: Successfully delete user
  it('should delete the user successfully', (done) => {
    request(app)
      .delete('/api/auth/delete')
      .send({
        userId,
        password: 'password123',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'User deleted successfully');
        done();
      });
  });
});
