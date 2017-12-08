var numP=0;
var Preload = {
    init: function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
    },

    preload: function () {
        var audioJSON = {
            spritemap: {
                'part1': {
                    start: 1,
                    end: 20,
                    loop: false
                },
                'part2': {
                    start: 9,
                    end: 15,
                    loop: false
                }
            }
        };
        this.load.image('background', 'Duaxe/assets/background.png');
        this.load.image('background2', 'Duaxe/assets/background.jpg');
        this.load.image('quay', 'Duaxe/assets/quay.png');
        this.load.image('popup', 'Duaxe/assets/popup.png');
        this.load.image('close', 'Duaxe/assets/close.png');
        this.load.image('button', 'Duaxe/assets/button.png');
        this.load.image('block', 'Duaxe/assets/block.png');
        this.load.image('block2', 'Duaxe/assets/block2.png');
        this.load.spritesheet('player', 'Duaxe/assets/12congiap.png', 160, 175);
        this.load.spritesheet('full', 'Duaxe/assets/full.png', 256, 256, 2);
        this.load.text('map', 'Duaxe/assets/map.json');

        this.load.audio('click', '../../Multiplication/assets/sndClick.mp3');
        this.load.audio('stop', '../../Multiplication/assets/sndComet.mp3');
        this.load.audio('ting', '../../battership/assets/ting.mp3');
        this.load.audiosprite('sndquay', 'Duaxe/assets/quay.mp3', null, audioJSON);
        game.stage.disableVisibilityChange = true;
    },

    create: function () {
//        Preload.levelData = JSON.parse(this.game.cache.getText('map'));
        //game.state.start('Home', true, false, "WELCOME");
        connection = io.connect('http://doc.olm.vn:1235/game', {
            autoConnect: false
        })
        connection.on('connect', () => {
//            console.log("connected");
            connection.on('event.ojoin', (data) => {
                //GameState.createPlayer(data.player);
                numPlayer++;
//                console.log(numPlayer);
            });
            connection.on('event.data', (data) => {
                console.log(data);
                if (data.num){
                    numP=data.num;
                    console.log("Số người chơi là: "+numP);
                }
                if (data.msg=="Start"){
                    game.state.start("GameState");
                }

                if(data.val){
                    state="play";
                    GameState.play(player[data.username], data.val);

                }
            });
            //            connection.emit('room.join', {name : 'room1', msg : 'tab1 da join'});
            //            connection.emit('room.join', { room : 'room1', msg : 'tab1 da join'});
            //            connection.emit('event.data', { room: 'room1' ,name : 'user1', msg : '1'});
        })
        connection.emit('room.join', { room : 'room1'});
        game.state.start('Home');
        connection.open();
    }
}
