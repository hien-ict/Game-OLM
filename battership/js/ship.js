																				var height = window.innerHeight - 20;
var width = height / 1.6,
    scale = height / 720;
var state, music, bg1, bg2, scrollSpeed = 12,
    energyBar, interval = 5000,
    state2 = 'new',
    roisao = 6000,
    explosion, starting,
    noOfActors = 4;
const asteroidBaseVelocity = 250 * scale;
const asteroidVelocityIncrease = 15 * scale;
const asteroidBodySize = 0.8;
const baseVelocity = 1 * scale;
const baseDrain = 0.0004;
const baseRecharge = 0.00012;
var asteroidVelocity;


var self = GameState = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        //initiate physics system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 100;
    },

    create: function () {
        Cf.loadScript();
        var rot;
        state = 'new';
        start = Date.now();
        lastTime = Date.now();
        asteroidVelocity = asteroidBaseVelocity;
        this.createBackground();
        this.createStar();
        this.createAsteroid();

        this.createActors();


        this.explosionSound = game.add.audio('explosionSound');
        this.ting = game.add.audio('ting');


        this.button = game.add.button(0, 0, 'start', this.actionOnClick, this, 0, 0, 0);
        this.button.anchor.setTo(0, 0);
        this.button.scale.setTo(scale * 0.3, scale * 0.3);
        this.button.alpha = 0.2;

        this.musicButton = game.add.button(game.world.width, 0, 'musicButton', this.actionOnClickMusic, this, 0, 0, 0);
        this.musicButton.anchor.setTo(1, 0);
        this.musicButton.scale.setTo(scale * 0.3, scale * 0.3);
        this.musicButton.alpha = 0.2;

        // play music only if it is not already playing
        if (typeof music === 'undefined') {
            music = game.add.audio('music', 1, true);
            music.addMarker('main', 0, 134.008125, 0.5, true);
            this.playMusic(this.getMusicCookie() == 'on');
        }
    },

    update: function () {
      	if(Cf.popup == 1) Cf.waiting = 1;
		if(Cf.waiting == 1)
		{
          	game.pause= true;
			if(Cf.resq == 1)
			{
				Cf.waiting = 0;
				Cf.resq = -1;
              	//this.player.customParams.chkOverlap = 0;
				console.log(true);
              	state='waiting';
              	state2='new';
              	game.pause=false;
			}
			else if(Cf.resq == 0)
			{
				Cf.waiting = 0;
				Cf.resq = -1;
              	//this.player.customParams.chkOverlap = 0;
				console.log(false);
              	//state='waiting';
              	//state2='waiting';
              	Cf.next();
			}
		}
        if (music.currentTime > 133000) {
            music.stop();
            this.playMusic(this.getMusicCookie() == 'on');
        }

        if (state == 'paused') {
            state = oldState;
            return;
        } else if (state == 'gameover') {
            return;
        }

        var timeInMs = Date.now();
        var delta = (timeInMs - lastTime);
        this.checkState();

        if (delta > 1000) { //TODO deal with long pause with some onPause/onResume methods
            delta = 0;
        }
        this.updateBackground();
        let self = this;

        this.updateCollisions();

        this.updateEnergyBar();

        this.updateStar();

        this.updateObstacles();


        var vel = baseVelocity * delta;
        var energyDrain = baseDrain * delta;

        this.updatePlayer(this.actors, vel, energyDrain, Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D);
        this.updatePlayer(this.actors, vel, energyDrain, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT);

        this.rechargeEnergy(baseRecharge * delta);

        lastTime = Date.now();

    },

    actionOnClick: function () {
        this.state.start('GameState');
    },

    actionOnClickMusic: function () {
        if (music !== 'defined') {
            if (music.isPlaying) {
                this.setMusicCookie('off');
                this.playMusic(false);
            } else {
                this.setMusicCookie('on');
                this.playMusic(true);
            }
        }
    },

    playMusic: function (play) {
        if (play) {
            music.play('main');
            this.musicButton.setFrames(0, 0, 0);
        } else {
            music.pause();
            this.musicButton.setFrames(1, 1, 1);
        }
    },

    createBackground: function () {
        bg1 = game.add.sprite(0, 0, 'background');
        bg2 = game.add.sprite(0, -bg1.height * scale, 'background');
        bg1.scale.x = scale;
        bg1.scale.y = scale;
        bg2.scale.x = scale;
        bg2.scale.y = scale;
    },

    createAsteroid: function () {
        this.asteroid = game.add.sprite(-width, -height, 'asteroid', 0);
        this.asteroid.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.asteroid);
        this.asteroid.body.setSize(this.asteroid.body.width * asteroidBodySize, this.asteroid.body.height * asteroidBodySize, 0, 0);
        this.resetAsteroid();
    },

    createStar: function () {
        this.star = game.add.sprite(-width, -height, 'star', 0);
        this.star.anchor.setTo(0.5);
        this.game.physics.arcade.enable(this.star);

        //this.star.body.bounce.y = 0.2;
        this.star.body.bounce.x = 1;
        //this.star.body.collideWorldBounds = true;
        this.star.body.gravity.y = 5;

        this.star.body.setSize(this.star.body.width * asteroidBodySize, this.star.body.height * asteroidBodySize, 0, 0);
        this.resetStar();
    },

    createExplosion: function () {
        explosion = game.add.sprite(-width, -height, 'explosion');
        explosion.animations.add('boom');
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        return explosion;
    },

    createTing: function() {
        starting = game.add.sprite(-width, -height, 'star');
        starting.animations.add('ting');
        starting.anchor.x = 0.5;
        starting.anchor.y = 0.5;
        return starting;
    },

    createEnergyBar: function (barX, index) {
        energyBar = game.add.sprite(this.game.world.centerX, 40, 'energyBar', index);

        energyBar.alpha = 0.3;
        energyBar.anchor.x = 0.5;
        energyBar.anchor.y = 0.5;
        energyBar.scale.x = scale;
        energyBar.scale.y = scale;


        return energyBar;
    },

    createActors: function () {
        var quarter = game.world.centerX / 2;
        var i = 1;
        var xPos = quarter / 2 + i * (quarter);
        this.actors = game.add.sprite(xPos, game.world.centerY, 'ship');
        this.actors.animations.add('burn', [i, i + 4]);

        this.actors.animations.play('burn', 150 + (i * 10), true);
        this.actors.anchor.x = 0.5;
        this.actors.anchor.y = 0.5;

        this.game.physics.arcade.enable(this.actors);
        this.actors.body.bounce.y = 0.2;
        this.actors.body.bounce.x = 0.2;
        this.actors.body.collideWorldBounds = true;
        this.actors.body.gravity.y = 5;

        this.actors.energy = 1;

        this.actors.scale.x = scale;
        this.actors.scale.y = scale;

        this.actors.state = 'new';

        this.actors.name = 'You or ID= ';

        this.actors.explosion = this.createExplosion();
        this.actors.starting = this.createTing();
        this.actors.energyBar = this.createEnergyBar(xPos, i);

        this.actors.restingPositionShift = 50 * Math.random() * scale;
    },

    updateBackground: function () {
        bg1.y = bg1.y + scrollSpeed * scale;
        bg2.y = bg2.y + scrollSpeed * scale;

        if (bg1.y > height) {
            bg1.y = -bg1.height;;
        }
        if (bg2.y > height) {
            bg2.y = -bg2.height;
        }
    },

    updateEnergyBar: function () {

        this.actors.energyBar.scale.x = this.actors.energy * scale;


    },

    updateCollisions: function () {
        if (state == 'asteroid') {
            game.physics.arcade.overlap(this.actors, this.asteroid, this.collisionHandler);
        }
        if (state2 == 'star') {
            game.physics.arcade.overlap(this.actors, this.star, this.show);
        }

    },

    // head-on collision = death, show explosion and let it fall down
    collisionHandler: function (actor, asteroid) {

        if (actor.body.touching.up) {

            self.explosionSound.stop();
            self.explosionSound.play();
            console.log(actor.name + ' collided with Asteroid');
            actor.explosion.x = actor.x;
            actor.explosion.y = actor.y;
            actor.explosion.animations.play('boom', 50, false);

            actor.state = 'crashed';
            actor.energyBar.kill();
            actor.kill();

        }

    },

    show: function (actor, star) {

        if (actor.body.touching.up) {
            self.ting.stop();
            self.ting.play();
            console.log(actor.name + ' collided with Star');
            actor.starting.x = actor.x;
            actor.starting.y = actor.y;
            actor.starting.animations.play('ting', 12, false);
            star.y += 200;
            Cf.next();
          	state='show';
          	state2='show';
        }

    },

    updateObstacles: function () {

        if (state == 'new') {
            gracePeriod = Date.now() + interval;
            interval = 2500;
            state = 'waiting';
        } else if (state == 'waiting') {
            if (Date.now() > gracePeriod) {

                state = 'asteroid';
                this.asteroid.y = -this.asteroid.height;
                this.asteroid.x = width * Math.random();
                this.asteroid.body.velocity.y = asteroidVelocity += asteroidVelocityIncrease;
                this.asteroid.angle = 360 * Math.random();
                rot = Math.random() - 0.5;

            }
        } else if (state == 'asteroid') {
            this.asteroid.body.velocity.y += 1.0;

            this.asteroid.angle += rot;
            if (this.asteroid.y > height + this.asteroid.height) {
                this.resetAsteroid();
                interval -= 100;
                gracePeriod = Date.now() + interval;

                state = 'waiting';
            }
        }
    },

    updateStar: function () {
        if (state2 == 'new') {
            starroi = Date.now() + roisao;
            roisao = 4000;
            state2 = 'waiting';
        } else
        if (state2 == 'waiting') {
            if (Date.now() > starroi) {

                state2 = 'star';
                this.star.y = -this.star.height;
                this.star.x = width * Math.random();
                this.star.body.velocity.y = asteroidVelocity += asteroidVelocityIncrease;
                this.star.angle = 720;
                rot = Math.random() - 0.5;

            }
        } else if (state2 == 'star') {
            this.star.body.velocity.y += 1;
			//this.star.body.velocity.x += 1;
            this.star.angle += (2 * rot);

            if (this.star.y > 3000 * Math.random() * height + this.star.height) {
                this.resetStar();
                roisao -= 250;
                starroi = Date.now() + roisao;

                state2 = 'waiting';
            }
        }
    },

    updatePlayer: function (player, deltaVel, energyDrain, up, down, left, right) {

        if (player.energy > baseDrain && player.state != 'crashed') {
            if (game.input.keyboard.isDown(left)) {
                this.pressLeft(player, deltaVel, energyDrain);
                player.human = true;
            }
            if (game.input.keyboard.isDown(right)) {
                this.pressRight(player, deltaVel, energyDrain);
                player.human = true;
            }
            if (game.input.keyboard.isDown(up)) {
                this.pressUp(player, deltaVel, energyDrain);
                player.human = true;
            }
            if (game.input.keyboard.isDown(down)) {
                this.pressDown(player, deltaVel, energyDrain);
                player.human = true;
            }
        }
    },

    drainEnergy: function (player, energyDrain) {
        player.energy -= energyDrain;
    },

    rechargeEnergy: function (energyGain) {

        if (this.actors.energy < 1) {
            this.actors.energy += energyGain;
        } else {
            this.actors.energy = 1;
        }

    },

    pressDown: function (player, deltaVel, energyDrain) {
        player.body.velocity.y += deltaVel;
        this.drainEnergy(player, energyDrain);
    },

    pressUp: function (player, deltaVel, energyDrain) {
        player.body.velocity.y -= deltaVel;
        this.drainEnergy(player, energyDrain);
    },

    pressLeft: function (player, deltaVel, energyDrain) {
        player.body.velocity.x -= deltaVel;
        this.drainEnergy(player, energyDrain);
    },

    pressRight: function (player, deltaVel, energyDrain) {
        player.body.velocity.x += deltaVel;
        this.drainEnergy(player, energyDrain);
    },

    checkState: function () {
        if (this.actors.state == 'crashed') {
            this.printMessage(" GAME OVER!");
            this.gameover();
        }
    },

    gameover: function () {
        state = 'gameover';
        this.asteroid.kill();
        //for (var i = 0; i < noOfActors; i++) {
        this.actors.animations.stop('burn');
        this.actors.body.velocity.setTo(0, 0);
        //}
        this.button.alpha = 1;
    },

    printMessage: function (msg) {
        var style = {
            font: "bold " + (30 * scale) + "pt Arial",
            fill: "#ffffff",
            align: "center",
            stroke: "#258acc",
            strokeThickness: 8
        };

        s = game.add.text(game.world.centerX, game.world.centerY, msg, style);
        s.anchor.setTo(0.5, 0.5);
    },

    resetAsteroid: function () {
        var asteroidScale = (Math.random() / 2 + 0.5) * scale;
        this.asteroid.scale.x = asteroidScale;
        this.asteroid.scale.y = asteroidScale;
        this.asteroid.x = -width;
        this.asteroid.y = -height;
        this.asteroid.body.velocity.x = 0;
        this.asteroid.body.velocity.y = 0;
    },

    resetStar: function () {
        var starScale = (Math.random() / 2 + 0.5) * scale;
        this.star.scale.x = starScale;
        this.star.scale.y = starScale;
        this.star.x = -width;
        this.star.y = -height;
        this.star.body.velocity.x = 0;
        this.star.body.velocity.y = 0;
    },

    setMusicCookie: function (value) {
        document.cookie = "tcob1-music=" + value;
    },

    getMusicCookie: function () {
        var value = 'on';
        var cookies = document.cookie;
        var index = cookies.indexOf(" tcob1-music=");
        if (index == -1) {
            index = cookies.indexOf("tcob1-music=");
        }
        if (index != -1) {
            index = cookies.indexOf("=", index) + 1;
            var end = cookies.indexOf(";", index);
            if (end == -1) {
                end = cookies.length;
            }
            value = unescape(cookies.substring(index, end));
        }
        return value;
    }
}

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');

game.state.add('GameState', GameState);
//game.state.start('GameState');
game.state.add('PreloadState', PreloadState);
game.state.start('PreloadState');
