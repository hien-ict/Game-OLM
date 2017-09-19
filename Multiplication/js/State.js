var State = {
    init: function (message) {
        this.message = message;
    },

    create: function () {
        this.background = game.add.sprite(0, 0, 'background');
        //this.background.scale.setTo(0.2);
        var style2 = {
            font: '35px Arial',
            fill: '#fff',
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 2
        };
        var style = {
            font: '30px Arial',
            fill: '#ff0000',
            align: "center",
            stroke: "#8df51e",
            strokeThickness: 2
        };

        block_speed+=5;
        this.text = game.add.text(320, 350, 'CLICK TO CONTINUE', style2);
        if (this.message) {
            this.text = game.add.text(320, 20, this.message, style);
        }
        this.text.inputEnabled = true;
        this.text.events.onInputDown.add(function () {
            this.state.start('GameState');
        }, this);

        this.text.events.onInputOver.add(this.over, this);
        this.text.events.onInputOut.add(this.out, this);
        this.text.input.useHandCursor = true;
        this.text.anchor.setTo(0.5);
    },

    update: function () {

    },

    out() {
        this.text.fill = "#fff";
    },

    over() {
        this.text.fill = '#ff00ff';
    }
}
