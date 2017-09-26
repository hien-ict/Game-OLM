var Home = {
    init: function (message) {
        this.message = message;
    },

    create: function () {
        block_stop = 450;
        round = 1;
        score = 0;
        this.background = game.add.sprite(0, 0, 'background');
        //this.background.scale.setTo(0.2);
        var style2 = {
            font: '35px Arial',
            fill: '#fff',
            align: "center",
            stroke: "#ff0000",
            strokeThickness: 2
        };
        var style = {
            font: '30px Arial',
            fill: '#ff0000',
            align: "center",
            stroke: "#8df51e",
            strokeThickness: 2
        };
        this.introduce = game.add.text(320, 150, 'Luật chơi:\n Các bạn phải chọn 2 ô liên kề có tích\n giá trị của 2 ô đó bằng ô kết quả bên phải.\n Thời gian mỗi vòng chơi là 90 giây.\n Hãy nhanh lên nào!', style)
        this.introduce.anchor.setTo(0.5);

        this.text = game.add.text(320, 350, 'CLICK TO START', style2);
//        if (this.message) {
    //            this.text = game.add.text(320, 20, this.message, style);
    //        }
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
