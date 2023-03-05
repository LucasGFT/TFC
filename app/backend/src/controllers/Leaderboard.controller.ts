import { Request, Response } from 'express';
import LeaderboardService from '../services/Leaderboard.service';

class UserController {
  private leaderboardService = new LeaderboardService();

  public async leaderboard(_req: Request, res: Response, bool: boolean): Promise<void> {
    const array = await this.leaderboardService.criarArray(bool);
    const arraySemId = array.map(({ goalsFavor, goalsOwn, name, totalDraws, totalGames, totalLosses,
      totalPoints, totalVictories, efficiency, goalsBalance }) => ({ name,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency,
    }));
    res.status(200).json(arraySemId);
  }
}

// const n = new UserController();
// n.testes();

export default UserController;
