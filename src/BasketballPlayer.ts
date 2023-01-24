type Play = {
  name: string;
};

const PLAYS_TO_RUN = 100_000_000;

// key value pairs of players who have already lifted weights
const CACHE_OF_PLAYERS_WHO_HAVE_ALREADY_LIFTED: Map<string, boolean> = new Map([
  ["Lebron James", true],
]);

// LOL imagine trying to have to remember 100_000_000 plays
const TEAM_PLAYS: Map<string, Play> = new Map();
for (let i = 0; i < PLAYS_TO_RUN; i++) {
  const play: Play = {
    name: Math.floor(Math.random() * 9).toString(),
  };
  TEAM_PLAYS.set(play.name, play);
}

// helper function to just chill for a bit
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

enum Practice {
  Walkthrough = "walkthrough",
  Individual = "individual",
  Film = "film",
  Full = "full",
  Talking = "talking", // we talking about practice?!
}

class BasketballPlayer {
  private _name: string;
  constructor(name: string) {
    this._name = name;
  }

  dribble(times: number) {
    console.time("dribble");
    let timesDribbled = 0;
    for (let i = 0; i < times; i++) {
      timesDribbled++;
    }
    console.timeEnd("dribble");
  }

  shoot(times: number) {
    console.time("shoot");
    let timesShot = 0;
    for (let i = 0; i < times; i++) {
      timesShot++;
    }
    console.timeEnd("shoot");
  }

  // lift weights
  async liftWeights() {
    console.time("liftWeights");
    if (CACHE_OF_PLAYERS_WHO_HAVE_ALREADY_LIFTED.has(this._name)) {
      // Introducing a cache here to make sure that we don't have to wait 10 seconds every time
      console.timeEnd("liftWeights");
      return CACHE_OF_PLAYERS_WHO_HAVE_ALREADY_LIFTED.get(this._name);
    }
    // sleep 10 seconds
    await sleep(10_000);
    CACHE_OF_PLAYERS_WHO_HAVE_ALREADY_LIFTED.set(this._name, true);
    console.timeEnd("liftWeights");
    return true;
  }

  runPlays(plays: number) {
    console.time("runPlays");
    const runningPlayName = Math.floor(Math.random() * 9).toString();
    for (let i = 0; i < plays; i++) {
      const index = TEAM_PLAYS.get(runningPlayName);
    }
    console.timeEnd("runPlays");
  }

  async fullPractice(times: number = 1000) {
    this.dribble(times);
    await this.shoot(times);
    await this.liftWeights();
    this.runPlays(PLAYS_TO_RUN);
  }

  // practice which calls all the above methods
  async practice(times: number = 1000, practice: Practice = Practice.Full) {
    if (practice === Practice.Full) {
      this.dribble(times);
      await this.shoot(times);
      await this.liftWeights();
      this.runPlays(PLAYS_TO_RUN);
      return;
    }
    if (practice === Practice.Walkthrough) {
      await sleep(5000);
    }
    if (practice === Practice.Film) {
      await sleep(5000);
    }
    if (practice === Practice.Individual) {
      await sleep(5000);
    }
    if (practice === Practice.Talking) {
      await sleep(15000);
    }
  }
}

export default BasketballPlayer;
