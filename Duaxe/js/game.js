var GameState = {

    create: function(){
        this.background = game.add.sprite(0 , 0 , "background");
//        this.background.scale.setTo(0.5);
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
//        game.input.onDown.add(this.gofull, this);
    },

    update: function(){

    },

    render: function(){
        game.debug.inputInfo(32, 32);
    },

    gofull: function () {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    }
}
