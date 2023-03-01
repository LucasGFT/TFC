import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken';

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

const validaToken = (
  token: string | undefined,
): string | JwtPayload | null | undefined => {
  if (token) {
    try {
      const payload = jwt.verify(token, secret);
      return payload;
    } catch (error) {
      return null;
    }
  }
};

export default criarToken;

export { validaToken };
