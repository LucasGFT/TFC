// import { } from 'express';
import { Router } from 'express';
import UserMiddleware from '../middleware/user.middleware';
import UsersController from '../controllers/Users.controller';

class TeamsRoute {
  public route: Router;
  private controller: UsersController = new UsersController();
  private middlwaere: UserMiddleware = new UserMiddleware();

  constructor() {
    this.route = Router();
    this.post();
  }

  private post(): void {
    this.route.post('/', (req, res) => {
      this.controller.findUser(req, res);
    });
  }
}

export default TeamsRoute;
