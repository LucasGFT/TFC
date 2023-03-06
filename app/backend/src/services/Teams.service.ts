import ResultObject from '../interfaces/ResultInterfaces';
import Teams from '../models/TeamsModel';

class TeamsService {
  private teams = Teams;

  public async findAll(): Promise<Teams[]> {
    const teams = await this.teams.findAll();
    return teams;
  }

  public async findById(id: number): Promise<Teams | null> {
    const team = await this.teams.findOne({ where: { id } });
    return team;
  }

  public async findLastId(id: number, id2: number): Promise<ResultObject | null | 'erro'> {
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
