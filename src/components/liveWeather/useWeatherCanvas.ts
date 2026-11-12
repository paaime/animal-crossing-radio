import { RefObject, useEffect, useRef } from 'react';
import { IViewport, IWeatherParticle, TrackWeather } from '@/types/Weather';
import { stepWeather } from '@/utils/weatherParticles/simulate';
import { drawWeather } from '@/utils/weatherParticles/draw';

const FRAME_MS = 1000 / 30;
const FRAME_TOLERANCE_MS = 1;
const MAX_STEP_S = 0.1;

export function useWeatherCanvas(
  weather: TrackWeather,
): RefObject<HTMLCanvasElement> {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const weatherRef = useRef(weather);

  useEffect(() => {
    weatherRef.current = weather;
  }, [weather]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    let viewport: IViewport = { width: 0, height: 0 };
    let particles: readonly IWeatherParticle[] = [];
    let lastFrameMs: number | null = null;
    let frameId = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      viewport = { width: canvas.clientWidth, height: canvas.clientHeight };
      canvas.width = Math.round(viewport.width * ratio);
      canvas.height = Math.round(viewport.height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const tick = (nowMs: number) => {
      frameId = requestAnimationFrame(tick);
      const elapsedMs = lastFrameMs === null ? FRAME_MS : nowMs - lastFrameMs;
      if (elapsedMs < FRAME_MS - FRAME_TOLERANCE_MS) return;
      lastFrameMs = nowMs;

      const current = weatherRef.current;
      if (particles.length === 0 && current === 'clear') return;

      particles = stepWeather(
        particles,
        current,
        Math.min(elapsedMs / 1000, MAX_STEP_S),
        viewport,
      );
      drawWeather(ctx, particles, viewport);
    };

    resize();
    window.addEventListener('resize', resize);
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return canvasRef;
}
