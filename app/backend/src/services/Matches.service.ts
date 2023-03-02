import TeamsModel from '../models/TeamsModel';
import Matches from '../models/MatchesModel';

class MatchesService {
  private teamModel = TeamsModel;
  private matches = Matches;
  private includes = [
    { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
    { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
  ];

  public async findAll() {
    const matches = await this.matches.findAll({
      include: this.includes,
    });
    return matches;
  }

  public async findMatchesInProgress(inProgress: boolean) {
    const matches = await this.matches.findAll({
      where: { inProgress },
      include: this.includes,
    });
    return matches;
  }

  public async finalizarPartida(id: number) {
    await this.matches.update({ inProgress: 0 }, { where: { id } });
  }

  public async updateMatches(
    id: number,
    obj: { homeTeamGoals: number; awayTeamGoals: number },
  ) {
    const { homeTeamGoals, awayTeamGoals } = obj;
    await this.matches.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }
}
export default MatchesService;
