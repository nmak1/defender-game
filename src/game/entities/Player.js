export class Player {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 60;
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height - this.height - 20;
        this.speed = 300;
        this.color = '#00ffcc';
    }

    update(deltaTime) {
        // Движение
        if (this.game.inputHandler.isKeyPressed('arrowleft')) {
            this.x -= this.speed * deltaTime;
        }
        if (this.game.inputHandler.isKeyPressed('arrowright')) {
            this.x += this.speed * deltaTime;
        }
        if (this.game.inputHandler.isKeyPressed('arrowup')) {
            this.y -= this.speed * deltaTime;
        }
        if (this.game.inputHandler.isKeyPressed('arrowdown')) {
            this.y += this.speed * deltaTime;
        }

        // Границы экрана
        this.x = Math.max(0, Math.min(this.game.width - this.width, this.x));
        this.y = Math.max(0, Math.min(this.game.height - this.height, this.y));
    }

    render(ctx) {
        ctx.save();

        // Корпус корабля
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // Кабина
        ctx.fillStyle = '#00ccff';
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.height / 3,
            this.width / 4,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Двигатели
        ctx.fillStyle = '#ff0066';
        ctx.fillRect(this.x + this.width / 4, this.y + this.height, this.width / 4, 10);
        ctx.fillRect(this.x + this.width * 2/4, this.y + this.height, this.width / 4, 10);

        // Свечение двигателей
        const time = Date.now() * 0.01;
        const flameHeight = 15 + Math.sin(time) * 5;

        ctx.fillStyle = '#ff9900';
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 4, this.y + this.height + 10);
        ctx.lineTo(this.x + this.width / 4 + this.width / 8, this.y + this.height + 10 + flameHeight);
        ctx.lineTo(this.x + this.width / 4 - this.width / 8, this.y + this.height + 10 + flameHeight);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 2/4, this.y + this.height + 10);
        ctx.lineTo(this.x + this.width * 2/4 + this.width / 8, this.y + this.height + 10 + flameHeight);
        ctx.lineTo(this.x + this.width * 2/4 - this.width / 8, this.y + this.height + 10 + flameHeight);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    shoot() {
        console.log('🔫 Player shooting');
        // Здесь будет создание пуль
    }
}
