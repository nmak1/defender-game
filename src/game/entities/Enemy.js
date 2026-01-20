export class Enemy {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 100;
        this.color = '#ff0066';
        this.health = 1;
    }

    update(deltaTime) {
        this.y += this.speed * deltaTime;

        // Проверка выхода за границы
        if (this.y > this.game.height) {
            this.health = 0; // Пометить для удаления
        }
    }

    render(ctx) {
        ctx.save();

        // Тело врага
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // Глаз
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.height / 3,
            this.width / 6,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.height / 3,
            this.width / 12,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    }

    takeDamage(amount = 1) {
        this.health -= amount;
        return this.health <= 0;
    }
}
