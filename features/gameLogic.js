export class GameLogic {
    static determineWinner(playerMoveIndex, computerMoveIndex, moves) {
        const numMoves = moves.length;
        const diff = (computerMoveIndex - playerMoveIndex + numMoves) % numMoves;
        if (diff === 0) return 'Draw';
        if (diff <= Math.floor(numMoves / 2)) return 'Computer wins';
        return 'You win!';
    }
}