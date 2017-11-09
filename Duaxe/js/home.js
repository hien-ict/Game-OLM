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
        this.create = game.add.sprite(640, 200, 'button');
        this.create.anchor.setTo(0.5);
        this.create.scale.setTo(0.5);
        this.create.inputEnabled = true;
        this.create.events.onInputDown.add(function () {
            this.state.start('GameState');
        }, this);
        this.create.alpha = 0.7;
        this.create.events.onInputOver.add(this.over, this);
        this.create.events.onInputOut.add(this.out, this);
        this.create.input.useHandCursor = true;
        this.create.input.pixelPerfectClick = true;
        this.create.input.pixelPerfectOver = true;

    },

    update: function () {

    },

    out() {
        this.create.alpha = 0.7;
    },

    over() {
        this.create.alpha = 1;
    }
}
