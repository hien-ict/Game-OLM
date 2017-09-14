var Preload = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //initiate physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

    },
    preload: function () {
        this.load.spritesheet('ship', 'SpaceRacer/assets/ship.png', 128, 128, 2);
        this.load.spritesheet('obj', 'SpaceRacer/assets/asteroids.png', 128, 128, 4);
        this.load.spritesheet('expl', 'SpaceRacer/assets/explosion.png', 64, 64, 25);

        this.load.image('background', 'SpaceRacer/assets/space.png');
        this.load.image('background1', 'SpaceRacer/assets/background1.png');
        this.load.image('background2', 'SpaceRacer/assets/background.png');
        this.load.image('start', 'SpaceRacer/assets/start.png');

        this.load.audio('explosionSound', 'SpaceRacer/assets/explosion.mp3');
        this.load.audio('music', 'SpaceRacer/assets/DST-StreetFightLoop.mp3');
    },

    create: function () {
        this.state.start('Home');
    }
}
