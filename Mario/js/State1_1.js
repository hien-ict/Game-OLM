var state,text,
    flag = 1,
    counter, score = 0;
var death = null;
var State1_1 = {
    create: function () {
        round = State1_1;
        counter = 300;
        next2 = 1;
        state = 'new';
        this.stage.backgroundColor = '#5C94FC';

        this.map = game.add.tilemap('map1-1');
        this.map.addTilesetImage('items', 'tiles');

        this.layer = this.map.createLayer('background', 256, 256);
        //this.layer.scale.set(0.5);
        this.layer.resizeWorld();
        this.layer.wrap = true;

        this.map.setCollisionBetween(14, 16);
        this.map.setCollisionBetween(21, 22);
        this.map.setCollisionBetween(27, 28);
        this.map.setCollisionByIndex(13);
        this.map.setCollisionByIndex(5);
        this.map.setCollisionByIndex(40);

        this.mario = game.add.sprite(50, 50, 'mario');
        this.mario.scale.setTo(0.47, 0.47);
        this.mario.anchor.setTo(0.5);

        this.game.physics.enable(this.mario);
        this.mario.body.gravity.y = 700;
        this.mario.body.bounce.y = 0;
        this.mario.body.linearDamping = 1;
        this.mario.body.collideWorldBounds = true;
        this.mario.body.fixedRotation = true;

        this.mario.animations.add('walk', [2, 4, 5], 6, true);

        this.goombas = game.add.group();
        this.goombas.enableBody = true;
        this.map.createFromTiles(41, null, 'goomba', 'goomba', this.goombas);
        this.goombas.callAll('animations.add', 'animations', 'walk', [0, 1], 2, true);
        this.goombas.callAll('animations.play', 'animations', 'walk');
        this.goombas.setAll('body.bounce.x', 1);
        this.goombas.setAll('body.gravity.y', 500);

        this.questions = game.add.group();
        this.questions.enableBody = true;
        this.map.createFromTiles(14, null, 'question', 'question', this.questions);
        this.questions.callAll('animations.add', 'animations', 'spin', [0, 0, 1, 2, 3, 4, 5], 4, true);

        this.cot = game.add.group();
        this.cot.enableBody = true;
        this.map.createFromTiles(17, null, 'cot', 'finish', this.cot);
        this.cot.x += 7;

        this.co = game.add.group();
        this.co.enableBody = true;
        this.map.createFromTiles(9, null, 'co', 'finish', this.co);
        this.co.x += 8;

        this.music = game.add.audio('music');
        this.jump = game.add.audio('jump');
        this.mariodie = game.add.audio('mariodie');
        this.mariowin = game.add.audio('mariowin');
        this.kick = game.add.audio('kick');
        this.star = game.add.audio('question');
        this.music.play();

        Preload.printScore();

        Preload.printHealth();

        Preload.printTime();
        this.game.time.events.loop(Phaser.Timer.SECOND, Preload.updateTime, this);

        this.game.camera.follow(this.mario);

//        this.mario.x = 3050;
    },

    update: function () {
        if (state == 'new') {
            text = 'ROUND 1'
            Preload.printMessage(text,15, 128);
            round.game.time.events.add(Phaser.Timer.SECOND *2, function () {

                state = 'live';

            });
        }

        if (round.music.currentTime > 29000 && state == 'live') {
            round.music.stop();
            round.music.play();
        };


        Preload.loadQuestion();
        Preload.checkState(this.mario);

        this.game.physics.arcade.collide(this.mario, this.layer);
        this.game.physics.arcade.collide(this.goombas, this.layer);
        this.game.physics.arcade.collide(this.cot, this.layer);
        this.game.physics.arcade.collide(this.co, this.layer);


        Preload.walk(this.mario, 'live');

        this.goombas.forEach(Preload.moveGoomba, this, true, 128, this.mario);
        this.questions.forEach(Preload.playQuestion, this, true, 128, this.mario);
        if (state == 'live') {
            this.game.physics.arcade.overlap(this.mario, this.goombas, Preload.kill);
            this.game.physics.arcade.overlap(this.mario, this.questions, Preload.showQuestion);
            this.game.physics.arcade.overlap(this.mario, this.cot, Preload.win);
            this.game.physics.arcade.overlap(this.mario, this.co, Preload.win2);
        };
        if (this.death && !this.death.done) this.death.next();

    }


}
