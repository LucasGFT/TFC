import Teams from '../models/TeamsModel';

class TeamsService {
  private teams = Teams;

  public async findAll() {
    const teams = await this.teams.findAll();
    return teams;
  }

  public async findById(id: number) {
    const team = await this.teams.findOne({ where: { id } });
    console.log(team);
    return team;
  }

  public async findLastId(id: number, id2: number) {
    const team = await this.teams.findOne({
      order: [['id', 'DESC']],
    });
    if (team !== null) {
      if (team.id >= id && team.id >= id2) return null;
      return { type: 404, message: 'There is no team with such id!' };
    }
    return 'erro';
  }
}

export default TeamsService;
