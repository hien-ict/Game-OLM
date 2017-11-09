var Home = {
    init: function (message) {
        this.message = message;
    },

    preload: function () {

    },

    create: function () {
        var style = {
            font: '30px Arial',
            fill: '#ff0000',
            align: "center",
            stroke: "#8df51e",
            strokeThickness: 2
        };
        var style2 = {
            font: '35px Arial',
            fill: '#fff',
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 2
        };
//        this.background = game.add.sprite(0, 0, 'background');
        //this.background = game.add.sprite(0, 50, 'instruction');
        this.newgame = game.add.sprite(640, 200, 'button');
        this.newgame.anchor.setTo(0.5);
        this.newgame.scale.setTo(0.5);
        this.newgame.inputEnabled = true;
        this.newgame.events.onInputDown.add(function () {
            this.state.start('GameState');
        }, this);
        this.newgame.alpha = 0.7;
        this.newgame.events.onInputOver.add(this.over, this.newgame);
        this.newgame.events.onInputOut.add(this.out, this.newgame);
        this.newgame.input.useHandCursor = true;
        this.newgame.input.pixelPerfectClick = true;
        this.newgame.input.pixelPerfectOver = true;

        this.law = game.add.sprite(640, 400, 'button');
        this.law.anchor.setTo(0.5);
        this.law.scale.setTo(0.5);
        this.law.inputEnabled = true;
        this.law.events.onInputDown.add(function () {
            this.state.start('GameState');
        }, this);
        this.law.alpha = 0.7;
        this.law.events.onInputOver.add(this.over, this.law);
        this.law.events.onInputOut.add(this.out, this.law);
        this.law.input.useHandCursor = true;
        this.law.input.pixelPerfectClick = true;
        this.law.input.pixelPerfectOver = true;

        this.create = game.add.sprite(640, 600, 'button');
        this.create.anchor.setTo(0.5);
        this.create.scale.setTo(0.5);
        this.create.inputEnabled = true;
        this.create.events.onInputDown.add(function () {
            this.state.start('GameState');
        }, this);
        this.create.alpha = 0.7;
        this.create.events.onInputOver.add(this.over, this.create);
        this.create.events.onInputOut.add(this.out, this.create);
        this.create.input.useHandCursor = true;
        this.create.input.pixelPerfectClick = true;
        this.create.input.pixelPerfectOver = true;
    },

    update: function () {

    },

    out() {
        this.alpha = 0.7;
    },

    over() {
        this.alpha = 1;
    }
}
