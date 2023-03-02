import * as chai from 'chai';
import * as sinon from 'sinon';
import * as bcrypt from 'bcryptjs';
import criarToken from '../utils/token';
// @ts-ignore

import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import {
  userEmailErrado,
  userVerdadeiro,
  userSemSenha,
  userSemEmail,
  userSenhaErrada,
  userEmailErrado2,
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
//   //   sinon.stub(UsersModel, 'findOne').resolves(userVerdadeiro as UsersModel);
//   // });

//   // after(() => {
//   //   (UsersModel.findOne as sinon.SinonStub).restore();
//   // });
//   const b = new UserService();
//   const c = new UsersController();
//   const r = new UserRoute();

//   it('tem usuario no banco de dados', async () => {
//     const c = b.findLogin(userVerdadeiro.email);
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
      .send(userVerdadeiro);
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
    const c = b.findUser(userEmailErrado.email, userEmailErrado.password);
    expect((await c).type).to.be.eq(401);
  });

  it('conferindoToken', async () => {
    const token = await criarToken(userVerdadeiro.email);
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userVerdadeiro);
    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.text).to.be.eq(`{"token":"${token}"}`);
  });

  it('passando senha errada', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userSenhaErrada);
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.text).to.be.eq(
      `{"message":"Invalid email or password"}`
    );
  });

  it('passando email invalido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userEmailErrado);
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.text).to.be.eq(
      `{"message":"Invalid email or password"}`
    );
  });

  it('passando email valido, mas errado', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userEmailErrado2);
    expect(chaiHttpResponse.status).to.be.eq(401);
    expect(chaiHttpResponse.text).to.be.eq(
      `{"message":"Invalid email or password"}`
    );
  });
});

describe('teste rota /login/role', () => {
  const b = new UserService();
  let chaiHttpResponse: Response;
  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhI
  jp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSJ9LCJpYXQiOjE2Nzc3MDk1NjQsImV
  4cCI6MTY3ODMxNDM2NH0.mM-6WWs1oUPViAXqkMvBFXKAvOmx1Trsz2y4QXI0Opc`;

  it('nao exite header Authorization', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/role');
    expect(chaiHttpResponse.text).to.be.eq('{"message":"Token not found"}');
  });

  it('existe header Authorization mas ta errado ', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/role')
      .set({ Authorization: 'teste' });
    expect(chaiHttpResponse.text).to.be.eq(
      '{"message":"Token must be a valid token"}'
    );
  });

  it(' header Authorization certo ', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/role').set({
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidXNlckB1c2VyLmNvbSJ9LCJpYXQiOjE2Nzc3MDk1NjQsImV4cCI6MTY3ODMxNDM2NH0.mM-6WWs1oUPViAXqkMvBFXKAvOmx1Trsz2y4QXI0Opc',
    });
    expect(chaiHttpResponse.text).to.be.eq('{"role":"user"}');
  });

  it('token de usuario que nao tem no banco de dados', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/role').set({
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIn0sImlhdCI6MTY3NzcxMDI2MSwiZXhwIjoxNjc4MzE1MDYxfQ.28GqGESkdOrjKmksMdpc7u8Vg0ZXW0c0ocYBrbiUmCE',
    });
    expect(chaiHttpResponse.text).to.be.eq(
      '{"role":"Invalid email or password"}'
    );
  });
});
