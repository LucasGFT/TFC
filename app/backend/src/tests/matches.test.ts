import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import MatchesModel from '../models/MatchesModel';
import arrayMatches from './Mock/matchesMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('rota /matches', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(arrayMatches as MatchesModel[]);
  });

  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('get todas partidas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});
