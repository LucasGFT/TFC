import TeamsModel from '../models/TeamsModel';
import Matches from '../models/MatchesModel';
import TeamsService from './Teams.service';
import { LeaderboardInterface,
  LeaderboardInterfaceId, LeaderboardInterfaceSemGoals } from '../interfaces/LeaderboardInterfaces';

class LeaderboardService {
  private todosTeam: TeamsModel[] = [];
  private zero = 0;

  private arrayTimes: LeaderboardInterfaceId[] = [{
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

  resultMatches = (bool: boolean): Promise<Matches[]> => {
    let ss = 'homeTeamId';
    if (!bool) ss = 'awayTeamId';
    return Matches.findAll({
      where: { inProgress: false },
      order: [[ss, 'ASC']],
      attributes: { exclude: ['id'] },
    });
  };

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

  private async colocarResultMatches(
    homeTeamGoals: number,
    awayTeamGoals: number,
    obj: LeaderboardInterfaceSemGoals,
  ): Promise<void> {
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

  private async colocarValorMatch(homeTeamGoals: number, awayTeamGoals: number, jaContem: boolean)
    : Promise<void> {
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

  private async criarObject(obj: Matches, bool: boolean): Promise<void> {
    let id;
    let primeiroParam = 0;
    let segundoParam = 0;
    const array = this.arrayTimes; const objAtual = array[array.length - 1];
    if (bool) id = obj?.homeTeamId; if (!bool) id = obj?.awayTeamId;
    this.objMatches = array[array.length - 1];
    if (obj !== null) {
      if (bool === true) { primeiroParam = obj.homeTeamGoals; segundoParam = obj.awayTeamGoals; }
      if (bool === false) { segundoParam = obj.homeTeamGoals; primeiroParam = obj.awayTeamGoals; }
      if (objAtual.id === id) {
        await this.colocarValorMatch(primeiroParam, segundoParam, true);
      }
      if (id && objAtual.id !== id) {
        const a = this.objectResult; a.id = id; a.name = this.todosTeam[id - 1].teamName;
        await this.colocarValorMatch(primeiroParam, segundoParam, false);
      }
    }
  }

  private async ArrayEmOrder(array: LeaderboardInterface[]): Promise<LeaderboardInterface[]> {
    const z = this.zero;
    const arrayEmOrdem = array.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return z + 1; if (a.totalPoints > b.totalPoints) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1; if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1; if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1; if (a.goalsOwn > b.goalsOwn) return -1; return 0;
    });
    return arrayEmOrdem;
  }

  private async colocarEmOrder(array: LeaderboardInterface[])
    : Promise<LeaderboardInterface[]> {
    const result = await this.ArrayEmOrder(array);
    return result;
  }

  private async zerarArray(): Promise<void> {
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

  public async criarArray(p: boolean): Promise<LeaderboardInterface[]> {
    this.todosTeam = await new TeamsService().findAll();
    const todasMatches = await this.resultMatches(p); await this.zerarArray();
    this.arrayTimes[0].name = this.todosTeam[0].teamName;
    (todasMatches).forEach(async (e) => {
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
      await this.criarObject(e, p);
    }); const result = this.arrayTimes;
    const resultado = await this.colocarEmOrder(result); return resultado;
  }

  public somarEmArrayHomeAway(
    objI: LeaderboardInterface,
    obji: LeaderboardInterface,
  ): LeaderboardInterface {
    return { name: objI.name,
      totalPoints: objI.totalPoints + obji.totalPoints,
      totalGames: objI.totalGames + obji.totalGames,
      totalVictories: objI.totalVictories + obji.totalVictories,
      totalDraws: objI.totalDraws + obji.totalDraws,
      totalLosses: objI.totalLosses + obji.totalLosses,
      goalsFavor: objI.goalsFavor + obji.goalsFavor,
      goalsOwn: objI.goalsOwn + obji.goalsOwn,
      goalsBalance: objI.goalsBalance + obji.goalsBalance,
      efficiency: Number((((objI.totalPoints + obji.totalPoints) / (
        (objI.totalGames + obji.totalGames) * 3)) * 100).toFixed(this.zero + 2)),
    };
  }

  public async criarArrayHomeAway(): Promise<LeaderboardInterface[]> {
    const arrHome = [...await this.criarArray(true)];
    const arrAway = [...await this.criarArray(false)];
    let array: LeaderboardInterface[] = [];
    arrHome.forEach((element) => {
      const arr = array;
      arrAway.forEach(async (elemen) => {
        if (element.name === elemen.name) {
          array = [...arr, this.somarEmArrayHomeAway(element, elemen)];
        }
      });
    });
    const result = await this.colocarEmOrder(array);
    return result;
  }
}

export default LeaderboardService;
