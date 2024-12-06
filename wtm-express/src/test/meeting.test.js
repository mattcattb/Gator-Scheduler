require('dotenv').config();

// Import necessary libraries for testing
let expect;
(async () => {
  const chai = await import('chai');
  expect = chai.expect;
})();

const request = require('supertest'); // For HTTP request testing
const app = require('../server.js'); // Application server

let testUserId, testMeetingId, invitedUserId; // Variables to store test data

// Test suite for Meeting API Endpoints
describe('Meeting API Endpoint Tests', () => {
  // Setup: Create test users and a test meeting
  before(async () => {
    const userRes = await request(app).post('/api/auth/register').send({
      name: 'Organizer User',
      username: 'organizeruser',
      password: 'password123',
    });
    testUserId = userRes.body.userId;

    const invitedUserRes = await request(app).post('/api/auth/register').send({
      name: 'Invited User',
      username: 'inviteduser',
      password: 'password123',
    });
    invitedUserId = invitedUserRes.body.userId;

    const meetingRes = await request(app).post('/api/meeting/create').send({
      meeting: {
        meetingName: 'Test Meeting',
        meetingDescription: 'This is a test meeting',
        organizers: [testUserId],
        members: [],
        selectedDays: ['Monday', 'Wednesday'],
        timeRange: {
          startTime: new Date(),
          endTime: new Date(),
        },
        invitedUsers: [invitedUserId],
      },
      userId: testUserId,
    });
    testMeetingId = meetingRes.body.meeting._id;
  });

  // Cleanup: Delete test users after tests
  after(async () => {
    if (testUserId) {
      await request(app).post('/api/auth/delete').send({ userId: testUserId, password: 'password123' });
    }
    if (invitedUserId) {
      await request(app).post('/api/auth/delete').send({ userId: invitedUserId, password: 'password123' });
    }
  });

  // Test: Retrieve meetings where the user is invited
  it('should retrieve invited meetings for a user', (done) => {
    request(app)
      .get(`/api/meeting/invited?userId=${invitedUserId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array').that.is.not.empty;
        expect(res.body[0]).to.have.property('meetingName', 'Test Meeting');
        done();
      });
  });

  // Test: Allow a user to join a meeting
  it('should allow a user to join a meeting', (done) => {
    request(app)
      .put('/api/meeting/join')
      .send({
        userId: invitedUserId,
        meetingId: testMeetingId,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'Meeting joined successfully');
        done();
      });
  });

  // Test: Retrieve meetings the user has joined
  it('should retrieve joined meetings for the invited user', (done) => {
    request(app)
      .get(`/api/meeting/joined?userId=${invitedUserId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('meetingName', 'Test Meeting');
        done();
      });
  });

  // Test: Allow a user to leave a meeting
  it('should allow the invited user to leave the meeting', (done) => {
    request(app)
      .put('/api/meeting/leave')
      .send({
        userId: invitedUserId,
        meetingId: testMeetingId,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'Left meeting successfully');
        done();
      });
  });

  // Test: Prevent a non-organizer from deleting a meeting
  it('should prevent a non-organizer from deleting a meeting', (done) => {
    request(app)
      .delete('/api/meeting/delete')
      .send({
        userId: invitedUserId,
        meetingId: testMeetingId,
      })
      .expect(403)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'Only organizers can delete meetings');
        done();
      });
  });

  // Test: Allow the organizer to delete the meeting
  it('should allow the organizer to delete the meeting', (done) => {
    request(app)
      .delete('/api/meeting/delete')
      .send({
        userId: testUserId,
        meetingId: testMeetingId,
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('msg', 'Meeting deleted successfully');
        done();
      });
  });
});

