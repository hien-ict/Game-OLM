var Home = {
    init: function (message) {
        this.message = message;
    },

    preload: function () {

    },

    create: function () {
        var style = {
            font: '30px Arial',
            fill: '#ff0000',
            align: "center",
            stroke: "#8df51e",
            strokeThickness: 2
        };
        var style2 = {
            font: '35px Arial',
            fill: '#fff',
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 2
        };
        this.background = game.add.sprite(0, 0, 'background');
        //this.background = game.add.sprite(0, 50, 'instruction');
        if (this.message) {
            this.text = game.add.text(320, 200, this.message, style);
            this.text.anchor.setTo(0.5);
        }else{
            this.text = game.add.text(320, 200, 'Luật chơi:\n Bạn phải xếp các phần tử có giá trị\n bằng nhau vào cùng một hình tròn.\n Ấn "CHECK" để kiểm tra đáp án.', style);
            this.text.anchor.setTo(0.5);
            this.img = game.add.sprite(160,230, 'check');
            this.img.scale.setTo(0.15);
            this.text = game.add.text(320, 400, 'Ví dụ:                         là 1 nhóm', style);
            this.text.anchor.setTo(0.5);
            this.img = game.add.sprite(200,300, 'VD');
            //this.img.scale.setTo(0.15);
        }
        this.text = game.add.text(320, 520, "NHẤN VÀO ĐÂY ĐỂ BẮT ĐẦU", style2);
        this.text.inputEnabled = true;
        this.text.events.onInputDown.add(function () {
            this.state.start('GameState');

        }, this);

        this.text.events.onInputOver.add(this.over, this);
        this.text.events.onInputOut.add(this.out, this);
        this.text.input.useHandCursor = true;
        this.text.anchor.setTo(0.5);
    },

    update: function () {

    },

    out() {
        this.text.fill = "#fff";
    },

    over() {
        this.text.fill = '#ff00ff';
    }
}
