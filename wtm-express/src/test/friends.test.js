require('dotenv').config();

let expect;
(async () => {
  const chai = await import('chai');
  expect = chai.expect;
})();

const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');

describe('Friends API Endpoint Tests', () => {
    let userId, friendId;

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

    after(async () => {
        // Clean up test users
        await request(app).post('/api/auth/delete').send({ userId, password: 'password123' });
        await request(app).post('/api/auth/delete').send({ userId: friendId, password: 'password123' });

        // Disconnect from the database
        if (mongoose.connection.readyState === 1) {
            await mongoose.disconnect();
        }
    });

    it('should send a friend request successfully', async () => {
        const res = await request(app).post('/api/friends/request').send({
            userId,
            friendId,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Successfully sent friend request!');
    });

    it('should not send a duplicate friend request', async () => {
        const res = await request(app).post('/api/friends/request').send({
            userId,
            friendId,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'Already sent invite.');
    });

    it('should accept a friend request successfully', async () => {
        const res = await request(app).put('/api/friends/accept').send({
            friendId,
            userId,
        });

        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('message', 'Friend request accepted successfully!');
    });

    it('should not accept a friend request that does not exist', async () => {
        const res = await request(app).put('/api/friends/accept').send({
            friendId,
            userId,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'No friend request from this user.');
    });

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
        expect(res.body).to.have.property('message', 'Unfriended successfully.');
    });

    it('should not unfriend a user who is not in the friends list', async () => {
        const res = await request(app).delete('/api/friends/unfriend').send({
            userId,
            friendId,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message').that.includes('Users are not friends.');
    });

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
        expect(res.body).to.have.property('message', 'Friend request rejected.');
    });

    it('should not reject a friend request that does not exist', async () => {
        const res = await request(app).put('/api/friends/reject').send({
            friendId,
            userId,
        });

        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('message', 'No friend request from this user.');
    });
});
