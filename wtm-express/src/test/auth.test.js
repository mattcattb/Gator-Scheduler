require('dotenv').config();

let expect;
(async () => {
  const chai = await import('chai');
  expect = chai.expect;
})();

const request = require('supertest');
const app = require('../server.js');

// const { connectdb, disconnectdb } = require('../repository/db');
// before(async function () {
//     this.timeout(10000); // Increase timeout if needed
//     await connectdb(); // Connect to the database before tests
//   });
  
//   after(async function () {
//     await disconnectdb(); // Disconnect from the database after all tests
//   });

describe('API Endpoint Tests', () => {
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
        done();
      });
  });

  it('should fail to register an already existing user', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        username: 'testuser',
        password: 'password123',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'User already exists');
        done();
      });
  });

  it('should fail to register with missing fields', (done) => {
    request(app)
      .post('/api/auth/register')
      .send({
        username: 'incompleteuser',
        // Missing name and password
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg').that.includes('Missing required fields');
        done();
      });
  });

  it('should fail login with incorrect password', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        name: 'Test User',
        username: 'testuser',
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
        name: 'Test User',
        username: 'testuser',
        password: 'password123',
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('userId');
        done();
      });
  });

  it('should fail login with missing fields', (done) => {
    request(app)
      .post('/api/auth/login')
      .send({
        username: '',
        password: '',
      })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg').that.includes('Missing required fields');
        done();
      });
  });
});
