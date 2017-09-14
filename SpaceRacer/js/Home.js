var Home = {
    create: function () {
        this.background = game.add.sprite(0, 0, 'background2');
        this.background = game.add.sprite(0, 60, 'background1');

        this.button = game.add.button(210, 470, 'start', this.actionOnClick, this, 0, 0, 0);
        this.button.anchor.setTo(0.5);
        this.button.scale.setTo(0.8);
        this.button.alpha = 1;
    },

    update: function () {

    },

    actionOnClick: function () {
        game.state.start('State1');
    }
}
