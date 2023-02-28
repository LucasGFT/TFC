// import {} from 'express';
import { Router } from 'express';
import UsersController from '../controllers/Users.controller';

class UserRoute {
  public route: Router;
  private controller: UsersController = new UsersController();

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

export default UserRoute;
