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
      this.controller.testes(req, res);
    });
  }
}

export default LeaderboardRoute;
