//ballon object
class Globo {
    constructor(gravity) {
        this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this.posX = Math.floor(Math.random() * 761) + 20;
        this.posY = 445;
        this.width1 = this.posX - 18;
        this.height1 = this.posY - 28;
        this.width2 = 36;
        this.height2 = 56;
        this.gravity = gravity;
        this.gravitySpeed = 0;
        this.estado = 'active';
        this.contexto = document.querySelector('canvas').getContext("2d");
    }

    set changeGravity(gravity) {
        this.gravity += gravity;
    }

    get verEstado() {
        return this.estado;
    }

    get verPosy() {
        return this.posY;
    }

    draw() {
        this.contexto.beginPath();
        this.contexto.fillStyle = this.color;
        this.contexto.ellipse(this.posX, this.posY, 18, 28, 0, 0, 2 * Math.PI, true);        
        this.contexto.fill();
        this.contexto.closePath();
        
        this.contexto.beginPath();
        this.contexto.lineWidth = 2;
        this.contexto.moveTo(this.posX, this.posY + 28);
        this.contexto.lineTo(this.posX, this.posY + 60);        
        this.contexto.stroke();
        this.contexto.closePath();        
    }

    move() {
        if (this.estado == 'active') {
            this.contexto.clearRect(this.width1, this.height1, this.width2, this.height2 + 35);
            this.gravitySpeed += this.gravity;
            this.posY -= this.gravitySpeed;
            this.height1 = this.posY - 28;
            this.draw();
        }
    }

    burstBallon(posX, posY) {
        if ((posX >= this.width1 && posX <= (this.width1 + this.width2)) && (posY >= this.height1 && posY <= (this.height1 + this.height2))) {
            let posX = this.posX;
            let posY = this.posY;
            let dimension = 40;
            let lad = 5;
            let star = lad / 2;
            let rad = (2 * Math.PI) / star;
            this.estado = 'exploited';
            this.contexto.clearRect(this.width1, this.height1, this.width2, this.height2);
            this.contexto.fillStyle = this.color;
            this.contexto.lineWidth = 3;
            this.contexto.beginPath();
            for (var i = 0; i < lad; i++) {
                let x = posX + dimension * Math.cos(rad * i);
                let y = posY + dimension * Math.sin(rad * i);
                this.contexto.lineTo(x, y);
            }
            this.contexto.closePath();
            this.contexto.stroke();
            this.contexto.fill();
            setTimeout(function (globo) {
                globo.contexto.clearRect(globo.width1 - 25, globo.height1 - 20, globo.width2 + 56, globo.height2 + 65);
            }, 100, this);
            return true;
        }
    }

}