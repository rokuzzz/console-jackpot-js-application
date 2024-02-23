const prompt = require('prompt-sync')();
const {
  deposit,
  getNumberOfLines,
  getBet,
} = require('./utils/userInteraction');
const {
  spin,
  transpose,
  printRows,
  getWinnings,
} = require('./utils/gameUtils');

const game = () => {
  // Initialize player's balance through a deposit
  let balance = deposit();

  // Main game loop
  while (true) {
    console.log(`You have a balance of $${balance}`);

    // Get user's betting preferences
    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);

    // Deduct the total bet from the balance
    balance -= bet * numberOfLines;

    // Spin the reels and calculate the outcome
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows); // Display the spin result
    const winnings = getWinnings(rows, bet, numberOfLines);

    // Update the balance with winnings and inform the player
    balance += winnings;
    if (winnings > 0) {
      console.log(`You won, $${winnings.toString()}`);
    } else {
      console.log('So close! Try again for a win.');
    }

    // Check if the player has run out of money
    if (balance <= 0) {
      console.log('You ran out of money :-(');
      break; // Exit the game loop
    }

    // Prompt the player for another round
    const playAgain = prompt('Do you want to play again (y/n)? ');
    if (playAgain != 'y') {
      break; // Exit if the player does not wish to continue
    }
  }

  console.log('Game over. Thanks for playing!');
};

game();
