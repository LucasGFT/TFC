import * as express from 'express';
import TeamsRoute from './routes/TeamsRoute';
import UserRoute from './routes/UsersRoute';
import MatchRoute from './routes/MatchesRoute';
import LeaderboardRoute from './routes/LeaderboardRoute';

class App {
  public app: express.Express;
  private teamRoutes: TeamsRoute = new TeamsRoute();
  private userRoutes: UserRoute = new UserRoute();
  private matcheRoutes: MatchRoute = new MatchRoute();
  private leaderboard: LeaderboardRoute = new LeaderboardRoute();

  constructor() {
    this.app = express();

    this.config();

    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  public routes(): void {
    this.app.use('/teams', this.teamRoutes.route);
    this.app.use('/login', this.userRoutes.route);
    this.app.use('/matches', this.matcheRoutes.route);
    this.app.use('/leaderboard', this.leaderboard.route);
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
