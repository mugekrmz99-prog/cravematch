import React, { useState, useEffect } from 'react';
import { sound } from '../utils/sound';

interface ThreeDDiceProps {
  size?: number; // e.g. 90
  isRolling?: boolean;
  targetFace?: number; // 1 to 6
  onRollComplete?: (face: number) => void;
  className?: string;
  showTrails?: boolean;
}

export const ThreeDDice: React.FC<ThreeDDiceProps> = ({
  size = 96,
  isRolling = false,
  targetFace = 5,
  onRollComplete,
  className = '',
  showTrails = true
}) => {
  // Target face rotation angles:
  // Face 1: Front (0, 0, 0)
  // Face 2: Right (0, -90, 0)
  // Face 3: Left (0, 90, 0)
  // Face 4: Top (-90, 0, 0)
  // Face 5: Bottom (90, 0, 0)
  // Face 6: Back (0, 180, 0)
  const faceRotations: Record<number, { x: number; y: number; z: number }> = {
    1: { x: -15, y: 15, z: 0 },
    2: { x: -15, y: -75, z: 10 },
    3: { x: -15, y: 105, z: -10 },
    4: { x: -105, y: 15, z: 0 },
    5: { x: 75, y: 20, z: -10 },
    6: { x: -15, y: 195, z: 0 }
  };

  const [rotations, setRotations] = useState<{ x: number; y: number; z: number }>({
    x: 20,
    y: -30,
    z: 15
  });

  const halfSize = size / 2;

  useEffect(() => {
    if (isRolling) {
      sound.playDiceRoll();

      // Spin randomly in multiple turns
      const extraTurnsX = (Math.floor(Math.random() * 3) + 3) * 360;
      const extraTurnsY = (Math.floor(Math.random() * 4) + 3) * 360;
      const target = faceRotations[targetFace] || faceRotations[5];

      setRotations({
        x: target.x + extraTurnsX,
        y: target.y + extraTurnsY,
        z: target.z + 360
      });

      const timer = setTimeout(() => {
        onRollComplete?.(targetFace);
      }, 1200);

      return () => clearTimeout(timer);
    } else {
      const target = faceRotations[targetFace] || faceRotations[5];
      setRotations({
        x: target.x,
        y: target.y,
        z: target.z
      });
    }
  }, [isRolling, targetFace]);

  // Helper to render white pips on dice face
  const renderPips = (faceNum: number) => {
    const pipClasses = "w-3.5 h-3.5 rounded-full bg-white shadow-inner border border-amber-300/40";
    switch (faceNum) {
      case 1:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <span className={`${pipClasses} w-5 h-5 bg-white shadow-md`} />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full p-3 flex justify-between">
            <span className={pipClasses} />
            <span className={`${pipClasses} self-end`} />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full p-2.5 flex justify-between">
            <span className={pipClasses} />
            <span className={`${pipClasses} self-center`} />
            <span className={`${pipClasses} self-end`} />
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full p-3 grid grid-cols-2 gap-3 justify-items-center items-center">
            <span className={pipClasses} />
            <span className={pipClasses} />
            <span className={pipClasses} />
            <span className={pipClasses} />
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full p-2.5 relative">
            <div className="w-full h-full grid grid-cols-2 gap-3 justify-items-center items-center">
              <span className={pipClasses} />
              <span className={pipClasses} />
              <span className={pipClasses} />
              <span className={pipClasses} />
            </div>
            <span className={`${pipClasses} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`} />
          </div>
        );
      case 6:
        return (
          <div className="w-full h-full p-2.5 grid grid-cols-2 gap-y-2 gap-x-4 justify-items-center items-center">
            <span className={pipClasses} />
            <span className={pipClasses} />
            <span className={pipClasses} />
            <span className={pipClasses} />
            <span className={pipClasses} />
            <span className={pipClasses} />
          </div>
        );
      default:
        return null;
    }
  };

  const faceStyle = (transform: string): React.CSSProperties => ({
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${size * 0.22}px`,
    transform,
    background: 'linear-gradient(135deg, #FFC83B 0%, #F2A900 60%, #D48800 100%)',
    boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -3px 6px rgba(160,90,0,0.4)',
    border: '2px solid rgba(255, 255, 255, 0.4)',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none'
  });

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Dynamic Swooshing Glow Trails */}
      {showTrails && (
        <>
          <div className="absolute -inset-6 rounded-full border border-amber-300/30 opacity-70 animate-[spin_6s_linear_infinite] pointer-events-none" />
          <div className="absolute -inset-10 rounded-full border border-amber-400/20 opacity-50 animate-[spin_10s_linear_infinite_reverse] pointer-events-none" />
          {/* Sparkles */}
          <span className="absolute -top-3 -right-2 text-amber-300 text-lg animate-bounce select-none">✦</span>
          <span className="absolute -bottom-2 -left-3 text-amber-200 text-sm animate-pulse select-none">✦</span>
        </>
      )}

      {/* 3D Perspective Viewport */}
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          perspective: '800px'
        }}
        className="relative"
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotations.x}deg) rotateY(${rotations.y}deg) rotateZ(${rotations.z}deg)`,
            transition: isRolling ? 'transform 1.2s cubic-bezier(0.2, 0.9, 0.3, 1)' : 'transform 0.4s ease-out'
          }}
        >
          {/* Face 1: Front */}
          <div style={faceStyle(`translateZ(${halfSize}px)`)}>
            {renderPips(1)}
          </div>

          {/* Face 6: Back */}
          <div style={faceStyle(`rotateY(180deg) translateZ(${halfSize}px)`)}>
            {renderPips(6)}
          </div>

          {/* Face 2: Right */}
          <div style={faceStyle(`rotateY(90deg) translateZ(${halfSize}px)`)}>
            {renderPips(2)}
          </div>

          {/* Face 3: Left */}
          <div style={faceStyle(`rotateY(-90deg) translateZ(${halfSize}px)`)}>
            {renderPips(3)}
          </div>

          {/* Face 4: Top */}
          <div style={faceStyle(`rotateX(90deg) translateZ(${halfSize}px)`)}>
            {renderPips(4)}
          </div>

          {/* Face 5: Bottom */}
          <div style={faceStyle(`rotateX(-90deg) translateZ(${halfSize}px)`)}>
            {renderPips(5)}
          </div>
        </div>
      </div>

      {/* Shadow under dice */}
      <div
        className="absolute -bottom-5 w-24 h-4 bg-teal-950/30 rounded-full blur-md"
        style={{ transform: isRolling ? 'scale(0.8)' : 'scale(1)', transition: 'transform 0.3s' }}
      />
    </div>
  );
};
