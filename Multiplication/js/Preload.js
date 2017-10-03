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

        this.load.image('background', 'Multiplication/assets/background.png');
        this.load.image('nhan', 'Multiplication/assets/icon1.png');
        this.load.image('cong', 'Multiplication/assets/icon2.png');
        this.load.image('tru', 'Multiplication/assets/icon3.png');

        this.load.audio('snd1', 'Multiplication/assets/sndExplode.mp3');
        this.load.audio('snd2', 'Multiplication/assets/sndClick.mp3');
        this.load.audio('snd3', 'Multiplication/assets/sndComet.mp3');
        this.load.audio('snd4', 'Multiplication/assets/sndDestroyBlock.mp3');
        this.load.audio('snd5', 'Multiplication/assets/sndDropWall.mp3');
        this.load.audio('snd6', 'Multiplication/assets/sndTick.mp3');
        this.load.audio('snd7', 'Multiplication/assets/sndMedal.mp3');
        this.load.audio('snd8', 'Multiplication/assets/sndComet.mp3');

    },

    create: function () {
        var style2 = {
            font: '35px Arial',
            fill: '#fff',
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 2
        };
        var style = {
            font: '30px Arial',
            fill: '#fff',
            align: "center",
            stroke: "#8df51e",
            strokeThickness: 2
        };
        this.background = game.add.sprite(0, 0, 'background');


        this.nhan = game.add.sprite(320, 245, "nhan");
        this.nhan.anchor.setTo(0.5);
        this.nhan.inputEnabled = true;
        this.nhan.events.onInputDown.add(function () {
            this.state.start('Home', true, false, 'nhan');
        }, this);

        this.nhan.events.onInputOver.add(this.over, this.nhan);
        this.nhan.events.onInputOut.add(this.out, this.nhan);
        this.nhan.input.useHandCursor = true;
        this.nhan.input.pixelPerfectClick = true;
        this.nhan.input.pixelPerfectOver = true;

        this.cong = game.add.sprite(320, 245, "cong");
        this.cong.anchor.setTo(0.5);
        this.cong.inputEnabled = true;
        this.cong.events.onInputDown.add(function () {
            this.state.start('Home', true, false, 'cong');
        }, this);

        this.cong.events.onInputOver.add(this.over, this.cong);
        this.cong.events.onInputOut.add(this.out, this.cong);
        this.cong.input.useHandCursor = true;
        this.cong.input.pixelPerfectClick = true;
        this.cong.input.pixelPerfectOver = true;

        this.tru = game.add.sprite(320, 245, "tru");
        this.tru.anchor.setTo(0.5);
        this.tru.inputEnabled = true;
        this.tru.events.onInputDown.add(function () {
            this.state.start('Home', true, false, 'tru');
        }, this);

        this.tru.events.onInputOver.add(this.over, this.tru);
        this.tru.events.onInputOut.add(this.out, this.tru);
        this.tru.input.useHandCursor = true;
        this.tru.input.pixelPerfectClick = true;
        this.tru.input.pixelPerfectOver = true;

    },

    out() {
        this.scale.setTo(1);
    },

    over() {
        this.scale.setTo(1.1);
    }
}
