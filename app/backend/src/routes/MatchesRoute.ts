import { Router } from 'express';
import MatchesController from '../controllers/Matches.controller';

class MatchRoute {
  public route: Router;
  private controller: MatchesController = new MatchesController();

  constructor() {
    this.route = Router();
    this.rotas();
  }

  private rotas(): void {
    this.route.get('/', (req, res) => {
      this.controller.getMatches(req, res);
    });
    this.route.patch('/:id/finish', (req, res) => {
      this.controller.finishMatches(req, res);
    });
    this.route.patch('/:id', (req, res) => {
      this.controller.updateMatches(req, res);
    });
    this.route.post('/', (req, res) => {
      this.controller.createMatches(req, res);
    });
  }
}

export default MatchRoute;
