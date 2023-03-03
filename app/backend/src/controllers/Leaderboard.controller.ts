import { Request, Response } from 'express';
import Leaderboard from '../services/Leaderboard.service';

class UserController {
  private leaderboard = new Leaderboard();

  public async testes(_req: Request, res: Response): Promise<void> {
    const t = await this.leaderboard.test();
    console.log(t);
    res.status(200).json(t);
  }
}

export default UserController;
