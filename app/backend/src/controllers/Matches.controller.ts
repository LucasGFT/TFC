import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class UserController {
  private teste = 'samal';
  private matchesService = new MatchesService();

  public async getMatches(req: Request, res: Response): Promise<void> {
    const c = await this.matchesService.findAll();
    res.status(200).json(c);
  }
}

export default UserController;
