import { Router } from 'express';
import LeaderboardController from '../controllers/Leaderboard.controller';

class LeaderboardRoute {
  public route: Router;
  private controller: LeaderboardController = new LeaderboardController();

  constructor() {
    this.route = Router();
    this.rotas();
  }

  private rotas(): void {
    this.route.get('/home', (req, res) => {
      this.controller.leaderboard(req, res, true);
    });
    this.route.get('/away', (req, res) => {
      this.controller.leaderboard(req, res, false);
    });
    this.route.get('/', (req, res) => {
      this.controller.leaderboardHomeAway(req, res);
    });
  }
}

export default LeaderboardRoute;
