import readline from 'readline';
import chalk from 'chalk';
import { KeyGenerator } from './keyGenerator.js';
import { HMACCalculator } from './hmacCalculator.js';
import { GameLogic } from './gameLogic.js';
import { HelpTable } from './helpTable.js';

export function playGame(moves) {
    const keyLength = 32;
    const key = KeyGenerator.generateKey(keyLength);
    const computerMoveIndex = Math.floor(Math.random() * moves.length);
    const computerMove = moves[computerMoveIndex];
    const hmac = HMACCalculator.calculateHMAC(key, computerMove);
    console.log(`HMAC: ${hmac}`);
    displayMenu(moves);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    function askMove() {
        rl.question('Enter your move: ', (userInput) => {
            if (userInput === '0') {
                console.log('Exiting the game.');
                rl.close();
                process.exit();
            }
            if (userInput === '?') {
                HelpTable.displayHelp(moves);
                displayMenu(moves);
                askMove();
                return;
            }
            const playerMoveIndex = parseInt(userInput, 10) - 1;
            if (isNaN(playerMoveIndex) || playerMoveIndex < 0 || playerMoveIndex >= moves.length) {
                console.log('Invalid move, please try again.');
                displayMenu(moves);
                askMove();
                return;
            }
            const playerMove = moves[playerMoveIndex];
            const result = GameLogic.determineWinner(playerMoveIndex, computerMoveIndex, moves);
            console.log(`Your move: ${playerMove}`);
            console.log(`Computer's move: ${computerMove}`);
            console.log(`${result === 'Draw' ? chalk.yellow(result) : result === 'Computer wins' ? chalk.red(result) : chalk.green(result)}`);
            console.log(`HMAC key: ${key}`);
            rl.close();
        });
    }
    askMove();
}

function displayMenu(moves) {
    console.log('Available moves:');
    moves.forEach((move, index) => {
        console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - exit');
    console.log('? - help');
}