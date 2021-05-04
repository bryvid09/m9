//Control game
class gameArea {

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = '800';
        this.canvas.height = '570';
        this.canvas.style.border = '1px black solid';
        this.panel = document.createElement('canvas');
        this.contextoPanel = this.panel.getContext('2d');
        this.panel.width = '800';
        this.panel.height = '50';
        this.panel.style.border = '1px black solid';
        document.body.appendChild(this.canvas);
        document.body.appendChild(this.panel);
    }

    start() {
        this.contextoPanel.clearRect(0,0,800,50);        
        let contexto = this.canvas.getContext('2d');
        contexto.clearRect(0,0,800,570);
        let backgr = new Image();
        backgr.src = './cesped.png';
        backgr.onload = function () {
            contexto.drawImage(backgr, 0, 500);
            contexto.globalCompositeOperation = 'destination-over'
        }
        this.ballons = [];
        this.points = 0;
        this.minuts = 3;
        this.speed = 0.8;
        this.seconds = 60;
        this.status = 'start';
        this.speedMake = 700;
        this.make = setInterval(this.makeBallon, this.speedMake, this);
        this.move = setInterval(this.moveBallons, 100, this);
        this.contextoPanel.beginPath();
        this.contextoPanel.font = "bold 30px verdana";
        this.contextoPanel.fillText('Score: ' + this.points, 5, 30);
        this.contextoPanel.font = "bold 15px arial";
        this.contextoPanel.fillText('Key <A>: speed     Key <space>: pause/start', 225, 30);
        this.contextoPanel.font = "bold 25px verdana";
        this.contextoPanel.fillText('Time = ' + this.minuts + ':' + this.seconds, 620, 30);
        this.contextoPanel.closePath();
        this.countTime = setInterval(this.printTime, 1000, this);
    }

    get viewStatus() {
        return this.status;
    }
    printTime(area) {
        area.seconds--;
        if (area.seconds == 0 && area.minuts == 0) {
            area.stop();
            area.contextoPanel.clearRect(0, 0, 800, 100);
            area.contextoPanel.font = "bold 15px verdana";
            area.contextoPanel.fillText('END GAME YOUR SCORE IS: ' + area.points, 5, 20);
            area.contextoPanel.fillText('PRESS SPACE TO RESTART', 5, 40);
        } else if (area.seconds < 0) {
            area.minuts--;
            area.seconds = 60;
        }
        area.contextoPanel.clearRect(620, 0, 200, 50);
        area.contextoPanel.beginPath();
        area.contextoPanel.font = "bold 25px verdana";
        if (area.seconds < 10) {
            area.contextoPanel.fillText('Time = ' + area.minuts + ':0' + area.seconds, 620, 30);
        } else {
            area.contextoPanel.fillText('Time = ' + area.minuts + ':' + area.seconds, 620, 30);
        }
        area.contextoPanel.closePath();
    }

    stop() {
        if (this.minuts == 0 && this.seconds == 0) {
            this.status = 'end';
        } else {
            this.status = 'stop';
        }
        clearInterval(this.make);
        clearInterval(this.move);
        clearInterval(this.countTime);
    }

    restart() {
        this.status = 'start';
        this.make = setInterval(this.makeBallon, this.speedMake, this);
        this.move = setInterval(this.moveBallons, 100, this);
        this.countTime = setInterval(this.printTime, 1000, this);
    }

    makeBallon(area) {
        let ballon = new Globo(area.speed);
        ballon.draw();
        area.ballons.push(ballon);
    }

    moveBallons(area) {
        for (let i = 0; i < area.ballons.length; i++) {
            area.ballons[i].move();
        }
    }

    removeBallons(event) {
        for (let i = 0; i < this.ballons.length; i++) {
            if (this.ballons[i].verEstado == 'active') {
                if (this.ballons[i].burstBallon(event.pageX, event.pageY)) {
                    this.points++;
                    this.contextoPanel.clearRect(0, 0, 200, 50);
                    this.contextoPanel.beginPath();
                    this.contextoPanel.font = "bold 30px verdana";
                    this.contextoPanel.fillText('Score: ' + this.points, 5, 30);
                    this.contextoPanel.closePath();
                }
            }
        }
    }

    deleteBallonArray(ballon) {
        let posBallon = this.ballons.indexOf(ballon);
        if (posBallon != -1) {
            this.ballons.splice(posBallon, posBallon + 1);
        }
    }

    increaseDifficulty() {
        if (this.speed < 2.5) {
            this.speed += 0.2;
            for (let i = 0; i < this.ballons.length; i++) {
                this.ballons[i].changeGravity = this.speed;
            }
        }
    }
}