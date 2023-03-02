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
  it('get todas partidas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('get em partidas em andamento', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    const array = JSON.parse(chaiHttpResponse.text);
    const result = array.every(
      (element: MatchesModel) => element.inProgress === true
    );
    expect(result).to.be.eq(true);
  });

  it('get em partidas ja finalizaas', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=false');
    const array = JSON.parse(chaiHttpResponse.text);
    const result = array.every(
      (element: MatchesModel) => element.inProgress === false
    );
    expect(result).to.be.eq(true);
  });
});

describe('rota /matches/:id/finish', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(arrayMatches as MatchesModel[]);
  });

  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('erro token invalido', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/5/finish').set({
      Authorization:
        'errado',
    });
    expect(chaiHttpResponse.text).to.be.eq('{"message":"Token must be a valid token"}');
    expect(chaiHttpResponse.status).to.be.eq(401);
  });

  it('finaliza partida pelo params', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/5/finish').set({
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIn0sImlhdCI6MTY3NzcxMDI2MSwiZXhwIjoxNjc4MzE1MDYxfQ.28GqGESkdOrjKmksMdpc7u8Vg0ZXW0c0ocYBrbiUmCE',
    });
    expect(chaiHttpResponse.text).to.be.eq('{"message":"Finished"}');
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});

describe('rota /matches/:id', () => {
  let chaiHttpResponse: Response;
  before(async () => {
    sinon
      .stub(MatchesModel, 'findAll')
      .resolves(arrayMatches as MatchesModel[]);
  });

  after(() => {
    (MatchesModel.findAll as sinon.SinonStub).restore();
  });

  it('erro token invalido', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/5').set({
      Authorization:
        'errado',
    });
    expect(chaiHttpResponse.text).to.be.eq('{"message":"Token must be a valid token"}');
    expect(chaiHttpResponse.status).to.be.eq(401);
  });

  it('alterar partida em andamento', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/5').set({
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIn0sImlhdCI6MTY3NzcxMDI2MSwiZXhwIjoxNjc4MzE1MDYxfQ.28GqGESkdOrjKmksMdpc7u8Vg0ZXW0c0ocYBrbiUmCE',
    }).send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    });
    expect(chaiHttpResponse.text).to.be.eq('"partida alterada"');
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});
