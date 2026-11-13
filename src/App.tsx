import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { CozyRoomDecor } from './components/CozyRoomDecor';
import { ItemArt } from './components/ItemArt';
import { WallPaintText } from './components/WallPaintText';
import { THROW_ITEMS, type ItemId, type ThrowItem } from './data/items';
import { soundFx } from './utils/soundFx';

const USER_PORTRAIT_URL = '/assets/aistudio/IMG_20261113_101653_206_0d431cb8.jpg';

interface PortraitSplat {
  uid: number;
  itemId: ItemId;
  relX: number;
  relY: number;
  rotation: number;
  scale: number;
  sliding?: boolean;
}

interface FlyingProjectile {
  uid: number;
  item: ThrowItem;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  age: number;
  maxFlightTime: number;
  aimedAtPortrait: boolean;
}

interface FallingObject {
  uid: number;
  itemId: ItemId;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  floorY: number;
  bounced: boolean;
  settled: boolean;
  scale: number;
}

interface ImpactEffect {
  uid: number;
  x: number;
  y: number;
  text: string;
  color: string;
}

interface BurstParticle {
  uid: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
}

interface DragState {
  item: ThrowItem;
  startX: number;
  startY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  movedDist: number;
  overPortrait: boolean;
}

interface PendingTouch {
  item: ThrowItem;
  pointerId: number;
  startX: number;
  startY: number;
  timerId: number;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [trayOpen, setTrayOpen] = useState(false);
  const [muted, setMuted] = useState(false);
  const [totalSmashes, setTotalSmashes] = useState(0);

