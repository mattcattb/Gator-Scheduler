require('dotenv').config();

// Import necessary libraries for testing
let expect;
(async () => {
  const chai = await import('chai');
  expect = chai.expect;
})();

const request = require('supertest'); // For HTTP request testing
const app = require('../server'); // Application server
const mongoose = require('mongoose'); // MongoDB library for database operations

// Test suite for Friends API Endpoints
describe('Friends API Endpoint Tests', () => {
    let userId, friendId;

    // Setup: Register two test users before running tests
    before(async () => {
        const userRes = await request(app).post('/api/auth/register').send({
            name: 'User One',
            username: 'userone',
            password: 'password123',
        });
        userId = userRes.body.userId;

        const friendRes = await request(app).post('/api/auth/register').send({
            name: 'User Two',
            username: 'usertwo',
            password: 'password123',
        });
        friendId = friendRes.body.userId;
    });

    // Cleanup: Delete test users and disconnect from database after tests
    after(async () => {
        await request(app).post('/api/auth/delete').send({ userId, password: 'password123' });
        await request(app).post('/api/auth/delete').send({ userId: friendId, password: 'password123' });

        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
    });

    // Test: Send a friend request successfully
    it('should send a friend request successfully', async () => {
        const res = await request(app).post('/api/friends/request').send({
            userId,
            friendId,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Successfully sent friend request!');
    });

    // Test: Prevent sending duplicate friend requests
    it('should not send a duplicate friend request', async () => {
        const res = await request(app).post('/api/friends/request').send({
            userId,
            friendId,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Already sent invite.');
    });

    // Test: Accept a friend request successfully
    it('should accept a friend request successfully', async () => {
        const res = await request(app).put('/api/friends/accept').send({
            friendId,
            userId,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Friend request accepted successfully!');
    });

    // Test: Handle accepting nonexistent friend requests
    it('should not accept a friend request that does not exist', async () => {
        const res = await request(app).put('/api/friends/accept').send({
            friendId,
            userId,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'No friend request from this user.');
    });

    // Test: Unfriend a user successfully
    it('should unfriend a user successfully', async () => {
        await request(app).post('/api/friends/request').send({
            userId,
            friendId,
        });

        await request(app).put('/api/friends/accept').send({
            userId: friendId,
            friendId: userId,
        });

        const res = await request(app).delete('/api/friends/unfriend').send({
            userId,
            friendId,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Unfriended successfully');
    });

    // Test: Handle unfriending users not in friends list
    it('should not unfriend a user who is not in the friends list', async () => {
        const res = await request(app).delete('/api/friends/unfriend').send({
            userId,
            friendId,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message').that.includes('Users are not friends');
    });

    // Test: Reject a friend request successfully
    it('should reject a friend request successfully', async () => {
        await request(app).post('/api/friends/request').send({
            userId,
            friendId,
        });

        const res = await request(app).put('/api/friends/reject').send({
            friendId,
            userId,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Friend request rejected');
    });

    // Test: Handle rejecting nonexistent friend requests
    it('should not reject a friend request that does not exist', async () => {
        const res = await request(app).put('/api/friends/reject').send({
            friendId,
            userId,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'No friend request from this user.');
    });
});
