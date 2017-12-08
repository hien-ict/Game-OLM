var tween = null;
var numPlayer=0;
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
//                this.background = game.add.sprite(0, 0, 'background2');
//                this.background.scale.setTo(2);
        this.sndClick = game.add.audio('click');
        this.stage.backgroundColor = '#fff';
        //this.background = game.add.sprite(0, 50, 'instruction');
        this.newgame = game.add.sprite(640, 400, 'button');
        this.newgame.anchor.setTo(0.5);
        this.newgame.scale.setTo(0.5);
        this.newgame.inputEnabled = true;
        this.newgame.events.onInputDown.add(function () {

            connection.emit('event.data', { room: 'room1' , msg : 'Start', num: numPlayer});
//            this.state.start('GameState');
            this.sndClick.play();
        }, this);
        this.newgame.alpha = 0.7;
        this.newgame.events.onInputOver.add(this.over, this.newgame);
        this.newgame.events.onInputOut.add(this.out, this.newgame);
        this.newgame.input.useHandCursor = true;
        this.newgame.input.pixelPerfectClick = true;
        this.newgame.input.pixelPerfectOver = true;


        this.rand = game.add.sprite(640, 600, 'button');
        this.rand.anchor.setTo(0.5);
        this.rand.scale.setTo(0.5);
        this.rand.inputEnabled = true;
        this.rand.events.onInputDown.add(function () {
            if (numPlayer<4){
//                connection.emit('event.data', { room : 'room1', player : 'Player'+numPlayer, num: numPlayer});
//
            }
        }, this);
        this.rand.alpha = 0.7;
        this.rand.events.onInputOver.add(this.over, this.rand);
        this.rand.events.onInputOut.add(this.out, this.rand);
        this.rand.input.useHandCursor = true;
        this.rand.input.pixelPerfectClick = true;
        this.rand.input.pixelPerfectOver = true;


        this.create = game.add.sprite(640, 800, 'button');
        this.create.anchor.setTo(0.5);
        this.create.scale.setTo(0.5);
        this.create.inputEnabled = true;
        this.create.events.onInputDown.add(function () {

            this.openWindow();
            var acceptButton = game.make.sprite(0,240, 'block2');
            acceptButton.inputEnabled = true;
            acceptButton.anchor.setTo(0.5);
            acceptButton.input.priorityID = 1;
            acceptButton.input.useHandCursor = true;
            //        acceptButton.events.onInputDown.add(this.closeWindow, this);
            this.popup.addChild(acceptButton);
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
            this.openWindow();
        }, this);
        this.join.alpha = 0.7;
        this.join.events.onInputOver.add(this.over, this.join);
        this.join.events.onInputOut.add(this.out, this.join);
        this.join.input.useHandCursor = true;
        this.join.input.pixelPerfectClick = true;
        this.join.input.pixelPerfectOver = true;

        this.createPopup();
    },

    update: function () {

    },

    out() {
        this.alpha = 0.7;
    },

    over() {
        this.alpha = 1;
    },

    createPopup: function () {
        this.popup = game.add.sprite(game.world.centerX, game.world.centerY, 'popup');
        //        this.popup.alpha = 2;
        this.popup.anchor.set(0.5);
        this.popup.inputEnabled = true;
        //        this.popup.input.enableDrag();

        //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
        var pw = (this.popup.width / 2) - 42;
        var ph = (this.popup.height / 2) - 58;

        //  And click the close button to close it down again
        var closeButton = game.make.sprite(pw, -ph, 'close');
        closeButton.inputEnabled = true;
        closeButton.anchor.setTo(0.5);
        closeButton.input.priorityID = 1;
        closeButton.input.useHandCursor = true;
        closeButton.events.onInputDown.add(this.closeWindow, this);

        //  Add the "close button" to the popup window image
        this.popup.addChild(closeButton);

        //  Hide it awaiting a click
        this.popup.scale.set(0);


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
        this.popup.alpha = 0.9;
    },

    render: function () {
        game.debug.inputInfo(32, 32, style);
    },


}
