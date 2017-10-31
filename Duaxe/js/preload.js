var Preload = {
    init: function () {
//        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function () {
        this.load.image('background', 'Duaxe/assets/background.png');
    },

    create: function () {
        //game.state.start('Home', true, false, "WELCOME");
        game.state.start('GameState');
    }
}
