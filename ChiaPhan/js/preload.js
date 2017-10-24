var Preload = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function () {
        this.load.image('background', '../NumberConundrum/assets/background.jpg');
        this.load.image('frac', 'ChiaPhan/assets/frac.png');
        this.load.image('frac1', 'ChiaPhan/assets/frac2.png');
        this.load.image('check', 'ChiaPhan/assets/check.png');
        this.load.image('new', 'ChiaPhan/assets/new.png');
        this.load.text('level', 'ChiaPhan/assets/level.json');
    },

    create: function () {
        //game.state.start('Home', true, false, "WELCOME");
        game.state.start('Home');
    }
}
