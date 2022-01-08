/* eslint-disable jest/valid-expect */
import chai from 'chai';
import request from 'supertest';

import app from '../../../app';
import { URL_REGISTER, URL_LOGIN } from '@scrum-game/common';
import user from '../../../modules/auth/user';

const expect = chai.expect;

describe('Authentication Test', () => {
  describe('/api/auth/login', () => {
    it('SHOULD NOT LOGIN WITH WRONG CREDENTIALS', async () => {
      const response = await request(app)
        .post(URL_LOGIN)
        .send({ username: 'bgure', password: 123 });

      expect(response.status).to.equal(400);
    });
    it('SHOULD LOGIN AND GET TOKEN', async () => {
      const users = { username: 'admin', password: '123456' };
      const res = await request(app).post(URL_LOGIN).send(users);
      expect(res.status).to.eql(200);
      expect(res.body).to.have.property('token');
    });
    it('SHOULD GIVE ERROR WHEN USERNAME IS EMPTY OR UNDEFINED', async () => {
      const users = {
        password: '123456',
      };
      const res = await request(app).post(URL_LOGIN).send(users);
      expect(res.status).to.eql(400);
      expect(res.body).to.eql({
        errors: [
          {
            status: 400,
            source: { pointer: 'username' },
            title: '"username" is required',
            type: 'any.required',
          },
        ],
      });
    });
    it('SHOULD GIVE ERROR WHEN PASSWORD IS EMPTY OR UNDEFINED', async () => {
      const users = {
        username: 'berkay.gure',
      };
      const res = await request(app).post(URL_LOGIN).send(users);
      expect(res.status).to.eql(400);
      expect(res.body).to.eql({
        errors: [
          {
            status: 400,
            source: { pointer: 'password' },
            title: '"password" is required',
            type: 'any.required',
          },
        ],
      });
    });
    it('SHOULD GIVE ERROR WHEN PASSWORD IS LESS THAN 6 CHARACTERS', async () => {
      const users = {
        username: 'berkay.gure',
        password: '123',
      };
      const res = await request(app).post(URL_LOGIN).send(users);

      expect(res.status).to.eql(400);
      expect(res.body).to.eql({
        errors: [
          {
            status: 400,
            source: { pointer: 'password' },
            title: '"password" length must be at least 6 characters long',
            type: 'string.min',
          },
        ],
      });
    });
  });

  describe('/register', () => {
    it('SHOULD REGISTER WITH VALID USERNAME AND PASSWORD', async () => {
      await user.remove({ username: 'berkay.gure' });

      const users = { username: 'berkay.gure', password: '1234567' };
      const res = await request(app).post(URL_REGISTER).send(users);
      expect(res.status).to.eql(201);
      expect(res.body).to.have.property('token');
    });
    it('SHOULD NOT REGISTER WITH SAME USERNAME', async () => {
      const users = { username: 'berkay.gure', password: '1234567' };
      const res = await request(app).post(URL_REGISTER).send(users);
      expect(res.status).to.eql(409);
    });
    it('SHOULD NOT REGISTER WITHOUT USERNAME', async () => {
      const users = {
        password: '123456',
      };
      const res = await request(app).post(URL_REGISTER).send(users);
      expect(res.status).to.eql(400);
      expect(res.body).to.eql({
        errors: [
          {
            status: 400,
            source: { pointer: 'username' },
            title: '"username" is required',
            type: 'any.required',
          },
        ],
      });
    });

    it('SHOULD NOT REGISTER WITH USERNAME LESS THAN 3 CHARACTER', async () => {
      const users = {
        username: 'bg',
        password: '123456',
      };
      const res = await request(app).post(URL_REGISTER).send(users);
      expect(res.status).to.eql(400);
      expect(res.body).to.eql({
        errors: [
          {
            status: 400,
            source: { pointer: 'username' },
            title: '"username" length must be at least 3 characters long',
            type: 'string.min',
          },
        ],
      });
    });
    it('SHOULD NOT REGISTER WITHOUT PASSWORD', async () => {
      const users = {
        username: 'berkay.gure',
      };
      const res = await request(app).post(URL_REGISTER).send(users);
      expect(res.status).to.eql(400);
      expect(res.body).to.eql({
        errors: [
          {
            status: 400,
            source: { pointer: 'password' },
            title: '"password" is required',
            type: 'any.required',
          },
        ],
      });
    });
    it('SHOULD NOT REGISTER WITH PASSWORD LESS THAN 6 CHARACTERS', async () => {
      const users = {
        username: 'berkay.gure',
        password: '123',
      };
      const res = await request(app).post(URL_REGISTER).send(users);

      expect(res.status).to.eql(400);
      expect(res.body).to.eql({
        errors: [
          {
            status: 400,
            source: { pointer: 'password' },
            title: '"password" length must be at least 6 characters long',
            type: 'string.min',
          },
        ],
      });
    });
  });
});
