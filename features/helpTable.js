import Table from 'cli-table3';
import chalk from 'chalk';
import {GameLogic} from "./gameLogic.js";

export class HelpTable {
    static displayHelp(moves) {
        const table = new Table({
            head: [chalk.bold('↓User/PC→'), ...moves.map(move => chalk.cyan(move))],
            colWidths: new Array(moves.length + 1).fill(12),
        });
        for (let i = 0; i < moves.length; i++) {
            const row = [chalk.cyan(moves[i])];
            for (let j = 0; j < moves.length; j++) {
                const result = GameLogic.determineWinner(i, j, moves);
                const styledResult = result === 'Draw'
                    ? chalk.yellow(result)
                    : result === 'Computer wins'
                        ? chalk.red('Lose')
                        : chalk.green('Win');
                row.push(styledResult);
            }
            table.push(row);
        }
        console.log(table.toString());
    }
}