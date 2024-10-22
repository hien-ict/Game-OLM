var State = {
    init: function (message) {
        this.message = message;
    },

    create: function () {
        this.snd7 = game.add.audio('snd7');
        this.snd7.play();
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
        round++;
        block_speed += 2;
        console.log(block_speed);
        if (this.message) {
            this.text = game.add.text(320, 100, this.message, style);
        }
        this.text.anchor.setTo(0.5);

        this.text = game.add.text(320, 350, 'CLICK TO CONTINUE', style2);
        this.text.inputEnabled = true;
        this.text.events.onInputDown.add(function () {
            this.state.start('GameState', true, false, Home.message);
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
