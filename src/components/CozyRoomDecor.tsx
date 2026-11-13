import React from 'react';

export const CozyRoomDecor: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Warm cozy brown home wall base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 65% at 50% 35%, #8D5F40 0%, #734A2F 48%, #4F301C 86%, #361E10 100%)',
        }}
      />

      {/* Cozy vintage home wallpaper pattern (subtle vertical stripes + diamond damask) */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(28,12,4,0.65) 0px, rgba(28,12,4,0.65) 2px, transparent 2px, transparent 44px),
            radial-gradient(circle at 22px 22px, rgba(255,215,175,0.45) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Ceiling crown molding at top */}
      <div
        className="absolute top-0 inset-x-0 h-4 sm:h-5 border-b-2 border-[#251207]"
        style={{
          background: 'linear-gradient(180deg, #3D2111 0%, #59331B 65%, #3A1F0F 100%)',
          boxShadow: '0 4px 12px rgba(15, 6, 2, 0.4)',
        }}
      />

      {/* Lower wooden wainscoting / wall paneling (home interior feel) */}
      <div
        className="absolute bottom-[20%] inset-x-0 h-[18%] border-t-[3px] border-[#381E0E]"
        style={{
          background:
            'linear-gradient(180deg, #62391F 0%, #522E18 18%, #472714 100%)',
          boxShadow: 'inset 0 3px 6px rgba(255,214,170,0.12), 0 -2px 6px rgba(15,6,2,0.28)',
        }}
      >
        {/* Wainscot recessed wooden panels */}
        <div className="w-full h-full flex justify-around items-center px-3 sm:px-8 gap-3 sm:gap-6 opacity-65">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-[70%] rounded-[3px] border-2 border-[#2E180B] bg-[#4A2915]/55 shadow-[inset_0_2px_5px_rgba(0,0,0,0.4),0_1px_0_rgba(255,215,170,0.1)]"
            />
          ))}
        </div>
      </div>

      {/* Warm home window on the left wall (soft curtain + evening sky + warm room sunlight) */}
      <div className="absolute top-[10%] -left-8 sm:left-3 md:left-7 w-32 sm:w-44 md:w-52 opacity-90">
        {/* Soft sunlight beam coming from window */}
        <div
          className="hidden sm:block absolute top-6 left-10 w-64 h-80 -rotate-12 pointer-events-none"
          style={{
            background:
              'linear-gradient(115deg, rgba(255,224,160,0.14) 0%, rgba(255,210,140,0.03) 65%, transparent 100%)',
          }}
        />
        <svg
          viewBox="0 0 220 280"
          className="w-full h-auto drop-shadow-[6px_10px_18px_rgba(15,6,2,0.5)]"
          fill="none"
        >
          {/* Window outside twilight/warm dusk sky */}
          <rect x="26" y="24" width="168" height="218" rx="4" fill="#3B536E" stroke="#281408" strokeWidth="4" />
          <path d="M28 175 C65 162, 115 168, 192 152 L192 240 L28 240 Z" fill="#2A3D52" />
          {/* Distant house roofs & moon */}
          <path d="M40 240 L40 198 L68 178 L96 198 L96 240 Z" fill="#212F3F" />
          <rect x="60" y="206" width="14" height="16" rx="1" fill="#F9CE73" opacity="0.85" />
          <circle cx="152" cy="70" r="16" fill="#FCE8B2" opacity="0.9" />

          {/* Wooden window muntins (crossbars) */}
          <line x1="110" y1="24" x2="110" y2="242" stroke="#5A341C" strokeWidth="7" />
          <line x1="26" y1="126" x2="194" y2="126" stroke="#5A341C" strokeWidth="7" />
          <rect x="22" y="20" width="176" height="224" rx="4" stroke="#5A341C" strokeWidth="9" />
          {/* Window sill */}
          <rect x="12" y="240" width="196" height="14" rx="3" fill="#6D4023" stroke="#281408" strokeWidth="3" />
          {/* Cute little flower pot on windowsill */}
          <path d="M88 220 H114 L110 240 H92 Z" fill="#B55B38" stroke="#281408" strokeWidth="2" />
          <circle cx="96" cy="212" r="7" fill="#5D8C3F" stroke="#213614" strokeWidth="1.8" />
          <circle cx="106" cy="213" r="6" fill="#6EA14C" stroke="#213614" strokeWidth="1.8" />
          <circle cx="101" cy="206" r="4" fill="#E86452" />

          {/* Curtain rod */}
          <line x1="6" y1="14" x2="214" y2="14" stroke="#361C0D" strokeWidth="6" strokeLinecap="round" />
          <circle cx="6" cy="14" r="5" fill="#C48F4B" stroke="#281408" strokeWidth="2" />
          <circle cx="214" cy="14" r="5" fill="#C48F4B" stroke="#281408" strokeWidth="2" />

          {/* Cozy beige-ochre curtains */}
          <path d="M16 16 C36 22, 46 80, 34 150 C28 190, 42 232, 44 260 L14 260 Z" fill="#BA8654" stroke="#381E0E" strokeWidth="2.5" />
          <path d="M204 16 C184 22, 174 80, 186 150 C192 190, 178 232, 176 260 L206 260 Z" fill="#BA8654" stroke="#381E0E" strokeWidth="2.5" />
          <path d="M22 22 C30 95, 22 175, 24 255" stroke="#9E6C3F" strokeWidth="2" />
          <path d="M198 22 C190 95, 198 175, 196 255" stroke="#9E6C3F" strokeWidth="2" />
        </svg>
      </div>

      {/* Warm overhead lamp glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[110vw] max-w-[920px] h-[78vh] animate-lamp"
        style={{
          background:
            'radial-gradient(ellipse 56% 66% at 50% 6%, rgba(255, 218, 148, 0.25) 0%, rgba(255, 194, 114, 0.08) 50%, transparent 80%)',
        }}
      />

      {/* Cozy home hanging pendant lampshade at top-center/right */}
      <svg
        viewBox="0 0 180 115"
        className="absolute top-2 right-10 sm:right-24 w-24 sm:w-32 h-auto opacity-95 drop-shadow-[0_12px_18px_rgba(20,8,2,0.5)]"
        fill="none"
      >
        <line x1="90" y1="0" x2="90" y2="30" stroke="#241309" strokeWidth="4" />
        <ellipse cx="90" cy="80" rx="48" ry="22" fill="#FFD98E" opacity="0.24" />
        <path
          d="M54 30H126L148 74H32L54 30Z"
          fill="#D49556"
          stroke="#2E170A"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M40 66H140" stroke="#945926" strokeWidth="2.5" />
        <ellipse cx="90" cy="76" rx="14" ry="8" fill="#FFF2C7" />
      </svg>

      {/* Home Wooden Bookshelf & Family Decor on the Right Wall (sm+) */}
      <svg
        viewBox="0 0 210 340"
        className="hidden sm:block absolute bottom-[15%] right-1 md:right-6 w-32 md:w-44 lg:w-48 h-auto drop-shadow-[-6px_10px_18px_rgba(15,6,2,0.55)]"
        fill="none"
      >
        {/* Tall wooden bookcase */}
        <rect x="24" y="20" width="162" height="292" rx="5" fill="#59331B" stroke="#241106" strokeWidth="3.5" />
        <rect x="34" y="34" width="142" height="78" fill="#3D2211" stroke="#241106" strokeWidth="2" />
        <rect x="34" y="124" width="142" height="82" fill="#3D2211" stroke="#241106" strokeWidth="2" />
        <rect x="34" y="218" width="142" height="78" fill="#3D2211" stroke="#241106" strokeWidth="2" />

        {/* Top shelf: Retro home clock + small cactus */}
        <circle cx="72" cy="82" r="22" fill="#F2E4CE" stroke="#784726" strokeWidth="4" />
        <line x1="72" y1="82" x2="72" y2="69" stroke="#2B1508" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="72" y1="82" x2="82" y2="85" stroke="#2B1508" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M126 92 H154 L150 112 H130 Z" fill="#B55B38" stroke="#241106" strokeWidth="2" />
        <path d="M136 92 C133 74, 146 74, 144 92" fill="#598A3D" stroke="#203613" strokeWidth="2" />

        {/* Middle shelf: Books + warm mug */}
        <rect x="44" y="150" width="16" height="56" rx="2" fill="#9E3B2B" stroke="#241106" strokeWidth="2" />
        <rect x="61" y="156" width="14" height="50" rx="2" fill="#466B48" stroke="#241106" strokeWidth="2" />
        <rect x="76" y="146" width="18" height="60" rx="2" fill="#C4883B" stroke="#241106" strokeWidth="2" />
        <rect x="96" y="160" width="15" height="46" rx="2" fill="#4B5F7A" transform="rotate(-8 96 206)" stroke="#241106" strokeWidth="2" />
        <path d="M132 182 H156 V202 C156 205 152 206 144 206 C136 206 132 205 132 202 Z" fill="#EFE2CE" stroke="#241106" strokeWidth="2" />

        {/* Bottom shelf: Ceramic vase + folded blankets */}
        <rect x="44" y="274" width="64" height="20" rx="4" fill="#8C4B32" stroke="#241106" strokeWidth="2" />
        <rect x="48" y="256" width="56" height="18" rx="4" fill="#C2915E" stroke="#241106" strokeWidth="2" />
        <path d="M138 250 C128 262, 126 286, 134 296 H156 C164 286, 162 262, 152 250 Z" fill="#5E7A82" stroke="#241106" strokeWidth="2.2" />
      </svg>

      {/* Cozy Wooden Baseboard & Living-Room Floorboards (bottom 21%) */}
      <div className="absolute bottom-0 inset-x-0 h-[21%] min-h-[115px] max-h-[205px]">
        {/* Baseboard molding */}
        <div
          className="w-full h-5 sm:h-6 border-t-2 border-b-2 border-[#231208]"
          style={{
            background: 'linear-gradient(180deg, #5E381F 0%, #3F2211 100%)',
            boxShadow: '0 4px 12px rgba(15, 6, 2, 0.45)',
          }}
        />
        {/* Oak floorboards */}
        <div
          className="w-full h-full relative"
          style={{
            background:
              'linear-gradient(180deg, #4B2B17 0%, #613920 28%, #472814 100%)',
          }}
        >
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="w-full h-full opacity-45"
          >
            <line x1="0" y1="36" x2="1200" y2="36" stroke="#241106" strokeWidth="2" />
            <line x1="0" y1="78" x2="1200" y2="78" stroke="#241106" strokeWidth="2" />
            <line x1="0" y1="128" x2="1200" y2="128" stroke="#241106" strokeWidth="2.5" />
            <line x1="180" y1="0" x2="90" y2="200" stroke="#241106" strokeWidth="2" />
            <line x1="410" y1="0" x2="365" y2="200" stroke="#241106" strokeWidth="2" />
            <line x1="650" y1="0" x2="660" y2="200" stroke="#241106" strokeWidth="2" />
            <line x1="900" y1="0" x2="960" y2="200" stroke="#241106" strokeWidth="2" />
            <line x1="1110" y1="0" x2="1190" y2="200" stroke="#241106" strokeWidth="2" />
          </svg>

          {/* Cozy patterned home living-room carpet */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[84%] max-w-[700px] h-[58%] rounded-t-[28px] border-t-4 border-x-4 border-[#995335]"
            style={{
              background:
                'repeating-linear-gradient(90deg, #7B3B22 0px, #7B3B22 18px, #68301B 18px, #68301B 36px)',
              boxShadow: 'inset 0 8px 20px rgba(0,0,0,0.38)',
            }}
          >
            <div className="w-full h-2.5 mt-2 border-y border-[#CFA06A]/35" />
          </div>
        </div>
      </div>

      {/* Cozy Armchair + Throw Pillow + Plant on Left Floor (sm+) */}
      <svg
        viewBox="0 0 220 220"
        className="hidden sm:block absolute bottom-[8%] -left-4 md:left-3 w-36 md:w-48 h-auto drop-shadow-[6px_10px_14px_rgba(15,6,2,0.55)]"
        fill="none"
      >
        {/* Cozy armchair silhouette */}
        <path
          d="M28 84 C28 64, 52 56, 95 56 C138 56, 158 66, 158 88 L158 148 L28 148 Z"
          fill="#7D4127"
          stroke="#281308"
          strokeWidth="3.5"
        />
        {/* Cushion & throw pillow */}
        <rect x="44" y="108" width="102" height="44" rx="12" fill="#914D2F" stroke="#281308" strokeWidth="3" />
        <rect
          x="52"
          y="78"
          width="42"
          height="36"
          rx="8"
          transform="rotate(-8 52 78)"
          fill="#D4A36A"
          stroke="#281308"
          strokeWidth="2.5"
        />
        {/* Armrests */}
        <rect x="16" y="100" width="32" height="58" rx="12" fill="#6E3820" stroke="#281308" strokeWidth="3.5" />
        <rect x="136" y="102" width="34" height="56" rx="12" fill="#6E3820" stroke="#281308" strokeWidth="3.5" />
        {/* Wooden legs */}
        <rect x="28" y="158" width="12" height="22" rx="3" fill="#3B1E0E" stroke="#1E0D05" strokeWidth="2" />
        <rect x="142" y="158" width="12" height="22" rx="3" fill="#3B1E0E" stroke="#1E0D05" strokeWidth="2" />

        {/* Small cozy potted plant next to armchair */}
        <path d="M174 128 C164 102, 154 96, 146 102 C154 114, 164 122, 174 128 Z" fill="#4D7836" stroke="#1D3013" strokeWidth="2" />
        <path d="M176 126 C174 96, 180 78, 190 74 C192 92, 186 112, 176 126 Z" fill="#5D8F42" stroke="#1D3013" strokeWidth="2" />
        <path d="M178 128 C190 108, 204 104, 212 112 C202 122, 190 126, 178 128 Z" fill="#43692E" stroke="#1D3013" strokeWidth="2" />
        <path d="M158 128 H196 L190 176 H164 Z" fill="#B05835" stroke="#281308" strokeWidth="2.8" />
        <rect x="155" y="122" width="44" height="9" rx="3" fill="#C4643E" stroke="#281308" strokeWidth="2.5" />
      </svg>

      {/* Cozy warm vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, transparent 50%, rgba(18, 7, 2, 0.52) 100%)',
        }}
      />
    </div>
  );
};
