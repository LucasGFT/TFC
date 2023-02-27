import Teams from '../models/TeamsModel';

class TeamsService {
  private teams = Teams;

  public async findAll() {
    const teams = await this.teams.findAll();
    return teams;
  }

  public async findById(id: number) {
    const team = await this.teams.findByPk(id);
    return team;
  }
}

export default TeamsService;
