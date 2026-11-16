type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Plane = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...base}>
    <path d="M4 24h36c3 0 5 1 5 2s-2 2-5 2H28l-9 10h-5l5-10H11l-4 5H3l2-7-1-2z" />
    <path d="M19 18l-5-10h5l9 10" />
  </svg>
);

export const Sign = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...base}>
    <circle cx="13" cy="9" r="4" />
    <path d="M7 44V24c0-4 2-7 6-7h4l6 4" />
    <path d="M13 44V32" />
    <rect x="21" y="8" width="20" height="14" rx="1" />
    <path d="M25 13h12M25 17h8" />
  </svg>
);

export const Van = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...base}>
    <path d="M4 34V14h26l8 8 6 3v9h-4" />
    <path d="M30 14v10h8" />
    <path d="M18 34h12" />
    <circle cx="12" cy="35" r="4" />
    <circle cx="35" cy="35" r="4" />
  </svg>
);

export const Hotel = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...base}>
    <path d="M6 44h36M10 44V6h18v38M28 18h10v26" />
    <path d="M15 12h3M21 12h3M15 18h3M21 18h3M15 24h3M21 24h3M15 30h3M21 30h3" />
    <path d="M17 44v-7h4v7" />
  </svg>
);

export const People = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...base}>
    <circle cx="17" cy="14" r="6" />
    <circle cx="33" cy="16" r="5" />
    <path d="M5 40c0-8 5-13 12-13s12 5 12 13" />
    <path d="M29 28c1-1 3-1 4-1 6 0 10 4 10 11" />
  </svg>
);

export const Wifi = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...base}>
    <path d="M6 18c10-9 26-9 36 0M12 25c7-6 17-6 24 0M18 32c3-3 9-3 12 0" />
    <circle cx="24" cy="38" r="1.5" fill="currentColor" />
  </svg>
);

export const Headset = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...base}>
    <path d="M8 28v-4a16 16 0 0132 0v4" />
    <rect x="6" y="27" width="7" height="11" rx="2" />
    <rect x="35" y="27" width="7" height="11" rx="2" />
    <path d="M38 38c0 4-4 6-10 6h-3" />
  </svg>
);

export const Clock = ({ className }: P) => (
  <svg viewBox="0 0 48 48" className={className} {...base}>
    <circle cx="24" cy="24" r="17" />
    <path d="M24 14v10l7 5" />
  </svg>
);

export const stepIcons = { plane: Plane, sign: Sign, van: Van, hotel: Hotel };

/* Силуэты машин в стиле макета */
export const VehicleVito = ({ className }: P) => (
  <svg viewBox="0 0 330 120" className={className}>
    <path
      d="M6 92V20c0-6 3-9 10-9h176c10 0 18 4 26 10l50 34c18 3 52 10 54 24v13c0 3-2 5-5 5H6z"
      fill="#1b2e4b" stroke="#b8935a" strokeWidth="3"
    />
    <g fill="#223553" stroke="#b8935a" strokeWidth="3">
      <rect x="32" y="26" width="68" height="28" />
      <rect x="112" y="26" width="68" height="28" />
      <path d="M194 26h20l50 28h-70z" />
    </g>
    <g fill="#0f1a2b" stroke="#b8935a" strokeWidth="3">
      <circle cx="74" cy="98" r="18" /><circle cx="74" cy="98" r="6" />
      <circle cx="270" cy="98" r="18" /><circle cx="270" cy="98" r="6" />
    </g>
  </svg>
);

export const VehicleSprinter = ({ className }: P) => (
  <svg viewBox="0 0 480 200" className={className}>
    <path
      d="M6 166V14c0-5 3-8 8-8h320c12 0 20 6 26 14l44 66c36 8 66 24 68 44v36c0 3-2 5-5 5H6z"
      fill="#1b2e4b" stroke="#b8935a" strokeWidth="3"
    />
    <g fill="#223553" stroke="#b8935a" strokeWidth="3">
      <rect x="28" y="36" width="88" height="44" />
      <rect x="132" y="36" width="88" height="44" />
      <rect x="236" y="36" width="88" height="44" />
      <path d="M340 36h28l30 44h-58z" />
    </g>
    <g fill="#0f1a2b" stroke="#b8935a" strokeWidth="3">
      <circle cx="98" cy="170" r="25" /><circle cx="98" cy="170" r="9" />
      <circle cx="400" cy="170" r="25" /><circle cx="400" cy="170" r="9" />
    </g>
  </svg>
);

export const VehicleBus = ({ className }: P) => (
  <svg viewBox="0 0 770 250" className={className}>
    <path
      d="M6 216V20c0-8 5-14 14-14h710c10 0 16 6 17 14l10 186c0 6-3 10-9 10H6z"
      fill="#1b2e4b" stroke="#b8935a" strokeWidth="3"
    />
    <g fill="#223553" stroke="#b8935a" strokeWidth="3">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={30 + i * 87} y="38" width="72" height="66" />
      ))}
      <path d="M660 32h82l4 92h-86z" />
    </g>
    <path d="M30 156h600M668 146v68M702 146v68" stroke="#b8935a" strokeWidth="3" />
    <g fill="#0f1a2b" stroke="#b8935a" strokeWidth="3">
      <circle cx="130" cy="218" r="28" /><circle cx="130" cy="218" r="10" />
      <circle cx="598" cy="218" r="28" /><circle cx="598" cy="218" r="10" />
    </g>
  </svg>
);

export const vehicleArt = { vito: VehicleVito, sprinter: VehicleSprinter, bus: VehicleBus };

/* Иконки мессенджеров */
export const WhatsAppIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-.7-.3-1.5-.7-2.2-1.4-.6-.5-1-1.2-1.2-1.5-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3z" />
  </svg>
);

export const TelegramIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M21.9 4.3l-3.2 15c-.2 1-.9 1.3-1.7.8l-4.8-3.5-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2l-11 6.9-4.7-1.5c-1-.3-1-1 .2-1.5L20.5 3c.9-.3 1.6.2 1.4 1.3z" />
  </svg>
);

export const MaxIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <path d="M7.5 15.5v-7l4.5 5 4.5-5v7" strokeLinejoin="round" />
  </svg>
);

export const MailIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5L12 13l8.5-6.5" />
  </svg>
);

export const VkIcon =({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12.8 17.5C6.6 17.5 3.1 13.3 3 6.3h3.1c.1 5.1 2.4 7.3 4.2 7.7V6.3h2.9v4.4c1.8-.2 3.7-2.2 4.3-4.4h2.9c-.5 2.7-2.5 4.7-3.9 5.5 1.4.7 3.7 2.4 4.5 5.6h-3.2c-.7-2.1-2.4-3.8-4.6-4v4h-.4z" />
  </svg>
);
