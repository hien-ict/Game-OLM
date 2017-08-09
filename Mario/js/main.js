																																								var game = new Phaser.Game(256, 256, Phaser.AUTO, 'game', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {
    game.load.tilemap('objects', 'Mario/assets/map1-1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'Mario/assets/items2.png');
    game.load.spritesheet('mario', 'Mario/assets/marioSmall.png', 34, 34, 7);
    game.load.spritesheet('goomba', 'Mario/assets/goomba.png', 16, 16);
    game.load.spritesheet('question', 'Mario/assets/question.png', 16, 17);
    game.load.image('finish', 'Mario/assets/finish.png');

    game.load.audio('music', 'Mario/assets/music.mp3');
    game.load.audio('jump', 'Mario/assets/smb_jump-super.mp3');
    game.load.audio('mariodie', 'Mario/assets/smb_mariodie.mp3');
    game.load.audio('mariowin', 'Mario/assets/smb_stage_clear.mp3');
    game.load.audio('question', 'Mario/assets/smb_pipe.wav');
    game.load.audio('kick', 'Mario/assets/smb_bump.wav');
}

var map, goombas;
var layer;
var cursors;
var jumpButton;
var runButton;
var result;

var mario = {
    sprite: undefined,
    state: 'live'
}

function create() {
  	Cf.loadScript();
    Phaser.Canvas.setImageRenderingCrisp(game.canvas)

    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#5C94FC';



    map = game.add.tilemap('objects');
    map.addTilesetImage('items', 'tiles');
    layer = map.createLayer('background');
    layer.resizeWorld();
    layer.wrap = true;
    map.setCollisionBetween(14, 16);
    map.setCollisionBetween(21, 22);
    map.setCollisionBetween(27, 28);
    map.setCollisionByIndex(10);
    map.setCollisionByIndex(13);
    map.setCollisionByIndex(40); //đất

    finish = game.add.sprite(3191, 126, 'finish');
    //    finish = game.add.sprite(100, 126, 'finish');
    game.physics.enable(finish);
    //finish.body.bounce.x = 0;
    //map.createFromTiles(17, null, 'finish', 'background', finish);

    goombas = game.add.group();
    goombas.enableBody = true;
    map.createFromTiles(41, null, 'goomba', 'goomba', goombas);
    goombas.callAll('animations.add', 'animations', 'walk', [0, 1], 2, true);
    goombas.callAll('animations.play', 'animations', 'walk');
    goombas.setAll('body.bounce.x', 1);
    goombas.setAll('body.gravity.y', 500);



    questions = game.add.group();
    questions.enableBody = true;
    map.createFromTiles(14, null, 'question', 'question', questions);
    questions.callAll('animations.add', 'animations', 'spin', [0, 0, 1, 2, 3, 4, 5], 4, true);
    //questions.callAll('animations.play', 'animations', 'spin');
    questions.setAll('body.collideWorldBounds', true);

    mario.sprite = game.add.sprite(50, 50, 'mario');
    mario.sprite.scale.setTo(0.47, 0.47);

    mario.sprite.anchor.x = 0.5;
    mario.sprite.anchor.y = 0.5;
    mario.sprite.animations.add('walk');

    game.physics.enable(mario.sprite);
    mario.sprite.body.gravity.y = 700;
    //game.physics.arcade.gravity.y = 700;
    mario.sprite.body.bounce.y = 0;
    mario.sprite.body.linearDamping = 1;
    mario.sprite.body.collideWorldBounds = true;
    //mario.sprite.body.acceleration.x = 120;

    mario.sprite.animations.add('left', [2, 3, 4, 5], 6, true);
    mario.sprite.animations.add('wait', [0], 10, true);
    mario.sprite.animations.add('jump', [6], 10, true);

    mario.sprite.body.fixedRotation = true;
    //mario.sprite.body.onBeginContact.add(blockHit, this);

    game.camera.follow(mario.sprite);
    game.camera.bounds.width = 3320;
    cursors = game.input.keyboard.createCursorKeys();


    music = game.add.audio('music');
    jump = game.add.audio('jump');
    mariodie = game.add.audio('mariodie');
    mariowin = game.add.audio('mariowin');
    kick = game.add.audio('kick');
    star = game.add.audio('question');
    music.play();

};


function update() {
  	if(Cf.popup == 1) Cf.waiting = 1;
		if(Cf.waiting == 1)
		{
			if(Cf.resq == 1)
			{
              	Cf.popup = 0;
				Cf.waiting = 0;
				Cf.resq = -1;
				console.log(true);
              	mario.state = 'live';
              	mario.sprite.body.gravity.y =700;
			}
			else if(Cf.resq == 0)
			{
              	Cf.popup = 0;
				Cf.waiting = 0;
				Cf.resq = -1;
				console.log(false);
              	mario.state = 'live';
              	mario.sprite.body.gravity.y =700;
			}
		}
    if (music.currentTime > 29000 && mario.state == 'live') {
            music.stop();
            music.play();
        };
    if (mario.sprite.y > 240 && mario.state == 'live') {
        mario.sprite.frame = 1;
        mario.state = 'die';
    };
    goombas.forEach(moveGoomba, this, true, 128);
    questions.forEach(playQuestion, this, true, 128);


    checkState();
  	game.physics.arcade.collide(mario.sprite, layer);
    game.physics.arcade.collide(goombas, layer);
  	if (mario.state =='live'){

    	game.physics.arcade.collide(mario.sprite, finish, win);
    	game.physics.arcade.overlap(mario.sprite, questions, showQuestion);
    	game.physics.arcade.overlap(mario.sprite, goombas, kill);
    }

    walk(mario.sprite, 'live');

};

function showQuestion(player, question) {
    if (player.body.touching.up) {
        question.animations.stop();
        question.frame = 6;
        question.body.enable = false;
        star.play();
      	Cf.next();
//      	mario.state = 'waiting';
//        player.body.gravity.y =0;
//      	player.body.velocity.x =0;
    }

}

function kill(player, goomba) {
    if (player.body.touching.down) {
        goomba.animations.stop();
        goomba.frame = 2;
        goomba.body.enable = false;
        player.body.velocity.y = -80;
        kick.play();
        game.time.events.add(Phaser.Timer.SECOND, function () {
            goomba.kill();
        });
    } else {
        player.frame = 1;
        player.body.enable = false;
        player.animations.stop();
        game.time.events.add(Phaser.Timer.SECOND, function () {
            mario.state = 'die';
        });
    }
}

function walk(player, state) {
    if (player.body.enable && mario.state == state) {
        player.body.velocity.x = 0;
        if (cursors.left.isDown) {
            player.body.velocity.x = -90;
            player.scale.setTo(-0.4, 0.4);
            player.animations.play('left');
            player.goesRight = false;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 90;
            player.scale.setTo(0.4, 0.4);
            player.animations.play('left');
            player.goesRight = true;
        } else {
            player.animations.stop();
            if (player.goesRight) player.frame = 0;
            else player.frame = 0;
        }

        if (cursors.up.isDown && player.body.onFloor()) {
            player.body.velocity.y = -310;
            player.animations.stop();
            jump.play();
        }

        if (player.body.velocity.y != 0) {
            if (player.y < 224) {
                player.frame = 6;
            } else {
                player.frame = 1;
            }
        }
    }
}

function checkState() {
    if (mario.state == 'die' ) {
        mario.state = 'finish';
        music.stop();
        mariodie.play();
        printMessage("GAME OVER!", 15);
        game.time.events.add(Phaser.Timer.SECOND*5, function () {
            game.paused = true;
        });


    }
}

function printMessage(msg, size) {
    var style = {
        font: "bold " + (size) + "pt Arial",
        fill: "#ffffff",
        align: "center",
        stroke: "#258acc",
        strokeThickness: 8
    };

    s = game.add.text(mario.sprite.x, 128, msg, style);
    s.anchor.setTo(0.5, 0.5);
    //console.log(msg);
}

function moveGoomba(child, arg) {
    if (mario.state=='waiting'){
        child.body.velocity.x = 0;
    }
  else {
    if (child.x - mario.sprite.x < arg && child.body.velocity.x == 0) {
        child.body.velocity.x = -20;
    }
  }
}

function playQuestion(child, arg) {
    if (child.x - mario.sprite.x < arg && child.body.enable) {
        child.animations.play('spin');
    }
}

function win() {
    music.stop();
    mariowin.play();
    printMessage("  WIN", 15);
    finish.kill();
    mario.state = 'win';
    mario.sprite.body.velocity.x = 0;

    game.time.events.add(Phaser.Timer.SECOND * 1, function () {
        mario.sprite.body.velocity.x = 25;
    });

    game.time.events.add(Phaser.Timer.SECOND * 5.3, function () {
        mario.sprite.kill();
        game.paused = true;
    });

}

function render() {
//    game.debug.bodyInfo(mario.sprite, -50, 32);
}
