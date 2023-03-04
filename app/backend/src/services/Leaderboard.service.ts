import TeamsModel from '../models/TeamsModel';
import Matches from '../models/MatchesModel';
import TeamsService from './Teams.service';

class LeaderboardService {
  private todosTeam: TeamsModel[] = [];
  private zero = 0;

  private arrayTimes: { id: number; name: string; totalPoints: number; totalGames: number;
    totalVictories: number; totalLosses: number; totalDraws: number; goalsFavor: number;
    goalsOwn: number; goalsBalance: number; efficiency: number }[] = [{
    id: 1,
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  }];

  private resultMatches = Matches.findAll({
    where: { inProgress: false },
    order: [['homeTeamId', 'ASC']],
    attributes: { exclude: ['id'] },
  });

  private objectResult = { id: 0,
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0 };

  private objMatches = { id: 0,
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsBalance: 0,
    efficiency: 0 };

  public async colocarResultMatches(homeTeamGoals: number, awayTeamGoals: number, obj: {
    totalVictories: number; totalPoints: number; totalLosses: number; totalDraws: number
    efficiency: number; totalGames: number }) {
    const objResult = obj;
    if (homeTeamGoals > awayTeamGoals) {
      objResult.totalVictories += 1;
      objResult.totalPoints += 3;
    }
    if (homeTeamGoals < awayTeamGoals) objResult.totalLosses += (this.zero + 1);
    if (homeTeamGoals === awayTeamGoals) { objResult.totalDraws += 1; objResult.totalPoints += 1; }
    objResult.efficiency = Number(
      ((objResult.totalPoints / (objResult.totalGames * 3)) * 100).toFixed(2),
    );
  }

  public async colocarValorMatch(homeTeamGoals: number, awayTeamGoals: number, jaContem: boolean) {
    let obj;
    const arrrayAntigo = this.arrayTimes;
    if (!jaContem) obj = this.objectResult;
    if (jaContem) obj = this.objMatches;
    if (!jaContem) {
      this.arrayTimes = [...arrrayAntigo, this.objectResult];
      if (obj)obj.id = this.objMatches.id;
    }

    if (obj && obj.id === this.objMatches.id) {
      if (obj.totalGames === 0 && obj.name !== this.todosTeam[0].teamName) obj.id += 1;
      obj.name = this.todosTeam[obj.id - 1].teamName;
      this.arrayTimes[this.arrayTimes.length - 1].goalsFavor += homeTeamGoals;
      this.arrayTimes[this.arrayTimes.length - 1].goalsOwn += awayTeamGoals;
      this.arrayTimes[this.arrayTimes.length - 1].goalsBalance += (homeTeamGoals - awayTeamGoals);
      obj.totalGames += 1;
      await this.colocarResultMatches(homeTeamGoals, awayTeamGoals, obj);
    }
  }

  public async criarObject(obj: Matches | null) {
    const array = this.arrayTimes;
    const objAtual = array[array.length - 1];
    const id = obj?.homeTeamId;
    this.objMatches = array[array.length - 1];
    if (obj !== null) {
      if (objAtual.id === obj.homeTeamId) {
        await this.colocarValorMatch(obj.homeTeamGoals, obj.awayTeamGoals, true);
      }
      if (id && objAtual.id !== obj.homeTeamId) {
        const a = this.objectResult;
        a.id = id;
        a.name = this.todosTeam[id - 1].teamName;
        await this.colocarValorMatch(obj.homeTeamGoals, obj.awayTeamGoals, false);
      }
    }
  }

  public async colocarEmOrder(array: { totalPoints: number; goalsFavor: number;
    goalsOwn: number; goalsBalance: number; name: string; totalDraws: number; totalGames: number
    totalVictories: number; efficiency: number; totalLosses: number }[]) {
    const arrayEmOrdem = array.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1; if (a.totalPoints > b.totalPoints) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1; if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1; if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1; if (a.goalsOwn > b.goalsOwn) return -1; return 0;
      console.log(this.zero);
    });
    return arrayEmOrdem;
  }

  public async zerarArray() {
    this.arrayTimes = [
      { id: 1,
        name: '',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0 },
    ];
  }

  public async criarArray() {
    this.todosTeam = await new TeamsService().findAll();
    await this.zerarArray();
    this.arrayTimes[0].name = this.todosTeam[0].teamName;
    (await this.resultMatches).forEach(async (e) => {
      this.objectResult = { id: 0,
        name: '',
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0 };
      await this.criarObject(e);
    }); const result = this.arrayTimes;
    const resultado = await this.colocarEmOrder(result); return resultado;
  }
}
export default LeaderboardService;
