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
        this.load.spritesheet('select', 'Multiplication/assets/select.png', 100, 100, 3);

        this.load.image('background', 'Multiplication/assets/background.jpg')

        this.load.audio('snd1', 'Multiplication/assets/sndBeep2.mp3');
        this.load.audio('snd2', 'Multiplication/assets/sndClick.mp3');
        this.load.audio('snd3', 'Multiplication/assets/sndComet.mp3');
        this.load.audio('snd4', 'Multiplication/assets/sndDestroyBlock.mp3');
        this.load.audio('snd5', 'Multiplication/assets/sndDropWall.mp3');
        this.load.audio('snd6', 'Multiplication/assets/sndTick.mp3');
        this.load.audio('snd7', 'Multiplication/assets/sndMedal.mp3');

    },

    create: function () {
        this.state.start('Home');
    }
}
