var game = new Phaser.Game(640, 500, Phaser.AUTO, 'game-area');

game.state.add('Preload', Preload);
game.state.add('Home', Home);
game.state.add('GameState', GameState)
game.state.add('Game', Game)

game.state.start('Preload');
