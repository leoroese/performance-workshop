import BasketballPlayer from "./BasketballPlayer";

/**
 * This is the main entry point of the application.
 * Allows async await at the top level due to enabling some experimental features and targeting ESNEXT
 * https://stackoverflow.com/questions/46515764/how-can-i-use-async-await-at-the-top-level
 */
async function main() {
  const player = new BasketballPlayer("Lebron James");
  console.time("practice");
  await player.practice();
  console.timeEnd("practice");
}

await main();
