import React from 'react';
import { useLogo } from '../../context/LogoContext';

export interface EspatodoLogoProps {
  variant?: 'icon' | 'full' | 'horizontal';
  is3D?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showSubtitle?: boolean;
  srcOverride?: string;
}

export const EspatodoLogo: React.FC<EspatodoLogoProps> = ({
  variant = 'full',
  is3D = true,
  size = 'md',
  className = '',
  showSubtitle = false,
  srcOverride,
}) => {
  const { logoUrl: contextLogoUrl } = useLogo();
  const effectiveLogoUrl = srcOverride || contextLogoUrl;

  // Dimensions
  const emblemSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
    hero: 'w-36 h-36 sm:w-44 sm:h-44'
  };

  const fullSizes = {
    sm: 'w-36',
    md: 'w-52',
    lg: 'w-72',
    xl: 'w-96',
    hero: 'w-full max-w-lg'
  };

  const horizontalSizes = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-14',
    xl: 'h-20',
    hero: 'h-24'
  };

  // If the user uploaded their exact original Metalizado.png file, render it directly!
  if (effectiveLogoUrl) {
    if (variant === 'full') {
      return (
        <div className={`inline-flex flex-col items-center select-none ${fullSizes[size]} ${className}`}>
          <img
            src={effectiveLogoUrl}
            alt="Isologo Oficial Metalizado - www.espatodo.com"
            className="w-full h-auto object-contain drop-shadow-2xl select-none"
          />
          {showSubtitle && (
            <div className="flex items-center gap-2 mt-2 text-xs font-mono text-neutral-400">
              <span className="text-amber-400 font-semibold">Plataforma Modular</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400">Rubén Darío Rincón Montoya</span>
            </div>
          )}
        </div>
      );
    }

    if (variant === 'horizontal') {
      return (
        <div className={`inline-flex items-center gap-2.5 select-none ${horizontalSizes[size]} ${className}`}>
          <img
            src={effectiveLogoUrl}
            alt="Isologo Oficial - espatodo.com"
            className="h-full w-auto max-w-[280px] object-contain drop-shadow-md select-none"
          />
          {showSubtitle && (
            <div className="hidden sm:flex flex-col justify-center leading-none pl-1">
              <span className="text-[11px] font-mono text-amber-400 font-semibold">Plataforma Modular</span>
              <span className="text-[9px] font-mono text-neutral-400 mt-0.5">Rubén Darío Rincón M.</span>
            </div>
          )}
        </div>
      );
    }

    // Icon variant (cropped top emblem)
    return (
      <div className={`inline-flex items-center justify-center select-none overflow-hidden rounded-lg ${emblemSizes[size]} ${className}`}>
        <img
          src={effectiveLogoUrl}
          alt="Isologo Espatodo"
          className="w-[170%] max-w-none h-auto object-top -translate-y-[8%] drop-shadow-md"
        />
      </div>
    );
  }

  const uid = React.useId().replace(/:/g, '');

  // 1. EMBLEM SVG ONLY (Used in 'icon' variant and navbar)
  const renderEmblem = (customClass = '') => (
    <svg
      viewBox="0 0 600 600"
      className={`${customClass} select-none overflow-visible`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Metal Filters for 3D realism */}
        <filter id={`${uid}-3d-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.75" />
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#0284C7" floodOpacity="0.25" />
        </filter>

        <filter id={`${uid}-bevel-shadow`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.85" />
        </filter>

        {/* --- GRADIENTS --- */}
        {/* 1. Outer Blue Ribbon Face: Brushed Cyan to Royal Blue */}
        <linearGradient id={`${uid}-outer-blue-face`} x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="25%" stopColor="#2563EB" />
          <stop offset="65%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>

        {/* 1b. Outer Ribbon Bevel Depth (Dark Shadow) */}
        <linearGradient id={`${uid}-outer-blue-depth`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="50%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#0B0F19" />
        </linearGradient>

        {/* 2. Inner Nested Ribbon Face */}
        <linearGradient id={`${uid}-inner-blue-face`} x1="20%" y1="20%" x2="80%" y2="80%">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="30%" stopColor="#38BDF8" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>

        {/* 3. Central 45° Diagonal Shaft: Blue -> Purple -> Coral Transition */}
        <linearGradient id={`${uid}-shaft-face`} x1="20%" y1="80%" x2="80%" y2="20%">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="25%" stopColor="#3B82F6" />
          <stop offset="50%" stopColor="#7C3AED" />
          <stop offset="65%" stopColor="#9333EA" />
          <stop offset="85%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#F97316" />
        </linearGradient>

        {/* 3b. Shaft Extruded 3D Side Face (Shadow) */}
        <linearGradient id={`${uid}-shaft-depth`} x1="20%" y1="80%" x2="80%" y2="20%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="40%" stopColor="#312E81" />
          <stop offset="70%" stopColor="#4C1D95" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>

        {/* 4. Arrow Head Upper Light Facet (Peach / Gold / Coral) */}
        <linearGradient id={`${uid}-arrow-upper-facet`} x1="10%" y1="90%" x2="90%" y2="10%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="30%" stopColor="#F97316" />
          <stop offset="70%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#FED7AA" />
        </linearGradient>

        {/* 4b. Arrow Head Lower Dark Facet (Copper / Terracotta Shadow) */}
        <linearGradient id={`${uid}-arrow-lower-facet`} x1="30%" y1="80%" x2="90%" y2="20%">
          <stop offset="0%" stopColor="#7C2D12" />
          <stop offset="40%" stopColor="#9A3412" />
          <stop offset="80%" stopColor="#C2410C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>

        {/* 5. Lower Loop: Blue base rising into glowing Orange Hook */}
        <linearGradient id={`${uid}-lower-loop-outer`} x1="10%" y1="40%" x2="90%" y2="60%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="35%" stopColor="#2563EB" />
          <stop offset="70%" stopColor="#0284C7" />
          <stop offset="90%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>

        {/* 5b. Lower Loop Inner Surface (Vibrant Copper/Orange Sheen) */}
        <linearGradient id={`${uid}-hook-orange-face`} x1="20%" y1="80%" x2="80%" y2="20%">
          <stop offset="0%" stopColor="#C2410C" />
          <stop offset="35%" stopColor="#EA580C" />
          <stop offset="70%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>

        {/* Brushed Metal Sheen Texture */}
        <linearGradient id={`${uid}-metal-sheen`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.0" />
          <stop offset="40%" stopColor="#000000" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.35" />
          <stop offset="80%" stopColor="#000000" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <g filter={is3D ? `url(#${uid}-3d-glow)` : undefined}>
        
        {/* ============================================================== */}
        {/* 1. OUTER BLUE WING / CREST RIBBON (Left & Top)                 */}
        {/* ============================================================== */}
        
        {/* Extruded Depth Under-wall (Shadow) */}
        <path
          d="M 180 320 C 160 250, 190 140, 290 85 C 330 65, 380 70, 410 95 L 420 105 C 375 80, 325 85, 280 110 C 200 160, 180 255, 195 325 Z"
          fill={`url(#${uid}-outer-blue-depth)`}
        />

        {/* Outer Ribbon Front Face (Curved Aerodynamic Metal) */}
        <path
          d="M 182 324 C 165 240, 200 135, 305 82 C 345 62, 395 72, 420 100 L 375 140 C 350 120, 320 115, 290 130 C 220 168, 205 245, 218 318 Z"
          fill={`url(#${uid}-outer-blue-face)`}
        />

        {/* Specular Highlight on Outer Rim (High-Gloss Chrome Cyan) */}
        <path
          d="M 182 324 C 165 240, 200 135, 305 82 C 345 62, 395 72, 420 100"
          stroke="#7DD3FC"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.9"
          fill="none"
        />

        {/* ============================================================== */}
        {/* 2. INNER NESTED BLUE RIBBON (Parallel Aerodynamic Curve)       */}
        {/* ============================================================== */}
        
        {/* Inner Ribbon Depth */}
        <path
          d="M 230 310 C 225 245, 255 170, 325 135 C 355 120, 385 125, 405 145 L 375 175 C 360 160, 340 155, 320 168 C 270 195, 250 255, 255 310 Z"
          fill={`url(#${uid}-outer-blue-depth)`}
          opacity="0.8"
        />

        {/* Inner Ribbon Front Face */}
        <path
          d="M 235 305 C 230 240, 260 170, 330 135 C 360 120, 390 125, 410 148 L 380 178 C 365 165, 345 160, 325 172 C 275 200, 258 255, 262 305 Z"
          fill={`url(#${uid}-inner-blue-face)`}
        />

        {/* Rim Light on Inner Ribbon */}
        <path
          d="M 235 305 C 230 240, 260 170, 330 135 C 360 120, 390 125, 410 148"
          stroke="#BAE6FD"
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.85"
          fill="none"
        />

        {/* ============================================================== */}
        {/* 3. CENTRAL 45° DIAGONAL PRISM / SHAFT                          */}
        {/* ============================================================== */}
        
        {/* Extruded Right Bevel / 3D Thickness of the Shaft */}
        <path
          d="M 250 435 L 435 250 L 452 267 L 267 452 Z"
          fill={`url(#${uid}-shaft-depth)`}
        />

        {/* Front Face of the 45° Shaft (Deep Blue -> Violet -> Coral) */}
        <path
          d="M 232 417 L 417 232 L 442 257 L 257 442 Z"
          fill={`url(#${uid}-shaft-face)`}
        />

        {/* Center Ridge Specular Highlight of Shaft */}
        <line
          x1="244"
          y1="430"
          x2="430"
          y2="244"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeOpacity="0.6"
        />

        {/* ============================================================== */}
        {/* 4. 3D METALLIC ARROWHEAD (45° Upward Projecting Arrow)         */}
        {/* ============================================================== */}
        
        {/* Swept-back Barbs & Volumetric Shadow */}
        <path
          d="M 390 270 L 495 110 L 435 145 Z"
          fill="#5C1D06"
          opacity="0.8"
        />

        {/* Upper / Left Facet (Peach / Gold / Radiant Coral Light) */}
        <path
          d="M 495 110 L 375 190 L 420 235 Z"
          fill={`url(#${uid}-arrow-upper-facet)`}
        />

        {/* Lower / Right Facet (Deep Metallic Copper / Bronze Shadow) */}
        <path
          d="M 495 110 L 420 235 L 470 285 Z"
          fill={`url(#${uid}-arrow-lower-facet)`}
        />

        {/* Center Ridge of the Arrowhead (Sharp 3D Metallic Crease) */}
        <line
          x1="420"
          y1="235"
          x2="495"
          y2="110"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeOpacity="0.9"
        />

        {/* Glowing Rim on the Leading Edge of Arrowhead */}
        <line
          x1="375"
          y1="190"
          x2="495"
          y2="110"
          stroke="#FED7AA"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />

        {/* ============================================================== */}
        {/* 5. LOWER LOOP & UPWARD HOOK (Blue looping into Copper Hook)   */}
        {/* ============================================================== */}
        
        {/* Extruded Depth Underneath the Bottom Loop */}
        <path
          d="M 220 405 C 190 445, 205 505, 255 538 C 305 570, 375 565, 425 530 C 475 495, 495 440, 498 375 L 478 375 C 475 425, 455 470, 415 498 C 375 525, 318 528, 275 500 C 235 472, 222 432, 240 405 Z"
          fill="#0B1120"
          opacity="0.75"
        />

        {/* Lower Loop Outer Surface (Brushed Metallic Royal Blue) */}
        <path
          d="M 235 410 C 205 450, 220 505, 268 535 C 315 565, 385 560, 432 525 C 478 490, 492 440, 495 380 L 460 380 C 458 425, 442 462, 408 488 C 372 515, 320 518, 282 492 C 248 468, 238 435, 252 410 Z"
          fill={`url(#${uid}-lower-loop-outer)`}
        />

        {/* Upward Hook Inner Face (Radiant Metallic Coral / Copper) */}
        <path
          d="M 495 380 C 495 345, 485 305, 465 270 L 435 300 C 448 325, 458 355, 460 380 Z"
          fill={`url(#${uid}-hook-orange-face)`}
        />

        {/* Angled Cut of Hook Tip pointing towards arrow */}
        <path
          d="M 465 270 L 435 300 L 452 285 Z"
          fill="#FED7AA"
          opacity="0.95"
        />

        {/* Cyan Rim Light on Bottom Arc */}
        <path
          d="M 268 535 C 315 565, 385 560, 432 525"
          stroke="#38BDF8"
          strokeWidth="2.5"
          strokeOpacity="0.7"
          fill="none"
        />

        {/* Brushed Metal Highlight Overlay */}
        {is3D && (
          <rect
            x="160"
            y="70"
            width="350"
            height="500"
            fill={`url(#${uid}-metal-sheen)`}
            style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }}
            opacity="0.35"
          />
        )}

      </g>
    </svg>
  );

  // 2. FULL VARIANT: Exactly matches Metalizado.png (Emblem on top + 3D wordmark below)
  if (variant === 'full') {
    return (
      <div className={`inline-flex flex-col items-center select-none ${fullSizes[size]} ${className}`}>
        {/* Emblem */}
        <div className="w-full aspect-square flex items-center justify-center p-2">
          {renderEmblem('w-full h-full')}
        </div>

        {/* 3D Metallic Wordmark "espatodo.com" matching Metalizado.png */}
        <div className="w-full flex items-center justify-center mt-[-6%]">
          <svg viewBox="0 0 760 180" className="w-full overflow-visible select-none">
            <defs>
              {/* 3D Drop Shadow for Letters */}
              <filter id={`${uid}-text-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.75" />
                <feDropShadow dx="2" dy="4" stdDeviation="2" floodColor="#000000" floodOpacity="0.9" />
              </filter>

              {/* Blue 3D Letters Face Gradient */}
              <linearGradient id={`${uid}-text-blue-face`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="25%" stopColor="#3B82F6" />
                <stop offset="60%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>

              {/* Blue 3D Extrusion Shadow (Bevel Depth) */}
              <linearGradient id={`${uid}-text-blue-bevel`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>

              {/* Orange 3D Letters Face Gradient */}
              <linearGradient id={`${uid}-text-orange-face`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="30%" stopColor="#FB923C" />
                <stop offset="70%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>

              {/* Orange 3D Extrusion Shadow (Bevel Depth) */}
              <linearGradient id={`${uid}-text-orange-bevel`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9A3412" />
                <stop offset="100%" stopColor="#431407" />
              </linearGradient>
            </defs>

            <g filter={is3D ? `url(#${uid}-text-shadow)` : undefined}>
              {/* 3D Extruded Depth Under-layer (Simulated 3D extrusion) */}
              <text
                x="380"
                y="136"
                textAnchor="middle"
                className="font-black tracking-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                  fontSize: '116px',
                  fontWeight: 900
                }}
              >
                <tspan fill={`url(#${uid}-text-blue-bevel)`}>espatodo</tspan>
                <tspan fill={`url(#${uid}-text-orange-bevel)`}>.com</tspan>
              </text>

              {/* Front Metallic Face */}
              <text
                x="380"
                y="130"
                textAnchor="middle"
                className="font-black tracking-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                  fontSize: '116px',
                  fontWeight: 900
                }}
              >
                <tspan fill={`url(#${uid}-text-blue-face)`}>espatodo</tspan>
                <tspan fill={`url(#${uid}-text-orange-face)`}>.com</tspan>
              </text>

              {/* Top Specular Rim Light */}
              <text
                x="380"
                y="128"
                textAnchor="middle"
                className="font-black tracking-tight"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.2"
                strokeOpacity="0.45"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                  fontSize: '116px',
                  fontWeight: 900
                }}
              >
                <tspan>espatodo</tspan>
                <tspan>.com</tspan>
              </text>
            </g>
          </svg>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-2 mt-2 text-xs font-mono text-neutral-400">
            <span className="text-amber-400 font-semibold">Plataforma Modular</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">Rubén Darío Rincón Montoya</span>
          </div>
        )}
      </div>
    );
  }

  // 3. HORIZONTAL VARIANT: (Emblem on left + 3D wordmark on right) for Header / Footer
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${horizontalSizes[size]} ${className}`}>
        {/* Emblem */}
        <div className="h-full aspect-square shrink-0 flex items-center justify-center">
          {renderEmblem('w-full h-full')}
        </div>

        {/* 3D Wordmark */}
        <div className="h-full flex flex-col justify-center">
          <svg viewBox="0 0 540 130" className="h-[75%] w-auto overflow-visible select-none">
            <defs>
              <linearGradient id={`${uid}-h-blue`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="40%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>

              <linearGradient id={`${uid}-h-orange`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="40%" stopColor="#FB923C" />
                <stop offset="100%" stopColor="#EA580C" />
              </linearGradient>

              <filter id={`${uid}-h-shadow`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="1" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
              </filter>
            </defs>

            <g filter={is3D ? `url(#${uid}-h-shadow)` : undefined}>
              {/* 3D Extrusion Depth */}
              <text
                x="0"
                y="94"
                className="font-black tracking-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                  fontSize: '88px',
                  fontWeight: 900
                }}
              >
                <tspan fill="#0F172A">espatodo</tspan>
                <tspan fill="#7C2D12">.com</tspan>
              </text>

              {/* Front Face */}
              <text
                x="0"
                y="90"
                className="font-black tracking-tight"
                style={{
                  fontFamily: "'Plus Jakarta Sans', 'Cabinet Grotesk', system-ui, sans-serif",
                  fontSize: '88px',
                  fontWeight: 900
                }}
              >
                <tspan fill={`url(#${uid}-h-blue)`}>espatodo</tspan>
                <tspan fill={`url(#${uid}-h-orange)`}>.com</tspan>
              </text>
            </g>
          </svg>

          {showSubtitle && (
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 leading-none">
              <span className="text-amber-400 font-semibold">Plataforma Modular</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-400 truncate">Rubén Darío Rincón M.</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // 4. ICON ONLY
  return (
    <div className={`inline-flex items-center justify-center select-none ${emblemSizes[size]} ${className}`}>
      {renderEmblem('w-full h-full')}
    </div>
  );
};
