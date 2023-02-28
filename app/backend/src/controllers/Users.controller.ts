import { Request, Response } from 'express';
import UserMiddleware from '../middleware/user.middleware';
import UserService from '../services/Users.service';

class UserController {
  private _service = new UserService();
  private as = new UserMiddleware();

  public async findUser(req: Request, res: Response): Promise<void> {
    const teste = await this.as.middlewareUser(req, res);
    const { email, password } = req.body;
    if (teste === true) {
      const team = await this._service.findUser(email, password);
      const { type, message } = team;
      if (type === 200) res.status(type).json({ token: message });
      if (type !== 200) res.status(type).json({ message });
    }
  }
}

export default UserController;
