import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../models/TeamsModel';

import { Response } from 'superagent';
import teamsMock from './testsModel/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('.get no /team', () => {
  let chaiHttpResponse: Response;

  before(async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[]);
  });

  after(() => {
    (TeamModel.findAll as sinon.SinonStub).restore();
  });

  it('todos teams', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.eq(200);
  });
});

describe('pesquisar team por id', () => {
  let chaiHttpResponse: Response;

  const cruzeiro = '{"id":5,"teamName":"Cruzeiro"}';

  before(async () => {
    sinon
      .stub(TeamModel, 'findOne')
      .resolves({ id: 5, teamName: 'Cruzeiro' } as TeamModel);
  });

  after(() => {
    (TeamModel.findOne as unknown as sinon.SinonStub).restore();
  });

  it('procurar somente um time(Cruzeiro)', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams/4');
    expect(chaiHttpResponse.text).to.be.eq(cruzeiro);
  });
});

// describe('.get team pelo id', () => {
// let chaiHttpResponse: Response;

// before(async () => {
//   sinon.stub(TeamModel, 'findAll').resolves(teamsMock as TeamModel[]);
// });

// after(() => {
//   (TeamModel.findAll as sinon.SinonStub).restore();
// });

// it('todos teams', async () => {
//   chaiHttpResponse = await chai.request(app).get('/teams');
//   expect(chaiHttpResponse.status).to.be.eq(200);
// });
// });
