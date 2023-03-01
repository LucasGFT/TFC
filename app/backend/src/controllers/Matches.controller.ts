import { Request, Response } from 'express';
import MatchesService from '../services/Matches.service';

class UserController {
  private teste = 'samal';
  private matchesService = new MatchesService();

  public async getMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    let result;
    if (inProgress) {
      if (inProgress === 'true') result = await this.matchesService.findMatchesInProgress(true);
      if (inProgress === 'false') result = await this.matchesService.findMatchesInProgress(false);
      res.status(200).json(result);
    }
    if (!inProgress) {
      const c = await this.matchesService.findAll();
      res.status(200).json(c);
    }
  }

  public async testes(req: Request, res: Response): Promise<void> {
    console.log(this.teste);
    res.status(200).json(req);
  }
}

export default UserController;
