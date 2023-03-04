import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

class UserController {
  private leaderboardService = new LeaderboardService();

  public async testes(_req: Request, res: Response): Promise<void> {
    const t = await this.leaderboardService.test();
    const s = t.map(({ goalsFavor, goalsOwn, name, totalDraws, totalGames, totalLosses,
      totalPoints, totalVictories }) => ({ name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn }));
    res.status(200).json(s);
  }
}

export default UserController;
