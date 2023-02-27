import { Request, Response } from 'express';
import TeamsService from '../services/Teams.service';

class TeamsController {
  private _service = new TeamsService();

  public async findAll(_req: Request, res: Response): Promise<void> {
    const teams = await this._service.findAll();
    res.status(200).json(teams);
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const team = await this._service.findById(Number(id));
    res.status(200).json(team);
  }
}

export default TeamsController;
