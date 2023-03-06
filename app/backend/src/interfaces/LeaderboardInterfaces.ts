interface LeaderboardInterface {
  totalPoints: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  name: string;
  totalDraws: number;
  totalGames: number;
  totalVictories: number;
  efficiency: number;
  totalLosses: number;
}

interface LeaderboardInterfaceId {
  id: number;
  totalPoints: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  name: string;
  totalDraws: number;
  totalGames: number;
  totalVictories: number;
  efficiency: number;
  totalLosses: number;
}

interface LeaderboardInterfaceSemGoals {
  totalPoints: number;
  goalsBalance: number;
  name: string;
  totalDraws: number;
  totalGames: number;
  totalVictories: number;
  efficiency: number;
  totalLosses: number;
}

export { LeaderboardInterface, LeaderboardInterfaceId, LeaderboardInterfaceSemGoals };
