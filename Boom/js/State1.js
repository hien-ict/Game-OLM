var State1 = {

    create: function () {
        this.stage.backgroundColor = '#fff';
        this.background = this.add.tileSprite(0, 0, 500, 500, 'background');
        this.background.alpha = 0.4;

        Preload.createMapState();

        Preload.createMap();

        Preload.createFlare();

        Preload.createBoom();

        Preload.createBomber();

        Preload.top = Preload.map.createLayer('top', 500, 500);
    },

    update: function () {

        this.game.physics.arcade.collide(Preload.bomber, Preload.layer);
        this.game.physics.arcade.collide(Preload.bomber, Preload.break);
        this.game.physics.arcade.collide(Preload.bomber, Preload.boom);

        Preload.walk(Preload.bomber, 'live');
        Preload.play(Preload.bomber, 'live');
    }
}
