(function () {
    var game = new Phaser.Game(540, 400, Phaser.AUTO, 'game-area');

    var Game = createGame(game);
    game.state.add('Game', Game)

    game.state.start('Game');
})();
