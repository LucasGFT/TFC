import Matches from '../models/MatchesModel';

class Leaderboard {
  private arr: { id: number; totalPoints: number; totalGames: number; totalVictories: number;
    totalLosses: number; totalDraws: number; goalsFavor: number; goalsOwn: number; }[] = [{
    id: 1,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  }];

  private ass = Matches.findAll({
    where: { inProgress: false },
    order: [['homeTeamId', 'ASC']],
    attributes: { exclude: ['id'] },
  });

  private oooo = { id: 0,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0 };

  private bbb = { id: 0,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0 };

  public async colocarResultados(homeTeamGoals: number, awayTeamGoals: number, a: boolean) {
    let obj;
    const teste = this.arr;
    if (!a) obj = this.oooo;
    if (a) obj = this.bbb;
    if (!a) {
      this.oooo.goalsFavor = homeTeamGoals;
      this.oooo.goalsOwn = awayTeamGoals;
      this.arr = [...teste, this.oooo];
    }
    if (obj && obj.id === this.bbb.id) {
      this.arr[this.arr.length - 1].goalsFavor += homeTeamGoals;
      this.arr[this.arr.length - 1].goalsOwn += awayTeamGoals;
      obj.totalGames += 1;
      if (homeTeamGoals > awayTeamGoals) { obj.totalVictories += 1; obj.totalPoints += 3; }
      if (homeTeamGoals < awayTeamGoals) obj.totalLosses += 1;
      if (homeTeamGoals === awayTeamGoals) { obj.totalDraws += 1; obj.totalPoints += 1; }
    }
  }

  public async somarss(obj: Matches | null) {
    const arrs = this.arr;
    const objAtual = arrs[arrs.length - 1];
    const ids = obj?.homeTeamId;
    this.bbb = arrs[arrs.length - 1];
    if (obj !== null) {
      if (objAtual.id === obj.homeTeamId) {
        await this.colocarResultados(obj.homeTeamGoals, obj.awayTeamGoals, true);
      }
      if (ids && objAtual.id !== obj.homeTeamId) {
        const a = this.oooo;
        a.id = ids;
        await this.colocarResultados(obj.homeTeamGoals, obj.awayTeamGoals, false);
      }
    }
  }

  public async test() {
    (await this.ass).forEach(async (e) => {
      // console.log(e.awayTeamGoals);
      this.oooo = { id: 0,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0 };
      await this.somarss(e);
    });
    // const soma = () => {

    // }
    const s = this.arr;
    return s;
  }
}

export default Leaderboard;
