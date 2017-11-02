var style = {
            font: '35px Arial',
            fill: '#fff',
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 2,
            backgroundColor: 'rgba(0,0,0,0.5)'
        };
var GameState = {

    create: function(){
        this.background = game.add.sprite(0 , 0 , "background");
//        this.background.scale.setTo(0.5);
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
//        game.input.onDown.add(this.gofull, this);
        this.player  = game.add.sprite(654, 481, 'player');
        this.player.anchor.setTo(0.5);
    },

    update: function(){

    },

    render: function(){
        game.debug.inputInfo(32, 32, style);
    },

    gofull: function () {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    }
}
