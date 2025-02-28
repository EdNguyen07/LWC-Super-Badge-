import { LightningElement } from 'lwc';

export default class LwcFullScreenButton extends LightningElement {
    renderedCallback() {
        this.initParticles();
        this.initRocketLaunch();
    }

    initParticles() {
        const canvas = this.template.querySelector('.particle-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = Array.from({ length: 100 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            size: Math.random() * 5 + 3 // Random size between 3 and 8
        }));

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'white';
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x <= 0 || p.x >= canvas.width) p.dx *= -1;
                if (p.y <= 0 || p.y >= canvas.height) p.dy *= -1;
            });
            
            // Draw connections
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    let dx = particles[i].x - particles[j].x;
                    let dy = particles[i].y - particles[j].y;
                    let distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }
    //draw rocket
    initRocketLaunch() {
        const canvas = this.template.querySelector('.particle-canvas');
        const ctx = canvas.getContext('2d');
        const rocket = {
            x: canvas.width / 2,
            y: canvas.height + 50,
            width: 20,
            height: 60,
            speed: 2
        };
        function drawRocket() {
            ctx.fillStyle = 'white';
            ctx.fillRect(rocket.x - rocket.width / 2, rocket.y, rocket.width, rocket.height);
            ctx.beginPath();
            ctx.moveTo(rocket.x - rocket.width / 2, rocket.y);
            ctx.lineTo(rocket.x, rocket.y - 20);
            ctx.lineTo(rocket.x + rocket.width / 2, rocket.y);
            ctx.fill();
            rocket.y -= rocket.speed;
            if (rocket.y + rocket.height > 0) {
                requestAnimationFrame(drawRocket);
            }
        }
        drawRocket();
    }
}