// import {} from 'express';
import { Router } from 'express';
import UsersController from '../controllers/Users.controller';

class UserRoute {
  public route: Router;
  private controller: UsersController = new UsersController();

  constructor() {
    this.route = Router();
    this.rotas();
  }

  private rotas(): void {
    this.route.post('/', (req, res) => {
      this.controller.findUser(req, res);
    });
    this.route.get('/role', (req, res) => {
      this.controller.getUser(req, res);
    });
  }
}

export default UserRoute;
