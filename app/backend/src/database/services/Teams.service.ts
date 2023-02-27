import Teams from '../models/TeamsModel';

class TeamsService {
  private teams = Teams;

  public async findAll() {
    const teams = await this.teams.findAll();
    return teams;
  }
}

export default TeamsService;
