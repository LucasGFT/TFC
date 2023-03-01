import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

class TeamsRoute {
  public route: Router;
  private controller: MatchesController = new MatchesController();

  constructor() {
    this.route = Router();
    this.get();
  }

  private get(): void {
    this.route.get('/', (req, res) => {
      this.controller.getMatches(req, res);
    });
  }
}

export default TeamsRoute;
