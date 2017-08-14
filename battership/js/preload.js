				var scale = (window.innerHeight - 20) / 720;
var PreloadState = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //initiate physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    preload: function () {
        game.load.image('logo', 'battership/assets/logo.png');

        game.load.image('bigShip', 'battership/assets/ship.png');
        game.load.image('start', 'battership/assets/start.png');
        game.load.image('background', 'battership/assets/stars2.png');

        game.load.spritesheet('musicButton', 'battership/assets/music.png', 256, 64, 2);
        game.load.spritesheet('ship', 'battership/assets/ship-new.png', 64, 64, 8);
        game.load.spritesheet('asteroid', 'battership/assets/asteroids.png', 128, 128, 4);
        game.load.spritesheet('explosion', 'battership/assets/explosion.png', 64, 64, 25);
        game.load.spritesheet('energyBar', 'battership/assets/energy.png', 256, 16, 4);
        game.load.spritesheet('star', 'battership/assets/star.png', 100, 95.5, 12);

        game.load.audio('explosionSound', ['battership/assets/explosion.mp3', 'battership/assets/explosion.ogg']);
        game.load.audio('music', ['battership/assets/DST-StreetFightLoop.mp3']);
        game.load.audio('ting', ['battership/assets/ting.mp3']);
    },
    create: function () {
        this.logo = game.add.sprite(0, 0, 'logo');
        this.logo.scale.setTo(scale * 0.5, scale * 0.5);

        this.ship = game.add.sprite(game.world.centerX, game.world.centerY, 'bigShip');
        this.ship.anchor.setTo(0.5, 0.5);
        this.ship.scale.setTo(scale * 0.5, scale * 0.5);

        this.button = game.add.button(game.world.centerX, game.world.height * 0.75, 'start', this.actionOnClick, this, 0, 0, 0);
        this.button.scale.setTo(scale, scale);
        this.button.anchor.setTo(0.5, 0.5);
    },
    actionOnClick: function () {
        this.state.start('GameState');
    }
}
