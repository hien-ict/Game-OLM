var Preload = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function () {
        this.load.image('background', '../NumberConundrum/assets/background.jpg');
        this.load.image('frac', 'ChiaPhan/assets/frac.png');
        this.load.text('level', 'ChiaPhan/assets/level.json');
    },

    create: function () {
        //game.state.start('Home', true, false, "WELCOME");
        game.state.start('GameState');
    }
}
