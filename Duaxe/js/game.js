var GameState = {

    create: function(){
        this.background = game.add.sprite(0 , 0 , "background");
        this.background.scale.setTo(0.5);
        game.input.onDown.add(this.gofull, this);
//        this.gofull();
    },

    update: function(){

    },

    render: function(){
        game.debug.inputInfo(32, 32);
    },

    gofull: function () {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
            //game.width = 640;
            //game.height = 640;
        } else {
            game.scale.startFullScreen(false);
            //game.width = screen.height;
            //game.height = screen.height;
        }
    }
}
