var tween = null;
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
        this.background = game.add.sprite(0, 0, 'background2');
        this.background.scale.setTo(2);
        //this.background = game.add.sprite(0, 50, 'instruction');
        this.newgame = game.add.sprite(640, 400, 'button');
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

        this.law = game.add.sprite(640, 600, 'button');
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

        this.create = game.add.sprite(640, 800, 'button');
        this.create.anchor.setTo(0.5);
        this.create.scale.setTo(0.5);
        this.create.inputEnabled = true;
        this.create.events.onInputDown.add(function () {
            this.openWindow();
        }, this);
        this.create.alpha = 0.7;
        this.create.events.onInputOver.add(this.over, this.create);
        this.create.events.onInputOut.add(this.out, this.create);
        this.create.input.useHandCursor = true;
        this.create.input.pixelPerfectClick = true;
        this.create.input.pixelPerfectOver = true;

        this.join = game.add.sprite(640, 1000, 'button');
        this.join.anchor.setTo(0.5);
        this.join.scale.setTo(0.5);
        this.join.inputEnabled = true;
        this.join.events.onInputDown.add(function () {
            this.state.start('GameState');
        }, this);
        this.join.alpha = 0.7;
        this.join.events.onInputOver.add(this.over, this.join);
        this.join.events.onInputOut.add(this.out, this.join);
        this.join.input.useHandCursor = true;
        this.join.input.pixelPerfectClick = true;
        this.join.input.pixelPerfectOver = true;

        this.popup = game.add.sprite(game.world.centerX, game.world.centerY, 'popup');
        this.popup.alpha = 0.8;
        this.popup.anchor.set(0.5);
        this.popup.inputEnabled = true;
        this.popup.input.enableDrag();

        //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
        var pw = (this.popup.width / 2) - 30;
        var ph = (this.popup.height / 2) - 8;

        //  And click the close button to close it down again
        var closeButton = game.make.sprite(pw, -ph, 'close');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(this.closeWindow, this);

        //  Add the "close button" to the popup window image
        this.popup.addChild(closeButton);

        //  Hide it awaiting a click
        this.popup.scale.set(0);
    },

    update: function () {

    },

    out() {
        this.alpha = 0.7;
    },

    over() {
        this.alpha = 1;
    },

    closeWindow: function () {
        if (tween && tween.isRunning || this.popup.scale.x === 0) {
            return;
        }

        //  Create a tween that will close the window, but only if it's not already tweening or closed
        tween = game.add.tween(this.popup.scale).to({
            x: 0,
            y: 0
        }, 500, Phaser.Easing.Elastic.In, true);
    },

    openWindow: function () {

        if ((tween !== null && tween.isRunning) || this.popup.scale.x === 1) {
            return;
        }

        //  Create a tween that will pop-open the window, but only if it's not already tweening or open
        tween = game.add.tween(this.popup.scale).to({
            x: 1,
            y: 1
        }, 1000, Phaser.Easing.Elastic.Out, true);
        this.popup.alpha=0.8;
    }

}
