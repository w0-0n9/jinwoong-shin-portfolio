"use client";

import { useEffect, useRef } from "react";

class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow drift
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update(mouseX: number, mouseY: number) {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = this.canvas.width;
        if (this.x > this.canvas.width) this.x = 0;
        if (this.y < 0) this.y = this.canvas.height;
        if (this.y > this.canvas.height) this.y = 0;

        // Mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (200 - distance) / 200;
            const directionX = forceDirectionX * force * 0.5;
            const directionY = forceDirectionY * force * 0.5;
            this.x -= directionX;
            this.y -= directionY;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(59, 130, 246, 0.5)";
        ctx.fill();
    }
}

export function BackgroundGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouseX = -1000;
        let mouseY = -1000;

        const initParticles = () => {
            particles = [];
            const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle(canvas));
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const connectParticles = () => {
            const maxDistance = 150;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / maxDistance})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            for (let i = 0; i < particles.length; i++) {
                const dx = mouseX - particles[i].x;
                const dy = mouseY - particles[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(147, 51, 234, ${1 - distance / 200})`;
                    ctx.lineWidth = 1.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouseX, mouseY);
                    ctx.stroke();
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update(mouseX, mouseY);
                particle.draw(ctx);
            });

            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 bg-[#0a0a0a]"
        />
    );
}
