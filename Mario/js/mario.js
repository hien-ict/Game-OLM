var health = 3;
var game = new Phaser.Game(256, 256, Phaser.AUTO, 'game');
game.state.add('Preload', Preload);
game.state.add('State1_1', State1_1);
game.state.start('Preload');
