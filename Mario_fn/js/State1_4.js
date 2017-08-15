var State1_4 = {
    init: function (message) {
        this.message = message;
    },

    create: function () {
        this.background = game.add.sprite(0, 0, 'background');
        //this.background.scale.setTo(0.2);
        this.background.inputEnabled = true;
        this.background.events.onInputDown.add(function () {
            this.state.start('State1_1');
            this.music.stop();
        }, this);

        var style2 = {
            font: '15px Arial',
            fill: '#fff',
            align: "center",
            stroke: "#258acc",
            strokeThickness: 2
        };
        var style = {
            font: '15px Arial',
            fill: '#ff0000',
            align: "center",
            stroke: "#8df51e",
            strokeThickness: 2
        };
        this.text = game.add.text(70, 128, 'CLICK TO START', style2);
        if (this.message) {
            this.text = game.add.text(20, 20, this.message, style);
        }
        this.music = game.add.audio('end');
        this.music.play();
        //this.text.anchor.setTo(0.5);
    },
    update: function(){
        if (this.music.completed > 14000 ) {
            this.music.stop();
            this.music.play();
        };
    }
}
