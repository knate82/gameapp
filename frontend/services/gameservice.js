angular.module("GameApp")

.service("GameService",["ScoreService", "UserService", function (ScoreService, UserService) {
    var that = this;
    that.myGamePiece;
    that.myObstacle = [];
    that.myScore;
    that.myBackground;
    that.explosion;
    that.backgroundMusic;

    this.startGame = function () {
        that.myGameArea.start();
        that.myGamePiece = new component(50, 20, "images/spaceship.png", 10, 120, "image");
        that.myScore = new component("30px", "Consolas", "yellow", 280, 40, "text");
        that.myBackground = new component(1000, 570, "images/Space.jpeg", 0, 0, "background");
        that.explosion = new sound("services/explosion.mp3");
        that.backgroundMusic = new sound("services/SpaceTrip.mp3");
        that.backgroundMusic.play();
    }
    
    function sound(src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }
    }

    that.myGameArea = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 900;
            this.canvas.height = 400;
            this.context = this.canvas.getContext("2d");
            var game = document.getElementById("game")
                game.insertBefore(this.canvas, game.childNodes[0]);
            this.frameNo = 0;
            this.interval = setInterval(updateGameArea, 10);
            window.addEventListener('keydown', function (e) {
                that.myGameArea.key = e.keyCode;
            })
            window.addEventListener('keyup', function (e) {
                that.myGameArea.key = false;
            })
        },
        clear: function () {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        stop: function () {
            clearInterval(this.interval);
        }
    }
    
    that.logScore = function(){
        this.newScore = {
            score: that.myGameArea.frameNo,
            userName: UserService.user._id
        }
        console.log(this.newScore);
        ScoreService.addScore(this.newScore).then(function(response){
            console.log(response);
        })
    }

    function everyinterval(n) {
        if ((that.myGameArea.frameNo / n) % 1 == 0) {
            return true;
        }
        return false;
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        if(type == "image" || type == "background") {
            this.image = new Image();
            this.image.src = color;
        }
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.update = function () {
            ctx = that.myGameArea.context;
            if (this.type == "text") {
                ctx.font = this.width + " " + this.height;
                ctx.fillStyle = color;
                ctx.fillText(this.text, this.x, this.y);
            } else if(type == "image" || type == "background"){
                ctx.drawImage(
                    this.image,
                    this.x,
                    this.y,
                    this.width,
                    this.height);
                if(type == "background"){
                    ctx.drawImage(
                        this.image,
                        this.x + this.width,
                        this.y,
                        this.width,
                        this.height);
                }
            } else {
                ctx.fillStyle = color;
                ctx.fillRect(
                    this.x,
                    this.y,
                    this.width,
                    this.height);
            }
        }
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
            if(this.type == "background"){
                if(this.x == -(this.width)){
                    this.x = 0;
                }
            }
        }
        this.crashWith = function (otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;
            if ((mybottom < othertop) ||
                (mytop > otherbottom) ||
                (myright < otherleft) ||
                (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }
    }

    function updateGameArea() {
        var x, y;
        for (i = 0; i < that.myObstacle.length; i += 1) {
            if (that.myGamePiece.crashWith(that.myObstacle[i])) {
                that.backgroundMusic.stop();
                that.explosion.play();
                that.myGameArea.stop();
                that.logScore();
                return;
            }
        }
        that.myGameArea.clear();
        that.myBackground.speedX = -1;
        that.myBackground.newPos();
        that.myBackground.update();
        that.myGameArea.frameNo += 1;
        if (that.myGameArea.frameNo == 1 || everyinterval(150)) {
            x = that.myGameArea.canvas.width;
            minHeight = 20;
            maxHeight = 200;
            height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
            minGap = 50;
            maxGap = 200;
            gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
            that.myObstacle.push(new component(10, height, "green", x, 0));
            that.myObstacle.push(new component(10, x - height - gap, "green", x, height + gap));
        }
        for (i = 0; i < that.myObstacle.length; i += 1) {
            that.myObstacle[i].x += -1;
            that.myObstacle[i].update();
        }
        that.myGamePiece.newPos();
        that.myGamePiece.update();
        that.myObstacle.x += -1;
        that.myGamePiece.newPos();
        that.myGamePiece.speedX = 0;
        that.myGamePiece.speedY = 0;
        if (that.myGameArea.key && that.myGameArea.key == 37) {
            that.myGamePiece.speedX = -1;
        }
        if (that.myGameArea.key && that.myGameArea.key == 39) {
            that.myGamePiece.speedX = 1;
        }
        if (that.myGameArea.key && that.myGameArea.key == 38) {
            that.myGamePiece.speedY = -1;
        }
        if (that.myGameArea.key && that.myGameArea.key == 40) {
            that.myGamePiece.speedY = 1;
        }
        that.myGamePiece.x += 1;
        that.myGamePiece.update();
        that.myScore.text = "SCORE: " + that.myGameArea.frameNo;
        that.myScore.update();
    }

    function stopMove() {
        that.myGamePiece.speedX = 0;
        that.myGamePiece.speedY = 0;
    }

    this.moveup = function () {
        that.myGamePiece.speedY -= 1;
    }

    this.movedown = function () {
        that.myGamePiece.speedY += 1;
    }

    this.moveleft = function () {
        that.myGamePiece.speedX -= 1;
    }

    this.moveright = function () {
        that.myGamePiece.speedX += 1;
    }

}])