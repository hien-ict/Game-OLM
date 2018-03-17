function createHome(game_online, connection) {
    var tween = null;
    return {
        create: function () {
            game_online.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.background = game_online.add.sprite(0, 0, "background");

            this.createRoom = game_online.add.sprite(262, 60, "createRoom");
            this.createRoom.inputEnabled = true;
            this.createRoom.events.onInputDown.add(function () {
                this.openWindow();
            }, this);
            //        this.createRoom.alpha = 0.7;
            this.createRoom.events.onInputOver.add(this.over, this.createRoom);
            this.createRoom.events.onInputOut.add(this.out, this.createRoom);
            this.createRoom.input.useHandCursor = true;
            this.createRoom.input.pixelPerfectClick = true;
            this.createRoom.input.pixelPerfectOver = true;

            this.createPopup();

            console.log(this.games);
        },

        update: function () {},

        out() {
            this.alpha = 0.7;
        },

        over() {
            this.alpha = 1;
        },

        openWindow: function () {

            if ((tween !== null && tween.isRunning) || this.popup.scale.x === 1) {
                return;
            }

            //  Create a tween that will pop-open the window, but only if it's not already tweening or open
            tween = game_online.add.tween(this.popup.scale).to({
                x: 1,
                y: 1
            }, 800, Phaser.Easing.Elastic.Out, true);
            this.popup.alpha = 0.96;
        },

        closeWindow: function () {
            if (tween && tween.isRunning || this.popup.scale.x === 0) {
                return;
            }

            //  Create a tween that will close the window, but only if it's not already tweening or closed
            tween = game_online.add.tween(this.popup.scale).to({
                x: 0,
                y: 0
            }, 500, Phaser.Easing.Elastic.In, true);
        },

        createPopup: function () {
            this.popup = game_online.add.sprite(game_online.world.centerX, game_online.world.centerY, 'popup');
            //        this.popup.alpha = 2;
            this.popup.anchor.set(0.5);
            this.popup.inputEnabled = true;
            //        this.popup.input.enableDrag();

            var closeButton = game_online.make.sprite(0, 0, 'huy');
            closeButton.inputEnabled = true;
            closeButton.anchor.setTo(0.5);
            closeButton.input.priorityID = 1;
            closeButton.input.useHandCursor = true;

            closeButton.input.pixelPerfectClick = true;
            closeButton.input.pixelPerfectOver = true;
            closeButton.events.onInputDown.add(this.closeWindow, this);


            var createButton = game_online.make.sprite(0, 0, 'xacnhan');
            createButton.inputEnabled = true;
            createButton.anchor.setTo(0.5);
            createButton.input.priorityID = 1;
            createButton.input.useHandCursor = true;

            createButton.input.pixelPerfectClick = true;
            createButton.input.pixelPerfectOver = true;
            createButton.events.onInputDown.add(this.closeWindow, this);

            //  Add the "close button" to the popup window image
            this.popup.addChild(closeButton);
            this.popup.addChild(createButton);

            //  Hide it awaiting a click
            this.popup.scale.set(0);


        },
    }
}
