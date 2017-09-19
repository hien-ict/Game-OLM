var game = new Phaser.Game(640, 493, Phaser.AUTO, 'game');

game.state.add('Preload', Preload);
game.state.add('Home', Home);
game.state.add('GameState', GameState);
game.state.add('State', State);

game.state.start('Preload');
