// import { } from 'express';
import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

class TeamsRoute {
  public route: Router;
  private controller: TeamsController = new TeamsController();

  constructor() {
    this.route = Router();
    this.get();
  }

  private get(): void {
    this.route.get('/', (req, res) => {
      this.controller.findAll(req, res);
    });
  }
}

export default TeamsRoute;
