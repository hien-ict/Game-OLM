var game = new Phaser.Game(420, 640, Phaser.AUTO, 'game');
game.state.add('Preload', Preload);
game.state.add('Home', Home);
game.state.add('State1', State1);

game.state.start('Preload');
