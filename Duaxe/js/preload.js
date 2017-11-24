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
        this.load.spritesheet('player', 'Duaxe/assets/bomber.png', 60, 80);
        this.load.spritesheet('full', 'Duaxe/assets/full.png', 256, 256, 2);
        this.load.text('map', 'Duaxe/assets/map.json');

        this.load.audio('click', '../../Multiplication/assets/sndClick.mp3');
        this.load.audio('stop', '../../Multiplication/assets/sndComet.mp3');
        this.load.audio('ting', '../../battership/assets/ting.mp3');
        this.load.audiosprite('sndquay', 'Duaxe/assets/quay.mp3', null, audioJSON);
    },

    create: function () {
        //game.state.start('Home', true, false, "WELCOME");
        connection = io.connect('http://doc.olm.vn:1235/game', {
            autoConnect: false
        })
        connection.on('connect', () => {
            connection.on('event.ojoin', (data) => {
                console.log(data)
            });
            connection.on('event.data', (data) => {
                console.log(data)
            });
            //            connection.emit('room.join', {name : 'room1', msg : 'tab1 da join'});
        })
        game.state.start('Home');
        connection.open();
    }
}
