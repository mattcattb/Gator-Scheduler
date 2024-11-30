require('dotenv').config();

const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server.js');
let testUserId, testMeetingId, invitedUserId;

describe('Enhanced Meeting API Endpoint Tests', () => {
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
        meetingDescription: 'This is a test meeting.',
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

  after(async () => {
    if (testUserId) {
      await request(app).post('/api/auth/delete').send({ userId: testUserId, password: 'password123' });
    }
    if (invitedUserId) {
      await request(app).post('/api/auth/delete').send({ userId: invitedUserId, password: 'password123' });
    }
  });

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
        expect(res.body).to.have.property('msg', 'Meeting joined successfully.');
        done();
      });
  });

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
