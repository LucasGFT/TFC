import TeamsModel from '../models/TeamsModel';
import Matches from '../models/MatchesModel';
import MatchesInterface from '../interfaces/MatchesInterfaces';

class MatchesService {
  private teamModel = TeamsModel;
  private matches = Matches;

  public async findAll(): Promise<Matches[]> {
    const matches = await this.matches.findAll({
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async findMatchesInProgress(inProgress: number): Promise<Matches[]> {
    const matches = await this.matches.findAll({
      where: { inProgress },
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }

  public async finalizarPartida(id: number): Promise<void> {
    await this.matches.update({ inProgress: 0 }, { where: { id } });
  }

  public async createMatches(obj: {
    homeTeamId: number;
    awayTeamId: number;
    homeTeamGoals: number;
    awayTeamGoals: number;
    inProgress: boolean;
  }): Promise<Matches> {
    const result = await this.matches.create(obj);
    return result;
  }

  public async updateMatches(
    id: number,
    obj: MatchesInterface,
  ): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = obj;
    await this.matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}

export default MatchesService;
