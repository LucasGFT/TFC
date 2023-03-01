import { Request, Response } from 'express';
import { validaToken } from '../utils/token';

class UserMiddleware {
  private valida =
  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  private token: string | undefined;

  public async middlewareUser(
    req: Request,
    res: Response,
  ): Promise<void | boolean> {
    const { email, password } = req.body;
    const emailValidation = this.valida.test(email);
    if (email.length < 1 || password.length < 1) {
      res.status(400).json({ message: 'All fields must be filled' });
      return false;
    }
    if (
      emailValidation === false
      || (password.length >= 1 && password.length < 6)
    ) {
      res.status(401).json({ message: 'Invalid email or password' });
      return false;
    }
    return true;
  }

  public async tokenValid(
    req: Request,
    _res: Response,
  ): Promise<{ type: string | null | number; message: string }> {
    this.token = req.header('Authorization');
    const payload = validaToken(this.token);
    if (this.token === undefined) { return { type: 401, message: 'Token not found' }; }

    if (payload && typeof payload === 'object') return { type: 200, message: payload.data.email };
    return { type: 401, message: 'Token must be a valid token' };
  }
}

// const teste = async () => {
//   const b = new UserService();
//   const c = await b.findUser('admin@admin.com', 'secret_admin');
//   const a = validaToken(c.message);
//   if (typeof a === 'object' && a !== null) console.log(a.data);
// };

// teste();

export default UserMiddleware;
