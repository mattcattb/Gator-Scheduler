require('dotenv').config();

let expect;
(async () => {
  const chai = await import('chai');
  expect = chai.expect;
})();

const request = require('supertest');
const app = require('../server.js');
let userId, friendId;

describe('Friend API Endpoint Tests', () => {
    before(async () => {
        // Register a user
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
        await request(app).post('/api/auth/delete').send({ userId: userId, password: 'password123' });
        await request(app).post('/api/auth/delete').send({ userId: friendId, password: 'password123' });
    });

    describe('Send Friend Request', () => {
        it('should send a friend request successfully', async () => {
            const res = await request(app).post('/api/users/friend/request').send({
                userId,
                friendId,
            });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message', 'Friend added successfully!');
        });

        it('should not send a duplicate friend request', async () => {
            const res = await request(app).post('/api/users/friend/request').send({
                userId,
                friendId,
            });

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message', 'Already sent invite.');
        });
    });

    describe('Accept Friend Request', () => {
        it('should accept a friend request successfully', async () => {
            const res = await request(app).put('/api/users/friend/accept').send({
                userId: friendId,
                friendId: userId,
            });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message', 'Friend request accepted successfully!');
        });

        it('should not accept a friend request that does not exist', async () => {
            const res = await request(app).put('/api/users/friend/accept').send({
                userId: friendId,
                friendId: '64a5d3f9e4b0c12eac58f000', // Non-existent ID
            });

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message', 'No friend request from this user.');
        });
    });

    describe('Reject Friend Request', () => {
        before(async () => {
            await request(app).post('/api/users/friend/request').send({
                userId,
                friendId,
            });
        });

        it('should reject a friend request successfully', async () => {
            const res = await request(app).put('/api/users/friend/reject').send({
                userId: friendId,
                friendId: userId,
            });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message', 'Friend request rejected.');
        });

        it('should not reject a friend request that does not exist', async () => {
            const res = await request(app).put('/api/users/friend/reject').send({
                userId: friendId,
                friendId: '64a5d3f9e4b0c12eac58f000', // Non-existent ID
            });

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property('message', 'No friend request from this user.');
        });
    });

    describe('Unfriend', () => {
        before(async () => {
            await request(app).post('/api/users/friend/request').send({
                userId,
                friendId,
            });

            await request(app).put('/api/users/friend/accept').send({
                userId: friendId,
                friendId: userId,
            });
        });

        it('should unfriend a user successfully', async () => {
            const res = await request(app).delete('/api/users/friend/unfriend').send({
                userId,
                friendId,
            });

            expect(res.status).to.equal(200);
            expect(res.body).to.have.property('message', 'Unfriended successfully.');
        });

        it('should not unfriend a user who is not in the friends list', async () => {
            const res = await request(app).delete('/api/users/friend/unfriend').send({
                userId,
                friendId,
            });

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property('message', 'User or Friend not found.');
        });
    });
});
