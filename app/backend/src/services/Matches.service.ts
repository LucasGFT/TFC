import TeamsModel from '../models/TeamsModel';
import Matches from '../models/MatchesModel';
import TeamsService from './Teams.service';

class MatchesService {
  private teamModel = TeamsModel;
  private matches = Matches;
  private teamsService = new TeamsService();

  public async findAll() {
    const matches = await this.matches.findAll({
      include: [
        { model: this.teamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: this.teamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}

export default MatchesService;
