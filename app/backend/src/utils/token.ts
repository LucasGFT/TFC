import jwt = require('jsonwebtoken');

require('dotenv/config');

const secret = 'jwt_secret';

const criarToken = async (email: string) => {
  const jwtConfig: object = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: { email } }, secret, jwtConfig);
  return token;
};

// const criarTokennn = async (id: number, username: string) => {
//   const jwtConfig: object = {
//     expiresIn: '7d',
//     algorithm: 'HS256',
//   };
//   const token = jwt.sign({ payload: { id, username } }, secret, jwtConfig);
//   return token;
// };

export default criarToken;