  // Portrait frame collision / tilt physics
  const [frameTilt, setFrameTilt] = useState(0);
  const [shakeKick, setShakeKick] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);

  // Active splats, flying projectiles, floor pile, impact rings & particles
  const [splats, setSplats] = useState<PortraitSplat[]>([]);
  const [projectiles, setProjectiles] = useState<FlyingProjectile[]>([]);
  const [fallingItems, setFallingItems] = useState<FallingObject[]>([]);
  const [impacts, setImpacts] = useState<ImpactEffect[]>([]);
  const [particles, setParticles] = useState<BurstParticle[]>([]);

  // Dragging state
  const [dragState, setDragState] = useState<DragState | null>(null);
  const dragRef = useRef<DragState | null>(null);
  const pendingTouchRef = useRef<PendingTouch | null>(null);

  const portraitRef = useRef<HTMLDivElement | null>(null);
  const trayScrollRef = useRef<HTMLDivElement | null>(null);
  const uidCounterRef = useRef(1);
  const lastPointerRef = useRef<{ x: number; y: number; t: number }>({ x: 0, y: 0, t: 0 });

  // Latest callbacks refs for RAF loop
  const handlePortraitHitRef = useRef<(item: ThrowItem, cx: number, cy: number) => void>(() => {});
  const spawnFallingItemRef = useRef<(item: ThrowItem, sx: number, sy: number, hit: boolean) => void>(() => {});

  const nextUid = () => {
    uidCounterRef.current += 1;
    return uidCounterRef.current;
  };

  const isOverPortrait = useCallback((clientX: number, clientY: number, pad = 28) => {
    const el = portraitRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      clientX >= rect.left - pad &&
      clientX <= rect.right + pad &&
      clientY >= rect.top - pad &&
      clientY <= rect.bottom + pad
    );
  }, []);

  const spawnParticles = useCallback((x: number, y: number, colors: string[]) => {
    const batch: BurstParticle[] = Array.from({ length: 12 }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.4;
      const speed = 135 + Math.random() * 215;
      return {
        uid: nextUid(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 95,
        size: 5 + Math.random() * 7,
        color: colors[i % colors.length],
        life: 0.75 + Math.random() * 0.35,
      };
    });
    setParticles((prev) => [...prev.slice(-48), ...batch]);
  }, []);

  const spawnFallingItem = useCallback((item: ThrowItem, startX: number, startY: number, fromPortraitHit: boolean) => {
    const h = window.innerHeight;
    const floorMin = h * 0.80;
    const floorMax = h * 0.89;
    const floorY = floorMin + Math.random() * (floorMax - floorMin);
    const dir = fromPortraitHit ? (Math.random() > 0.5 ? 1 : -1) * (80 + Math.random() * 140) : (Math.random() - 0.5) * 80;

    const obj: FallingObject = {
      uid: nextUid(),
      itemId: item.id,
      x: startX,
      y: startY,
      vx: dir,
      vy: fromPortraitHit ? -140 - Math.random() * 110 : 40,
      rotation: (Math.random() - 0.5) * 40,
      vRot: (Math.random() - 0.5) * 340,
      floorY,
      bounced: false,
      settled: false,
      scale: 0.88 + Math.random() * 0.2,
    };
    setFallingItems((prev) => [...prev.slice(-34), obj]);
  }, []);

  const handlePortraitHit = useCallback(
    (item: ThrowItem, clientX: number, clientY: number) => {
      const el = portraitRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();

      const rawRelX = ((clientX - rect.left) / rect.width) * 100;
      const rawRelY = ((clientY - rect.top) / rect.height) * 100;
      const relX = Math.max(8, Math.min(92, rawRelX));
      const relY = Math.max(8, Math.min(92, rawRelY));

      // Frame shake + crooked tilt based on impact side
      const hitOffsetFromCenter = (relX - 50) / 50;
      const kick = (hitOffsetFromCenter >= 0 ? -1 : 1) * (3.8 + item.weight * 4.5);
      setShakeKick(kick);
      setShakeKey((k) => k + 1);
      setFrameTilt((prev) => {
        const next = prev + kick * 0.32;
        return Math.max(-8.5, Math.min(8.5, next));
      });

      soundFx.playSmashHit(item.sound);
      spawnParticles(clientX, clientY, item.splatColors);
      setTotalSmashes((c) => c + 1);
      setMenuOpen(false);

      const impactId = nextUid();
      setImpacts((prev) => [
        ...prev.slice(-8),
        {
          uid: impactId,
          x: clientX,
          y: clientY,
          text: item.impactText,
          color: item.splatColors[0],
        },
      ]);
      window.setTimeout(() => {
        setImpacts((prev) => prev.filter((imp) => imp.uid !== impactId));
      }, 650);

      if (item.behavior === 'stick') {
        const splatUid = nextUid();
        setSplats((prev) => [
          ...prev.slice(-44),
          {
            uid: splatUid,
            itemId: item.id,
            relX,
            relY,
            rotation: (Math.random() - 0.5) * 44,
            scale: 0.92 + Math.random() * 0.3,
          },
        ]);
      } else if (item.behavior === 'slide') {
        const slideUid = nextUid();
        setSplats((prev) => [
          ...prev.slice(-44),
          {
            uid: slideUid,
            itemId: item.id,
            relX,
            relY,
            rotation: (Math.random() - 0.5) * 28,
            scale: 0.95,
            sliding: true,
          },
        ]);
        window.setTimeout(() => {
          setSplats((prev) => prev.filter((s) => s.uid !== slideUid));
          const latestRect = portraitRef.current?.getBoundingClientRect();
          const dropX = latestRect ? latestRect.left + (relX / 100) * latestRect.width : clientX;
          const dropY = latestRect ? latestRect.top + (relY / 100) * latestRect.height + 16 : clientY + 16;
          spawnFallingItem(item, dropX, dropY, false);
        }, 380);
      } else {
        spawnFallingItem(item, clientX, clientY, true);
      }
    },
    [spawnFallingItem, spawnParticles]
  );

  handlePortraitHitRef.current = handlePortraitHit;
  spawnFallingItemRef.current = spawnFallingItem;

  // Launch an item directly in a comical arc from (startX, startY) at the portrait
  const throwItemAtPortrait = useCallback((item: ThrowItem, startX: number, startY: number) => {
    const el = portraitRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    // Target a randomized spot inside the portrait photo
    const targetX = rect.left + rect.width * (0.2 + Math.random() * 0.6);
    const targetY = rect.top + rect.height * (0.2 + Math.random() * 0.6);
    const flightTime = 0.28 + Math.random() * 0.08;
    const gravity = 980;

    const vx = (targetX - startX) / flightTime;
    const vy = (targetY - startY - 0.5 * gravity * flightTime * flightTime) / flightTime;

    soundFx.playThrowWhoosh();
    setProjectiles((prev) => [
      ...prev.slice(-14),
      {
        uid: nextUid(),
        item,
        x: startX,
        y: startY,
        vx,
        vy,
        rotation: (Math.random() - 0.5) * 30,
        vRot: (Math.random() > 0.5 ? 1 : -1) * (420 + Math.random() * 260),
        age: 0,
        maxFlightTime: flightTime + 0.08,
        aimedAtPortrait: true,
      },
    ]);
  }, []);

  // Unified physics loop: flying projectiles, falling items, burst particles
  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.045);
      lastTime = now;

      // 1. Flying projectiles thrown toward the wall/portrait
      setProjectiles((prev) => {
        if (prev.length === 0) return prev;
        const remaining: FlyingProjectile[] = [];
        for (const proj of prev) {
          const gravity = 980;
          const nextAge = proj.age + dt;
          const nextVy = proj.vy + gravity * dt;
          const nextX = proj.x + proj.vx * dt;
          const nextY = proj.y + nextVy * dt;
          const nextRot = proj.rotation + proj.vRot * dt;

          // Check portrait collision during flight (slightly after launch so aimed throws hit naturally)
          const minHitAge = proj.aimedAtPortrait ? proj.maxFlightTime * 0.55 : 0.04;
          if (nextAge >= minHitAge && isOverPortrait(nextX, nextY, 20)) {
            handlePortraitHitRef.current(proj.item, nextX, nextY);
            continue;
          }

          // If flight time elapsed without hitting portrait, it hits the wall / drops to floor
          if (nextAge >= proj.maxFlightTime || nextY > window.innerHeight * 0.85) {
            spawnFallingItemRef.current(proj.item, nextX, nextY, false);
            continue;
          }

          remaining.push({
            ...proj,
            x: nextX,
            y: nextY,
            vy: nextVy,
            rotation: nextRot,
            age: nextAge,
          });
        }
        return remaining;
      });

      // 2. Falling & floor-piled items
      setFallingItems((prev) => {
        const hasActive = prev.some((o) => !o.settled);
        if (!hasActive) return prev;
        return prev.map((obj) => {
          if (obj.settled) return obj;
          const gravity = 1950;
          let nextVy = obj.vy + gravity * dt;
          let nextX = obj.x + obj.vx * dt;
          let nextY = obj.y + nextVy * dt;
          let nextRot = obj.rotation + obj.vRot * dt;
          let nextVx = obj.vx * 0.992;
          let nextVRot = obj.vRot;
          let bounced = obj.bounced;
          let settled = false;

          if (nextX < 36) {
            nextX = 36;
            nextVx = Math.abs(nextVx) * 0.5;
          } else if (nextX > window.innerWidth - 36) {
            nextX = window.innerWidth - 36;
            nextVx = -Math.abs(nextVx) * 0.5;
          }

          if (nextY >= obj.floorY) {
            nextY = obj.floorY;
            if (!bounced && Math.abs(nextVy) > 220) {
              bounced = true;
              nextVy = -nextVy * 0.28;
              nextVx *= 0.55;
              nextVRot *= 0.35;
              soundFx.playFloorBounce();
            } else {
              settled = true;
              nextVy = 0;
              nextVx = 0;
              nextVRot = 0;
            }
          }

          return {
            ...obj,
            x: nextX,
            y: nextY,
            vx: nextVx,
            vy: nextVy,
            rotation: nextRot,
            vRot: nextVRot,
            bounced,
            settled,
          };
        });
      });

      // 3. Impact burst particles
      setParticles((prev) => {
        if (prev.length === 0) return prev;
        return prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx * dt,
            y: p.y + p.vy * dt,
            vy: p.vy + 900 * dt,
            life: p.life - dt * 2.1,
          }))
          .filter((p) => p.life > 0);
      });

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isOverPortrait]);

  // Global pointer move & up listeners for active drag, flick-throw, or quick-tap throw
  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (pendingTouchRef.current && e.pointerId === pendingTouchRef.current.pointerId) {
        const pending = pendingTouchRef.current;
        const dx = e.clientX - pending.startX;
        const dy = e.clientY - pending.startY;

        if (Math.abs(dx) > 10 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          window.clearTimeout(pending.timerId);
          pendingTouchRef.current = null;
          return;
        }

        if (dy < -5 || Math.abs(dy) > 9) {
          window.clearTimeout(pending.timerId);
          const now = performance.now();
          const nextDrag: DragState = {
            item: pending.item,
            startX: pending.startX,
            startY: pending.startY,
            x: e.clientX,
            y: e.clientY,
            vx: 0,
            vy: 0,
            movedDist: Math.hypot(dx, dy),
            overPortrait: isOverPortrait(e.clientX, e.clientY),
          };
          pendingTouchRef.current = null;
          lastPointerRef.current = { x: e.clientX, y: e.clientY, t: now };
          dragRef.current = nextDrag;
          setDragState(nextDrag);
        }
        return;
      }

      if (!dragRef.current) return;
      const now = performance.now();
      const dt = Math.max(0.008, (now - lastPointerRef.current.t) / 1000);
      const instVx = (e.clientX - lastPointerRef.current.x) / dt;
      const instVy = (e.clientY - lastPointerRef.current.y) / dt;
      lastPointerRef.current = { x: e.clientX, y: e.clientY, t: now };

      const prev = dragRef.current;
      const updated: DragState = {
        ...prev,
        x: e.clientX,
        y: e.clientY,
        vx: instVx * 0.55 + prev.vx * 0.45,
        vy: instVy * 0.55 + prev.vy * 0.45,
        movedDist: prev.movedDist + Math.hypot(e.clientX - prev.x, e.clientY - prev.y),
        overPortrait: isOverPortrait(e.clientX, e.clientY),
      };
      dragRef.current = updated;
      setDragState(updated);
    };

    const onPointerUp = (e: PointerEvent) => {
      // Quick tap on touch -> throw straight into the portrait!
      if (pendingTouchRef.current && e.pointerId === pendingTouchRef.current.pointerId) {
        const pending = pendingTouchRef.current;
        window.clearTimeout(pending.timerId);
        pendingTouchRef.current = null;
        throwItemAtPortrait(pending.item, pending.startX, pending.startY);
        return;
      }

      const active = dragRef.current;
      if (!active) return;

      dragRef.current = null;
      setDragState(null);

      // 1. Quick click without dragging -> throw item straight into portrait!
      if (active.movedDist < 10) {
        throwItemAtPortrait(active.item, e.clientX, e.clientY);
        return;
      }

      // 2. Dropped directly onto portrait -> instant smash!
      if (isOverPortrait(e.clientX, e.clientY)) {
        handlePortraitHit(active.item, e.clientX, e.clientY);
        return;
      }

      // 3. Flicked/thrown upward or toward portrait with velocity -> ballistic projectile flight!
      const speed = Math.hypot(active.vx, active.vy);
      if (active.vy < -180 || speed > 360) {
        soundFx.playThrowWhoosh();
        const clampedVx = Math.max(-1400, Math.min(1400, active.vx * 0.85));
        const clampedVy = Math.max(-1650, Math.min(400, active.vy * 0.85 - 120));
        setProjectiles((prev) => [
          ...prev.slice(-14),
          {
            uid: nextUid(),
            item: active.item,
            x: e.clientX,
            y: e.clientY,
            vx: clampedVx,
            vy: clampedVy,
            rotation: 0,
            vRot: (clampedVx >= 0 ? 1 : -1) * 480,
            age: 0,
            maxFlightTime: 0.65,
            aimedAtPortrait: false,
          },
        ]);
      } else {
        spawnFallingItem(active.item, e.clientX, e.clientY, false);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [handlePortraitHit, isOverPortrait, spawnFallingItem, throwItemAtPortrait]);

  const startItemPointerDown = (item: ThrowItem, e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    if (e.pointerType === 'mouse') {
      e.preventDefault();
      const now = performance.now();
      lastPointerRef.current = { x: e.clientX, y: e.clientY, t: now };
      const nextDrag: DragState = {
        item,
        startX: e.clientX,
        startY: e.clientY,
        x: e.clientX,
        y: e.clientY,
        vx: 0,
        vy: 0,
        movedDist: 0,
        overPortrait: isOverPortrait(e.clientX, e.clientY),
      };
      dragRef.current = nextDrag;
      setDragState(nextDrag);
      return;
    }

    const startX = e.clientX;
    const startY = e.clientY;
    const pointerId = e.pointerId;
    const timerId = window.setTimeout(() => {
      if (pendingTouchRef.current && pendingTouchRef.current.pointerId === pointerId) {
        const now = performance.now();
        lastPointerRef.current = { x: startX, y: startY, t: now };
        const nextDrag: DragState = {
          item,
          startX,
          startY,
          x: startX,
          y: startY,
          vx: 0,
          vy: 0,
          movedDist: 12,
          overPortrait: isOverPortrait(startX, startY),
        };
        pendingTouchRef.current = null;
        dragRef.current = nextDrag;
        setDragState(nextDrag);
      }
    }, 130);

    pendingTouchRef.current = { item, pointerId, startX, startY, timerId };
  };

  const handlePortraitClick = () => {
    if (dragRef.current) return;
    soundFx.playPortraitTap();
    setMenuOpen((prev) => !prev);
  };

  const handleSmashMenuButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playMenuOpen();
    setMenuOpen(false);
    setTrayOpen(true);
  };

  const handleResetRoom = () => {
    soundFx.playSweepClean();
    setSplats([]);
    setProjectiles([]);
    setFallingItems([]);
    setImpacts([]);
    setParticles([]);
    setFrameTilt(0);
    setTotalSmashes(0);
  };

  const toggleMute = () => {
    const next = !muted;
    soundFx.muted = next;
    setMuted(next);
  };

  const scrollTrayBy = (delta: number) => {
    trayScrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <main
      onClick={() => {
        if (menuOpen) setMenuOpen(false);
      }}
      className="relative h-dvh w-screen overflow-hidden flex flex-col items-center select-none bg-[#2c190e]"
    >
      {/* Full-screen cozy home interior with brown walls */}
      <CozyRoomDecor />

      {/* Top-right minimal utility controls */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 sm:top-4 sm:right-5 z-30 flex items-center gap-2"
      >
        {totalSmashes > 0 && (
          <>
            <span className="text-xs sm:text-sm font-bold text-[#f3dcc3]/90 tabular-nums mr-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
              Попаданий: {totalSmashes}
            </span>
            <button
              type="button"
              onClick={handleResetRoom}
              title="Убрать всё со стены и пола"
              className="min-h-[40px] px-3 py-1.5 rounded-xl bg-[#3c2111]/88 hover:bg-[#4e2c17] active:scale-95 border border-[#8e5a37]/55 text-[#f7e5d2] text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Убрать</span>
            </button>
          </>
        )}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? 'Включить звук' : 'Выключить звук'}
          title={muted ? 'Включить звук' : 'Выключить звук'}
          className="min-h-[40px] min-w-[40px] rounded-xl bg-[#3c2111]/88 hover:bg-[#4e2c17] active:scale-95 border border-[#8e5a37]/55 text-[#f7e5d2] flex items-center justify-center shadow-md transition-all cursor-pointer"
        >
          {muted ? <VolumeX className="w-4 h-4 text-amber-300/75" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Wall Stage: Painted Title + Portrait directly below it */}
      <div
        className={`relative z-10 w-full flex-1 flex flex-col items-center justify-start pt-4 sm:pt-6 transition-transform duration-300 ${
          trayOpen ? 'pb-[148px] sm:pb-[164px]' : 'pb-16'
        }`}
      >
        {/* Painted directly on the brown wall in brown paint */}
        <WallPaintText />

        {/* Hanging wire + brass nail */}
        <div className="relative flex flex-col items-center -mt-1 sm:-mt-2">
          <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#e7c478] to-[#876222] border border-[#2a1707] shadow-md z-20" />
          <svg
            width="110"
            height="24"
            viewBox="0 0 110 24"
            className="-mt-1.5 pointer-events-none"
            style={{
              transform: `rotate(${frameTilt * 0.25}deg)`,
              transformOrigin: '55px 2px',
            }}
          >
            <path d="M55 2 L14 23 M55 2 L96 23" stroke="#24160C" strokeWidth="2.2" />
          </svg>
        </div>

        {/* Portrait Frame (Interactive) */}
        <div className="relative -mt-1 flex flex-col items-center">
          <div
            ref={portraitRef}
            key={shakeKey}
            onClick={(e) => {
              e.stopPropagation();
              handlePortraitClick();
            }}
            role="button"
            tabIndex={0}
            aria-label="Портрет на стене — нажми чтобы открыть меню"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePortraitClick();
              }
            }}
            style={
              {
                '--base-rot': `${frameTilt}deg`,
                '--kick-rot': `${shakeKick}deg`,
                transform: `rotate(${frameTilt}deg)`,
                transformOrigin: '50% -18px',
              } as React.CSSProperties
            }
            className={`relative cursor-pointer group transition-shadow duration-150 ${
              shakeKey > 0 ? 'animate-frame-shake' : ''
            } ${
              dragState?.overPortrait
                ? 'ring-4 ring-amber-300/80 shadow-[0_0_32px_rgba(255,210,120,0.55)]'
                : 'shadow-[0_18px_36px_rgba(15,6,2,0.68),0_4px_10px_rgba(15,6,2,0.45)]'
            }`}
          >
            {/* Ordinary Classic Wooden Picture Frame */}
            <div
              className="relative p-3 sm:p-4 rounded-[4px] border-2 border-[#251207]"
              style={{
                background:
                  'linear-gradient(135deg, #6A3D1F 0%, #4E2B14 35%, #5E351A 70%, #3C1F0D 100%)',
                boxShadow:
                  'inset 0 2px 3px rgba(255,215,170,0.22), inset 0 -3px 5px rgba(0,0,0,0.55)',
              }}
            >
              {/* Inner bevel mat */}
              <div className="relative p-1.5 sm:p-2 bg-[#efe4d2] shadow-[inset_0_2px_6px_rgba(0,0,0,0.42)]">
                {/* Photo Viewport — strictly original uploaded photo, square aspect so nothing is cropped */}
                <div className="relative w-[196px] h-[196px] sm:w-[248px] sm:h-[248px] md:w-[276px] md:h-[276px] overflow-hidden bg-[#2b1a0e]">
                  <img
                    src={USER_PORTRAIT_URL}
                    alt="Портрет на стене"
                    referrerPolicy="no-referrer"
                    draggable={false}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />

                  {/* Subtle realistic glass reflection sheen */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        'linear-gradient(125deg, rgba(255,255,255,0.11) 0%, rgba(255,255,255,0.03) 28%, transparent 45%, rgba(0,0,0,0.05) 100%)',
                    }}
                  />

                  {/* Splats stuck inside the portrait */}
                  {splats.map((splat) => (
                    <div
                      key={splat.uid}
                      style={{
                        left: `${splat.relX}%`,
                        top: `${splat.relY}%`,
                        transform: `translate(-50%, -50%) rotate(${splat.rotation}deg) scale(${splat.scale})`,
                      }}
                      className={`absolute pointer-events-none z-10 ${
                        splat.sliding ? 'transition-transform duration-300 translate-y-6' : 'animate-splat-pop'
                      }`}
                    >
                      <div className="animate-ooze">
                        <ItemArt
                          id={splat.itemId}
                          variant="splat"
                          className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Portrait Mini Game Menu with ONE button: «СМЭШНУТЬ» */}
          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute -bottom-12 z-30 animate-splat-pop"
              style={{ left: '50%', transform: 'translateX(-50%)' }}
            >
              <div className="relative bg-[#3e2212] border-2 border-[#a86f42] rounded-2xl p-2 shadow-[0_14px_30px_rgba(10,4,1,0.75)]">
                <div className="w-3.5 h-3.5 bg-[#3e2212] border-l-2 border-t-2 border-[#a86f42] rotate-45 absolute -top-2 left-1/2 -translate-x-1/2" />
                <button
                  type="button"
                  onClick={handleSmashMenuButtonClick}
                  className="relative font-display min-h-[46px] px-7 py-2.5 rounded-xl bg-gradient-to-b from-[#e85b2c] to-[#bd3414] hover:from-[#f2693a] hover:to-[#cf3d19] active:scale-95 text-white font-black text-base sm:text-lg tracking-wide shadow-[0_4px_0_#751b06,0_8px_14px_rgba(0,0,0,0.4)] transition-all cursor-pointer whitespace-nowrap flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>СМЭШНУТЬ</span>
                </button>
              </div>
            </div>
          )}

          {/* Initial subtle hint before first click */}
          {!menuOpen && !trayOpen && totalSmashes === 0 && (
            <p className="mt-3 text-xs sm:text-sm font-semibold text-[#f3dbc0]/80 tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none">
              Нажми на портрет
            </p>
          )}
        </div>
      </div>

      {/* Flying Projectiles + Falling / Floor-Piled Items + Particles Layer */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {projectiles.map((proj) => {
          const depthScale = Math.max(0.92, 1.24 - proj.age * 0.7);
          return (
            <div
              key={proj.uid}
              style={{
                left: `${proj.x}px`,
                top: `${proj.y}px`,
                transform: `translate(-50%, -50%) rotate(${proj.rotation}deg) scale(${depthScale})`,
              }}
              className="absolute"
            >
              <ItemArt
                id={proj.item.id}
                variant="item"
                className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[6px_12px_12px_rgba(0,0,0,0.55)]"
              />
            </div>
          );
        })}

        {fallingItems.map((obj) => (
          <div
            key={obj.uid}
            style={{
              left: `${obj.x}px`,
              top: `${obj.y}px`,
              transform: `translate(-50%, -50%) rotate(${obj.rotation}deg) scale(${obj.scale})`,
            }}
            className="absolute"
          >
            {obj.settled && (
              <div className="w-12 h-3 bg-black/45 rounded-full blur-[2px] absolute left-1/2 -translate-x-1/2 -bottom-1" />
            )}
            <ItemArt
              id={obj.itemId}
              variant="item"
              className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_6px_8px_rgba(0,0,0,0.5)]"
            />
          </div>
        ))}

        {particles.map((p) => (
          <div
            key={p.uid}
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: Math.max(0, Math.min(1, p.life)),
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute rounded-full"
          />
        ))}

        {impacts.map((imp) => (
          <div
            key={imp.uid}
            style={{ left: `${imp.x}px`, top: `${imp.y}px` }}
            className="absolute"
          >
            <div
              style={{ borderColor: imp.color }}
              className="w-20 h-20 rounded-full border-4 animate-impact-ring"
            />
            <span className="font-display font-black text-xl sm:text-2xl text-[#fff6dc] absolute left-1/2 -top-8 -translate-x-1/2 whitespace-nowrap drop-shadow-[0_3px_0_#2b1205]">
              {imp.text}
            </span>
          </div>
        ))}
      </div>

      {/* Currently Dragged Floating Item */}
      {dragState && (
        <div
          style={{
            left: `${dragState.x}px`,
            top: `${dragState.y}px`,
            transform: `translate(-50%, -50%) rotate(${Math.max(
              -26,
              Math.min(26, dragState.vx * 0.04)
            )}deg) scale(1.24)`,
          }}
          className="fixed z-50 pointer-events-none"
        >
          <ItemArt
            id={dragState.item.id}
            variant="item"
            className="w-18 h-18 sm:w-20 sm:h-20 drop-shadow-[10px_18px_14px_rgba(12,4,1,0.62)]"
          />
        </div>
      )}

      {/* Bottom Items Panel (opens after pressing «СМЭШНУТЬ») */}
      {trayOpen && (
        <section
          aria-label="Панель смешных предметов"
          onClick={(e) => e.stopPropagation()}
          className="fixed bottom-0 inset-x-0 z-30 px-2 sm:px-6 pb-2 sm:pb-3 pt-1 pointer-events-auto"
        >
          <div className="max-w-5xl mx-auto rounded-2xl border-2 border-[#7e4c27] bg-gradient-to-b from-[#4c2b17]/95 to-[#311a0d]/98 shadow-[0_-10px_30px_rgba(10,4,1,0.65)] backdrop-blur-sm">
            {/* Compact Tray Header */}
            <div className="flex items-center justify-between px-3 sm:px-4 pt-2 pb-1 border-b border-[#6e4121]/50">
              <span className="text-xs sm:text-sm font-bold text-[#f5dec3] truncate">
                Нажми, тащи или кинь предмет в портрет
              </span>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollTrayBy(-240)}
                  aria-label="Прокрутить влево"
                  className="w-8 h-8 rounded-lg bg-[#381e0f] hover:bg-[#59321b] text-[#f3dcc3] flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollTrayBy(240)}
                  aria-label="Прокрутить вправо"
                  className="w-8 h-8 rounded-lg bg-[#381e0f] hover:bg-[#59321b] text-[#f3dcc3] flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setTrayOpen(false)}
                  aria-label="Скрыть панель предметов"
                  title="Скрыть панель"
                  className="w-8 h-8 rounded-lg bg-[#381e0f] hover:bg-[#6b2a1c] text-[#f3dcc3] flex items-center justify-center cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Item Crate */}
            <div
              ref={trayScrollRef}
              onWheel={(e) => {
                if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                  trayScrollRef.current?.scrollBy({ left: e.deltaY });
                }
              }}
              className="tray-scroll flex items-stretch gap-2 sm:gap-2.5 overflow-x-auto px-3 py-2.5"
            >
              {THROW_ITEMS.map((item) => {
                const isDraggingThis = dragState?.item.id === item.id;
                return (
                  <div
                    key={item.id}
                    onPointerDown={(e) => startItemPointerDown(item, e)}
                    style={{ touchAction: 'pan-x' }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Кинуть предмет: ${item.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        throwItemAtPortrait(item, window.innerWidth / 2, window.innerHeight - 90);
                      }
                    }}
                    className={`shrink-0 w-[76px] sm:w-[86px] rounded-xl border border-[#7c4d2a]/70 bg-[#3a2011]/90 hover:bg-[#522e19] hover:border-[#b57848] active:scale-95 px-1.5 py-1.5 flex flex-col items-center justify-between gap-1 cursor-grab active:cursor-grabbing transition-all select-none ${
                      isDraggingThis ? 'opacity-40 scale-95' : 'opacity-100'
                    }`}
                  >
                    <ItemArt
                      id={item.id}
                      variant="item"
                      className="w-11 h-11 sm:w-12 sm:h-12 pointer-events-none"
                    />
                    <span className="text-[10px] sm:text-[11px] leading-tight font-bold text-[#f7e5cf] text-center line-clamp-2 pointer-events-none">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
