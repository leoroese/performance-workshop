type Play = {
  name: string;
};

const PLAYS_TO_RUN = 100_000_000;

// LOL imagine trying to have to remember 10_000_000 plays
const TEAM_PLAYS = Array.from({ length: 100_000 }, () =>
  Math.floor(Math.random() * 9).toString()
);

// helper function to just chill for a bit
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class BasketballPlayer {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }

  dribble(times: number) {
    let timesDribbled = 0;
    for (let i = 0; i < times; i++) {
      timesDribbled++;
    }
  }

  async shoot(times: number) {
    let timesShot = 0;
    for (let i = 0; i < times; i++) {
      await sleep(1);
      timesShot++;
    }
  }

  // lift weights
  async liftWeights() {
    // sleep 10 seconds
    await sleep(10_000);
    return true;
  }

  runPlays(plays: number) {
    const runningPlayName = Math.floor(Math.random() * 9).toString();
    for (let i = 0; i < plays; i++) {
      const index = TEAM_PLAYS.find((play) => play === runningPlayName);
    }
  }

  // the critical path case for practice
  async fullPractice(times: number = 1000) {
    this.dribble(times);
    await this.shoot(times);
    await this.liftWeights();
    this.runPlays(PLAYS_TO_RUN);
  }

  // practice which calls all the above methods
  async practice(times: number = 1000) {
    this.dribble(times);
    await this.shoot(times);
    await this.liftWeights();
    this.runPlays(PLAYS_TO_RUN);
  }
}

export default BasketballPlayer;
