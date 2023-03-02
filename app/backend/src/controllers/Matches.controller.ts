import { Request, Response } from 'express';
import UserMiddleware from '../middleware/user.middleware';
import MatchesService from '../services/Matches.service';
import UserService from '../services/Users.service';

class UserController {
  private teste = 'samal';
  private _service = new UserService();
  private matchesMiddleware = new UserMiddleware();
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

  public async finishMatches(req: Request, res: Response): Promise<void> {
    const result = await this.matchesMiddleware.tokenValid(req, res);
    const { id } = req.params;
    const { message } = result;
    if (result.type === 200) {
      await this.matchesService.finalizarPartida(Number(id));
      res.status(200).json({ message: 'Finished' });
    }
    if (result.type !== 200) res.status(401).json({ message });
  }

  public async updateMatches(req: Request, res: Response) {
    const tokenResult = await this.matchesMiddleware.tokenValid(req, res);
    const { id } = req.params;
    // const teste = {
    //   homeTeamGoals: 3,
    //   awayTeamGoals: 1,
    // };
    // const { homeTeamGoals, awayTeamGoals } = req.body;
    const { message } = tokenResult;
    if (tokenResult.type === 200) {
      await this.matchesService.updateMatches(Number(id), req.body);
      res.status(200).json('partida alterada');
    }
    if (tokenResult.type !== 200) res.status(401).json({ message });
  }
}

export default UserController;
