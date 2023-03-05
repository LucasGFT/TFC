import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('rota /leaderboard/home', () => {
  let chaiHttpResponse: Response;
  it('get leaderBoard', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});