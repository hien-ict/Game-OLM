var Preload = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //initiate physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

    },
    preload: function () {
        this.load.spritesheet('block', 'Multiplication/assets/Block_1.png', 100, 100, 15);

        this.load.image('background', 'Multiplication/assets/background.png')

        this.load.audio('snd1', 'Multiplication/assets/sndBeep2.ogg');
        this.load.audio('snd2', 'Multiplication/assets/sndClick.ogg');
        this.load.audio('snd3', 'Multiplication/assets/sndComet.ogg');
        this.load.audio('snd4', 'Multiplication/assets/sndDestroyBlock.ogg');
        this.load.audio('snd5', 'Multiplication/assets/sndDropWall.ogg');
        this.load.audio('snd8', 'Multiplication/assets/sndTick.ogg');

    },

    create: function () {
        this.state.start('GameState');
    }
}
