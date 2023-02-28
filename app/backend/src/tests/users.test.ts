import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import {
  userEmailErrado,
  userVerdadero,
  userSemSenha,
  userSemEmail,
  userSenhaErrada,
} from './Mock/usersMock';
import UsersModel from '../models/UsersModel';
import UserService from '../services/Users.service';
import TeamsModel from '../models/TeamsModel';
import UsersController from '../controllers/Users.controller';
import UserRoute from '../routes/UsersRoute';

chai.use(chaiHttp);

const { expect } = chai;

// describe('.post no /user', async () => {
//   let chaiHttpResponse: Response;
//   // before(async () => {
//   //   sinon.stub(UsersModel, 'findOne').resolves(userVerdadero as UsersModel);
//   // });

//   // after(() => {
//   //   (UsersModel.findOne as sinon.SinonStub).restore();
//   // });
//   const b = new UserService();
//   const c = new UsersController();
//   const r = new UserRoute();

//   it('tem usuario no banco de dados', async () => {
//     const c = b.findLogin(userVerdadero.email);
//     expect((await c).message?.username).to.be.eq('Admin');
//   });
//   it('nao tem usuario no banco de dados', async () => {
//     const c = b.findLogin(userEmailErrado.email);
//     expect((await c).type).to.be.eq('naoAchouUser');
//   });

//   // it('teste', async () => {
//   //   const d = r.findLogin();
//   //   console.log(d);
//   // });
// });

describe('procurando Users', () => {
  let chaiHttpResponse: Response;
  const b = new UserService();
  it('achando user com sucesso e retornando token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userVerdadero);
    expect(chaiHttpResponse.status).to.be.eq(200);
  });

  it('erro ao procurar user sem email', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userSemEmail);
    expect(chaiHttpResponse.status).to.be.eq(400);
  });

  it('erro ao procurar user sem senha', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userSemSenha);
    expect(chaiHttpResponse.status).to.be.eq(400);
  });

  it('nao tem usuario no banco de dados', async () => {
    const c = b.findLogin(userEmailErrado.email);
    expect((await c).type).to.be.eq('naoAchouUser');
  });
});

// describe('asalsasmasl', () => {
//   let chaiHttpResponse: Response;
//   it('senha errada', async () => {
//     chaiHttpResponse = await chai
//       .request(app)
//       .post('/login')
//       .send(userSenhaErrada);

//     expect(chaiHttpResponse.status).to.be.eq(200);
//   });
// });
