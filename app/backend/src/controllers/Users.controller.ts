import { Request, Response } from 'express';
import bcrypt = require('bcryptjs');
import UsersService from '../services/Users.service';
import criarToken from '../utils/token';

class UsersController {
  private _service = new UsersService();

  public async findLogin(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    const user = await this._service.findLogin(email);
    if (user.type === null) {
      // comparar senha criptada por bcryptjs
      const a = bcrypt.compareSync(password, user.message.password);
      if (a) {
        // criando token
        const token = await criarToken(email);
        res.status(200).json({ token });
      }
    }
    if (user.type !== null) res.status(400);
  }
}

export default UsersController;
