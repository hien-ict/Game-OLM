var game = new Phaser.Game(640, 640, Phaser.AUTO, 'game-area');

game.state.add('Preload', Preload);
game.state.add('Home', Home);
game.state.add('GameState', GameState)

game.state.start('Preload');
