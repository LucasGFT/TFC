import { Request, Response } from 'express';
import UserMiddleware from '../middleware/user.middleware';
import UserService from '../services/Users.service';

class UserController {
  private _service = new UserService();
  private userMiddleware = new UserMiddleware();

  public async findUser(req: Request, res: Response): Promise<void> {
    const teste = await this.userMiddleware.middlewareUser(req, res);
    const { email, password } = req.body;
    if (teste === true) {
      const team = await this._service.findUser(email, password);
      const { type, message } = team;
      if (type === 200) res.status(type).json({ token: message });
      if (type !== 200) res.status(type).json({ message });
    }
  }

  public async getUser(req: Request, res: Response): Promise<void> {
    const result = await this.userMiddleware.tokenValid(req, res);
    const { message } = result;
    if (result.type === 200) {
      const resultRole = await this._service.findRoleByEmail(result.message);
      res.status(200).json({ role: resultRole.message });
    }
    if (result.type !== 200) res.status(401).json({ message });
  }
}

export default UserController;
