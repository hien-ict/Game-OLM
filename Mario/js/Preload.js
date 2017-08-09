var Preload = {
    preload: function(){
        this.load.tilemap('map1-1', 'Mario/assets/map1-1.json', null,Phaser.Tilemap.TILED_JSON);

        this.load.image('tiles', 'Mario/assets/items2.png');
        this.load.image('cot', 'Mario/assets/cot.png');
        this.load.image('co', 'Mario/assets/co.png');


        this.load.spritesheet('mario', 'Mario/assets/marioSmall.png', 34, 34, 7);
        this.load.spritesheet('goomba', 'Mario/assets/goomba.png', 16, 16, 3);
        this.load.spritesheet('question', 'Mario/assets/question.png', 16, 17, 7);

        this.load.audio('music', 'Mario/assets/music.mp3');
        this.load.audio('jump', 'Mario/assets/smb_jump-super.mp3');
        this.load.audio('mariodie', 'Mario/assets/smb_mariodie.mp3');
        this.load.audio('mariowin', 'Mario/assets/smb_stage_clear.mp3');
        this.load.audio('question', 'Mario/assets/smb_pipe.wav');
        this.load.audio('kick', 'Mario/assets/smb_bump.wav');
    },
    create: function(){
        Cf.loadScript();

        Phaser.Canvas.setImageRenderingCrisp(game.canvas);

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('State1_1');
    }
}
