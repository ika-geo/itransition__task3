import {playGame} from "./features/playGame.js";
import chalk from "chalk";

const moves = process.argv.slice(2);

function handleError(str) {
    console.error(chalk.red(str));
    console.error(chalk.green('Example: node index.js rock paper scissors'));
    process.exit();
}

if (moves.length < 3) {
    handleError('Error: You must provide 3 or more moves (≥ 3).');
}
if (moves.length % 2 === 0) {
    handleError('Error: You must provide an odd number of moves.');
}
if (new Set(moves).size !== moves.length) {
    handleError('Error: You must provide unique moves.');
}

playGame(moves);