import { useEffect, useRef, useState, useId } from 'react';

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = e => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return isDark;
};

 const GlassSurface = ({
  children,
  width = '100%',
  height = 'auto',
  borderRadius = 20,
  borderWidth = 0.07,
  brightness = 50,
  opacity = 0.9,
  blur = 6,
  displace = 0,
  backgroundOpacity = 0,
  saturation = 1,
  distortionScale = -90,
  redOffset = 0,
  greenOffset = 6,
  blueOffset = 12,
  xChannel = 'R',
  yChannel = 'G',
  mixBlendMode = 'difference',
  quality = 0.25,
  staticMode = true,
  className = '',
  style = {}
}) => {
  const uniqueId = useId().replace(/:/g, '-');
  const filterId = `glass-filter-${uniqueId}`;
  const redGradId = `red-grad-${uniqueId}`;
  const blueGradId = `blue-grad-${uniqueId}`;

  const containerRef = useRef(null);
  const feImageRef = useRef(null);
  const redChannelRef = useRef(null);
  const greenChannelRef = useRef(null);
  const blueChannelRef = useRef(null);
  const gaussianBlurRef = useRef(null);

  const isDarkMode = useDarkMode();
  if (staticMode) {
    const baseStyles = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
      background: isDarkMode ? 'rgba(20,20,28,0.25)' : 'rgba(255,255,255,0.25)',
      backdropFilter: 'blur(14px) saturate(1.6)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.6)',
      border: isDarkMode ? '1px solid rgba(255,255,255,0.18)' : '1px solid rgba(255,255,255,0.32)',
      boxShadow: isDarkMode
        ? 'inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.25), 0 6px 24px rgba(0,0,0,0.25)'
        : 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.08), 0 6px 24px rgba(31,38,135,0.25)'
    };
    return (
      <div className={`relative overflow-hidden ${className}`} style={baseStyles}>
        {/* specular highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            background: 'linear-gradient(130deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 24%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0) 60%)',
            mixBlendMode: 'soft-light',
            opacity: isDarkMode ? 0.45 : 0.6
          }}
        />
        {/* inner rim light */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            boxShadow: isDarkMode
              ? 'inset 0 0 0 1px rgba(255,255,255,0.12), inset 0 8px 24px rgba(255,255,255,0.06)'
              : 'inset 0 0 0 1px rgba(255,255,255,0.35), inset 0 8px 24px rgba(255,255,255,0.15)'
          }}
        />
        {/* subtle micro-texture */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 0.5px, rgba(0,0,0,0) 0.6px)',
            backgroundSize: '6px 6px',
            opacity: isDarkMode ? 0.25 : 0.15
          }}
        />
        <div className="w-full p-6 rounded-[inherit] relative z-10">{children}</div>
      </div>
    );
  }
  const [isActive, setIsActive] = useState(false);

  const generateDisplacementMap = () => {
    const rect = containerRef.current?.getBoundingClientRect();
    const q = Math.max(0.1, Math.min(Number(quality) || 0.25, 1));
    const actualWidth = Math.max(64, Math.floor((rect?.width || 400) * q));
    const actualHeight = Math.max(64, Math.floor((rect?.height || 200) * q));
    const edgeSize = Math.min(actualWidth, actualHeight) * (borderWidth * 0.5);

    const svgContent = `
      <svg viewBox="0 0 ${actualWidth} ${actualHeight}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${redGradId}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${blueGradId}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" fill="black"></rect>
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${redGradId})" />
        <rect x="0" y="0" width="${actualWidth}" height="${actualHeight}" rx="${borderRadius}" fill="url(#${blueGradId})" style="mix-blend-mode: ${mixBlendMode}" />
        <rect x="${edgeSize}" y="${edgeSize}" width="${actualWidth - edgeSize * 2}" height="${actualHeight - edgeSize * 2}" rx="${borderRadius}" fill="hsl(0 0% ${brightness}% / ${opacity})" style="filter:blur(${blur}px)" />
      </svg>
    `;

    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  };

  const updateDisplacementMap = () => {
    feImageRef.current?.setAttribute('href', generateDisplacementMap());
  };

   useEffect(() => {
    updateDisplacementMap();
    [
      { ref: redChannelRef, offset: redOffset },
      { ref: greenChannelRef, offset: greenOffset },
      { ref: blueChannelRef, offset: blueOffset }
    ].forEach(({ ref, offset }) => {
      if (ref.current) {
        ref.current.setAttribute('scale', (distortionScale + offset).toString());
        ref.current.setAttribute('xChannelSelector', xChannel);
        ref.current.setAttribute('yChannelSelector', yChannel);
      }
    });

     gaussianBlurRef.current?.setAttribute('stdDeviation', Math.max(0, displace).toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    width,
    height,
    borderRadius,
    borderWidth,
    brightness,
    opacity,
    blur,
    displace,
    distortionScale,
    redOffset,
    greenOffset,
    blueOffset,
    xChannel,
    yChannel,
     mixBlendMode,
     quality
  ]);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateDisplacementMap, 0);
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(updateDisplacementMap, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height]);

  const supportsSVGFilters = () => {
    try {
      if (typeof window === 'undefined' || typeof document === 'undefined') return false;
      const ua = navigator.userAgent || '';
      const isWebkit = /Safari/.test(ua) && !/Chrome/.test(ua);
      const isFirefox = /Firefox/.test(ua);
      if (isWebkit || isFirefox) return false;
      const div = document.createElement('div');
      div.style.backdropFilter = `url(#${filterId})`;
      return div.style.backdropFilter !== '';
    } catch (_) {
      return false;
    }
  };

  const supportsBackdropFilter = () => {
    try {
      if (typeof window === 'undefined') return false;
      if (typeof CSS === 'undefined' || typeof CSS.supports !== 'function') return false;
      return CSS.supports('backdrop-filter', 'blur(10px)');
    } catch (_) {
      return false;
    }
  };

   const getContainerStyles = () => {
    const baseStyles = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderRadius: `${borderRadius}px`,
      '--glass-frost': backgroundOpacity,
      '--glass-saturation': saturation
    };

     const svgSupported = supportsSVGFilters();
    const backdropFilterSupported = supportsBackdropFilter();
     const useSvg = svgSupported && isActive;

     if (useSvg) {
      return {
        ...baseStyles,
        background: isDarkMode ? `hsl(0 0% 0% / ${backgroundOpacity})` : `hsl(0 0% 100% / ${backgroundOpacity})`,
        backdropFilter: `url(#${filterId}) saturate(${saturation})`,
        boxShadow: isDarkMode
          ? `0 0 2px 1px color-mix(in oklch, white, transparent 65%) inset,
             0 0 10px 4px color-mix(in oklch, white, transparent 85%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`
          : `0 0 2px 1px color-mix(in oklch, black, transparent 85%) inset,
             0 0 10px 4px color-mix(in oklch, black, transparent 90%) inset,
             0px 4px 16px rgba(17, 17, 26, 0.05),
             0px 8px 24px rgba(17, 17, 26, 0.05),
             0px 16px 56px rgba(17, 17, 26, 0.05),
             0px 4px 16px rgba(17, 17, 26, 0.05) inset,
             0px 8px 24px rgba(17, 17, 26, 0.05) inset,
             0px 16px 56px rgba(17, 17, 26, 0.05) inset`
      };
    } else {
      if (isDarkMode) {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: 'rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`
          };
        } else {
          return {
            ...baseStyles,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px) saturate(1.8) brightness(1.2)',
            WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.2)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.2),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`
          };
        }
      } else {
        if (!backdropFilterSupported) {
          return {
            ...baseStyles,
            background: 'rgba(255, 255, 255, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.5),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.3)`
          };
        } else {
          return {
            ...baseStyles,
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',
            WebkitBackdropFilter: 'blur(12px) saturate(1.8) brightness(1.1)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `0 8px 32px 0 rgba(31, 38, 135, 0.2),
                        0 2px 16px 0 rgba(31, 38, 135, 0.1),
                        inset 0 1px 0 0 rgba(255, 255, 255, 0.4),
                        inset 0 -1px 0 0 rgba(255, 255, 255, 0.2)`
          };
        }
      }
    }
  };

   const glassSurfaceClasses =
     'relative overflow-hidden transition-opacity duration-[260ms] ease-out';

  const focusVisibleClasses = isDarkMode
    ? 'focus-visible:outline-2 focus-visible:outline-[#0A84FF] focus-visible:outline-offset-2'
    : 'focus-visible:outline-2 focus-visible:outline-[#007AFF] focus-visible:outline-offset-2';

  // Activate heavy SVG filter only when visible/hovered to improve perf
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let io = null;
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      io = new IntersectionObserver((entries) => {
        const entry = entries[0];
        setIsActive(entry.isIntersecting && entry.intersectionRatio > 0.25);
      }, { threshold: [0, 0.25, 0.5] });
      io.observe(el);
    } else {
      setIsActive(true);
    }

    const onEnter = () => setIsActive(true);
    const onLeave = () => setIsActive(false);
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    // Temporarily disable heavy effect while scrolling for smoother FPS
    let scrollTO = null;
    const onScroll = () => {
      setIsActive(false);
      if (scrollTO) clearTimeout(scrollTO);
      scrollTO = setTimeout(() => setIsActive(true), 180);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      try { io && io.disconnect(); } catch (e) { /* noop */ }
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
      if (scrollTO) clearTimeout(scrollTO);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${glassSurfaceClasses} ${focusVisibleClasses} ${className}`}
      style={getContainerStyles()}
    >
      <svg
        className="w-full h-full pointer-events-none absolute inset-0 opacity-0 -z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="0%" y="0%" width="100%" height="100%">
            <feImage ref={feImageRef} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />

            <feDisplacementMap ref={redChannelRef} in="SourceGraphic" in2="map" id="redchannel" result="dispRed" />
            <feColorMatrix
              in="dispRed"
              type="matrix"
              values="1 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="red"
            />

            <feDisplacementMap
              ref={greenChannelRef}
              in="SourceGraphic"
              in2="map"
              id="greenchannel"
              result="dispGreen"
            />
            <feColorMatrix
              in="dispGreen"
              type="matrix"
              values="0 0 0 0 0
                      0 1 0 0 0
                      0 0 0 0 0
                      0 0 0 1 0"
              result="green"
            />

            <feDisplacementMap ref={blueChannelRef} in="SourceGraphic" in2="map" id="bluechannel" result="dispBlue" />
            <feColorMatrix
              in="dispBlue"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 1 0 0
                      0 0 0 1 0"
              result="blue"
            />

            <feBlend in="red" in2="green" mode="screen" result="rg" />
            <feBlend in="rg" in2="blue" mode="screen" result="output" />
            <feGaussianBlur ref={gaussianBlurRef} in="output" stdDeviation="0.7" />
          </filter>
        </defs>
      </svg>

       <div className="w-full p-4 rounded-[inherit] relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassSurface;
