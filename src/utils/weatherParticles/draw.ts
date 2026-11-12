import { IViewport, IWeatherParticle } from '@/types/Weather';

const RAIN_COLOR = 'rgb(205, 222, 255)';
const SNOW_COLOR = 'rgb(255, 255, 255)';
const RAIN_WIDTH_PER_LENGTH = 0.05;
const MIN_RAIN_WIDTH_PX = 1;

const drawRainDrop = (
  ctx: CanvasRenderingContext2D,
  drop: IWeatherParticle,
): void => {
  const speed = Math.hypot(drop.vx, drop.vy);
  ctx.lineWidth = Math.max(MIN_RAIN_WIDTH_PX, drop.size * RAIN_WIDTH_PER_LENGTH);
  ctx.beginPath();
  ctx.moveTo(drop.x, drop.y);
  ctx.lineTo(
    drop.x - (drop.vx / speed) * drop.size,
    drop.y - (drop.vy / speed) * drop.size,
  );
  ctx.stroke();
};

const drawSnowflake = (
  ctx: CanvasRenderingContext2D,
  flake: IWeatherParticle,
): void => {
  ctx.beginPath();
  ctx.arc(
    flake.x + Math.sin(flake.phase) * flake.swayPx,
    flake.y,
    flake.size,
    0,
    Math.PI * 2,
  );
  ctx.fill();
};

export function drawWeather(
  ctx: CanvasRenderingContext2D,
  particles: readonly IWeatherParticle[],
  viewport: IViewport,
): void {
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  ctx.lineCap = 'round';
  ctx.strokeStyle = RAIN_COLOR;
  ctx.fillStyle = SNOW_COLOR;

  particles.forEach((particle) => {
    ctx.globalAlpha = particle.opacity * particle.fade;
    if (particle.kind === 'rain') drawRainDrop(ctx, particle);
    else drawSnowflake(ctx, particle);
  });

  ctx.globalAlpha = 1;
}
