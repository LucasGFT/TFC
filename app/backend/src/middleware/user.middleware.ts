import { Request, Response } from 'express';
// import UserService from '../services/Users.service';

class UserMiddleware {
  private valida = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  public async middlewareUser(req: Request, res: Response): Promise<void | boolean> {
    const { email, password } = req.body;
    const emailValidation = this.valida.test(email);
    if (email.length < 1 || password.length < 1) {
      res.status(400).json({ message: 'All fields must be filled' });
      return false;
    }
    if (emailValidation === false || (password.length >= 1 && password.length < 6)) {
      res.status(401).json({ message: 'Invalid email or password' });
      return false;
    }
    return true;
  }
}

export default UserMiddleware;
