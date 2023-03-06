import { Request, Response } from 'express';
import UserMiddleware from '../middleware/user.middleware';
import MatchesService from '../services/Matches.service';

class UserController {
  private matchesMiddleware = new UserMiddleware();
  private matchesService = new MatchesService();

  public async getMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    let result;
    if (inProgress) {
      if (inProgress === 'true') result = await this.matchesService.findMatchesInProgress(1);
      if (inProgress === 'false') result = await this.matchesService.findMatchesInProgress(0);
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
    const { message } = tokenResult;
    if (tokenResult.type === 200) {
      await this.matchesService.updateMatches(Number(id), req.body);
      res.status(200).json('partida alterada');
    }
    if (tokenResult.type !== 200) res.status(401).json({ message });
  }

  public async createMatches(req: Request, res: Response) {
    const tokenResult = await this.matchesMiddleware.tokenValid(req, res);
    const matchesValid = await this.matchesMiddleware.matchesValid(req, res);
    const create = req.body;
    create.inProgress = false;
    const { message } = tokenResult;

    if (tokenResult.type !== 200) res.status(401).json({ message });

    if (tokenResult.type === 200) {
      if (matchesValid === null) {
        const result = await this.matchesService.createMatches(create);
        res.status(201).json(result);
      }
      if (matchesValid !== null) {
        res.status(
          matchesValid.type,
        ).json({ message: matchesValid.message });
      }
    }
  }
}

export default UserController;
