import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// @ts-ignore
import HALO from 'vanta/dist/vanta.halo.min';

const VantaBackground: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vantaEffect: any;
    if (vantaRef.current) {
      vantaEffect = HALO({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        // Customize halo options
        color: 0xff3b3f,
        backgroundColor: 0x1a1a1a,
      });
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="w-full h-screen" />;
};

export default VantaBackground;
