// import { } from 'express';
import { Router } from 'express';
import UsersMiddleware from '../middleware/User.middleware';
import UsersController from '../controllers/Users.controller';

class UserRoute {
  public route: Router;
  private controller: UsersController = new UsersController();
  private middleware: UsersMiddleware = new UsersMiddleware();

  constructor() {
    this.route = Router();
    this.post();
  }

  private post(): void {
    this.route.post('/', (req, res) => {
      const { email, password } = req.body;
      if (email.length < 1 || !email) {
        res.status(400).json({ message: 'All fields must be filled' });
      }
      if (password.length < 1 || !password) {
        res.status(400).json({ message: 'All fields must be filled' });
      }
      if (password.length >= 1 || email.length >= 1) {
        this.controller.findLogin(req, res);
      }
    });
  }
}

export default UserRoute;
