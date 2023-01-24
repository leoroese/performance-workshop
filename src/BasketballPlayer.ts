type Play = {
  name: string;
};

const PLAYS_TO_RUN = 100_000_000;

// LOL imagine trying to have to remember 10_000_000 plays
const TEAM_PLAYS: Map<string, Play> = new Map();
for (let i = 0; i < PLAYS_TO_RUN; i++) {
  // Using an object because I believe that v8 javascript engine optimizes array lookups for numbers and strings
  // and I don't want that optimization lol
  // was getting 1 second for indexOf 10_000_000 plays with strings vs 6 seconds with objects
  // This is a good case where sometimes performance intuition can be wrong
  const play: Play = {
    name: Math.floor(Math.random() * 9).toString(),
  };
  TEAM_PLAYS.set(play.name, play);
}

enum Practice {
  Walkthrough = "walkthrough",
  Individual = "individual",
  Film = "film",
  Full = "full",
  Talking = "talking", // we talking about practice?!
}

// simple hard-coded key value pairs of players who have already lifted weights
const CACHE_OF_PLAYERS_WHO_HAVE_ALREADY_LIFTED: Map<string, boolean> = new Map([
  ["Lebron James", true],
]);

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
    console.time("dribble");
    let timesDribbled = 0;
    for (let i = 0; i < times; i++) {
      timesDribbled++;
    }
    console.timeEnd("dribble");
  }

  async shoot(times: number) {
    console.time("shoot");
    let timesShot = 0;
    for (let i = 0; i < times; i++) {
      await sleep(1);
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

  // the critical path case for practice
  async fullPractice(times: number = 1000) {
    this.dribble(times);
    await this.shoot(times);
    await this.liftWeights();
    this.runPlays(PLAYS_TO_RUN);
  }

  // practice which calls all the above methods
  async practice(times: number = 1000, practice: Practice = Practice.Full) {
    if (practice !== Practice.Full) {
      // If unable to fully split up the critical path, minimizing the amount
      // of code that is run in the critical path is the next best thing
      await sleep(5000);
      return;
    }
    this.dribble(times);
    await this.shoot(times);
    await this.liftWeights();
    this.runPlays(PLAYS_TO_RUN);
  }
}

export default BasketballPlayer;
