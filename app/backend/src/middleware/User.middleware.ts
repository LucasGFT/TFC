import { Request, Response } from 'express';
import UsersService from '../services/Users.service';

class UsersMiddleware {
  private _service = new UsersService();

  public async teste(
    req: Request,
    res: Response,
    next: () => void,
  ): Promise<void> {
    const { email, password } = req.body;
    console.log(this._service);
    if (email.length < 1 || !email) {
      res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length < 1 || !password) {
      res.status(400).json({ message: 'All fields must be filled' });
    }
    if (password.length >= 1 || email >= 1) next();
  }
}

export default UsersMiddleware;
