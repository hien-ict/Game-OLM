var health = 3;
var game = new Phaser.Game(256, 512, Phaser.AUTO, 'game');
game.state.add('Preload', Preload);
game.state.add('State1_1', State1_1);
game.state.add('State1_2', State1_2);
game.state.add('State1_3', State1_3);
game.state.add('State1_4', State1_4);
game.state.start('Preload');
