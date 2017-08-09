dtimkhobau.GameState = {

    init: function () {
        this.NUM_ROWS = 4;
        this.NUM_COLS = 4;
        this.BLOCK_SIZE = 80;
        this.moving_speed = 300;
        this.questionSet = [{
            x: 2,
            y: 3
        }, {
            x: 3,
            y: 2
        }, {
            x: 1,
            y: 1
        }];
        this.userAns = true;
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.cursors = this.game.input.keyboard.createCursorKeys();
    },
    preload: function () {
        this.load.image('path', '/games/DiTimKhoBau/assets/path.png');
        this.load.image('treasure', '/games/DiTimKhoBau/assets/treasure.png');
        this.load.image('question', '/games/DiTimKhoBau/assets/question.png');
        this.load.image('question_disable', '/games/DiTimKhoBau/assets/question_disable.png');
        this.load.spritesheet('player', '/games/DiTimKhoBau/assets/player_spritesheet.png', 28, 30, 5, 1, 1);
    },
    create: function () {
        this.drawBoard();
        this.createOnscreenControls();
    },
    update: function () {
        if (this.player.customParams.colide) this.game.physics.arcade.overlap(this.player, this.questions, this.questionDisplay);
        this.game.physics.arcade.overlap(this.player, this.treasure, this.goal);

        if (this.cursors.left.isDown && this.player.customParams.x > 0) {
            this.player.scale.setTo(2, 2);
            this.player.play('walking');
            this.player.customParams.old_x = this.player.customParams.x;
            this.player.customParams.old_y = this.player.customParams.y
            this.movePlayer(this.player.customParams.x - 1, this.player.customParams.y);

        } else if (this.cursors.right.isDown && this.player.customParams.x < this.NUM_COLS - 1) {
            this.player.scale.setTo(-2, 2);
            this.player.play('walking');
            this.player.customParams.old_x = this.player.customParams.x;
            this.player.customParams.old_y = this.player.customParams.y
            this.movePlayer(this.player.customParams.x + 1, this.player.customParams.y);
        } else if (this.cursors.down.isDown && this.player.customParams.y < this.NUM_COLS - 1) {
            this.player.frame = 3;
            this.player.customParams.old_x = this.player.customParams.x;
            this.player.customParams.old_y = this.player.customParams.y
            this.movePlayer(this.player.customParams.x, this.player.customParams.y + 1);
        } else if (this.cursors.up.isDown && this.player.customParams.y > 0) {
            this.player.frame = 3;
            this.player.customParams.old_x = this.player.customParams.x;
            this.player.customParams.old_y = this.player.customParams.y
            this.movePlayer(this.player.customParams.x, this.player.customParams.y - 1);
        }

    },
    questionDisplay: function (player, question) {
        var back_x = player.customParams.old_x,
            back_y = player.customParams.old_y;
        player.customParams.colide = false;
        //dtimkhobau.GameState.movePlayer(back_x, back_y);
        $('#prob').html("<h2>1 + 1 = <input type='text' style='width:50px' /></h2>");
        $('#prob').dialog();
        $('#game').css('z-index', 10);
        $('#prob').css('z-index', 3);
        $('#prob').dialog({
            modal: true,
            maxHeight: 500,
        }).prev(".ui-dialog-titlebar").css("background", "blue");
        $('#prob').css("background-color", "gray")
        //makeQuestion(false,div);
    },
    drawBoard: function () {
        var i, j, block, square, x, y, data;

        var squareBitmap = this.add.bitmapData(this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);
        squareBitmap.ctx.fillStyle = '#fff';
        squareBitmap.ctx.fillRect(0, 0, this.BLOCK_SIZE + 4, this.BLOCK_SIZE + 4);

        for (i = 0; i < this.NUM_ROWS; i++) {
            for (j = 0; j < this.NUM_COLS; j++) {
                x = 36 + j * (this.BLOCK_SIZE + 6);
                y = 36 + i * (this.BLOCK_SIZE + 6);
                square = this.add.sprite(x, y, squareBitmap);
            }
        }
        this.treasure = this.add.sprite(36 + (this.NUM_ROWS - 1) * (this.BLOCK_SIZE + 6), 36 + (this.NUM_COLS - 1) * (this.BLOCK_SIZE + 6), 'treasure');
        this.game.physics.arcade.enable(this.treasure);
        //Chướng ngại vật
        this.questions = this.add.group();
        this.questions.enableBody = true;
        for (var n = 0; n < this.questionSet.length; n++) {
            x = 40 + this.questionSet[n].y * (this.BLOCK_SIZE + 6);
            y = 40 + this.questionSet[n].x * (this.BLOCK_SIZE + 6);
            var qu = this.add.sprite(x, y, 'question');
            this.questions.add(qu);
        };
        this.game.physics.arcade.enable(this.questions);
        // pos player
        this.player = this.add.sprite(36 + (this.BLOCK_SIZE / 2 + 6), 36 + (this.BLOCK_SIZE / 2 + 6), 'player', 3);
        this.player.scale.setTo(2, 2);
        this.player.anchor.setTo(0.5);
        this.player.customParams = {
            x: 0,
            y: 0,
            old_x: 0,
            old_y: 0,
            colide: true
        };
        this.player.animations.add('walking', [0, 1, 2, 1], 10, true);
        this.game.physics.arcade.enable(this.player);
    },
    goal: function (player, treasure) {
        alert('WIN !');
        game.state.start('GameState');
    },
    checkQuestion: function (x, y) {
        var checkq = true;
        for (var i = 0; i < this.questionSet.length; i++) {
            if (x == this.questionSet[i].x && y == this.questionSet[i].y) chekq = false;
        };
        return checkq;
    },
    movePlayer: function (x, y) {
        var copyPlayer = this.game.add.tween(this.player);
        var x_new = 80 + x * (this.BLOCK_SIZE + 6);
        var y_new = 80 + y * (this.BLOCK_SIZE + 6);
        copyPlayer.to({
            x: x_new,
            y: y_new
        }, this.moving_speed);
        //    this.userAns = this.checkQuestion(x,y);
        copyPlayer.onComplete.add(function () {
            if (this.userAns) {
                this.player.x = x_new;
                this.player.y = y_new;
                this.player.customParams.x = x;
                this.player.customParams.y = y;
                this.player.animations.stop(null, true);
                this.player.frame = 3;
            };
        }, this);
        copyPlayer.start();
    },
    createOnscreenControls: function () {
        this.leftArrow = this.add.button(20, 535, 'arrowButton');
        this.rightArrow = this.add.button(110, 535, 'arrowButton');
        this.actionButton = this.add.button(280, 535, 'actionButton');

        this.leftArrow.alpha = 0.5;
        this.rightArrow.alpha = 0.5;
        this.actionButton.alpha = 0.5;

        this.leftArrow.fixedToCamera = true;
        this.rightArrow.fixedToCamera = true;
        this.actionButton.fixedToCamera = true;

        this.actionButton.events.onInputDown.add(function () {
            this.player.customParams.mustJump = true;
        }, this);

        this.actionButton.events.onInputUp.add(function () {
            this.player.customParams.mustJump = false;
        }, this);

        //left
        this.leftArrow.events.onInputDown.add(function () {
            this.player.customParams.isMovingLeft = true;
        }, this);

        this.leftArrow.events.onInputUp.add(function () {
            this.player.customParams.isMovingLeft = false;
        }, this);

        this.leftArrow.events.onInputOver.add(function () {
            this.player.customParams.isMovingLeft = true;
        }, this);

        this.leftArrow.events.onInputOut.add(function () {
            this.player.customParams.isMovingLeft = false;
        }, this);

        //right
        this.rightArrow.events.onInputDown.add(function () {
            this.player.customParams.isMovingRight = true;
        }, this);

        this.rightArrow.events.onInputUp.add(function () {
            this.player.customParams.isMovingRight = false;
        }, this);

        this.rightArrow.events.onInputOver.add(function () {
            this.player.customParams.isMovingRight = true;
        }, this);

        this.rightArrow.events.onInputOut.add(function () {
            this.player.customParams.isMovingRight = false;
        }, this);
    },

};
