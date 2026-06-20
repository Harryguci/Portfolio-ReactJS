const iconProps = {
  width: 56,
  height: 56,
  viewBox: "0 0 56 56",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
};

export function FinderIcon() {
  return (
    <svg {...iconProps}>
      <defs>
        <linearGradient id="finder-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8ecbff" />
          <stop offset="100%" stopColor="#1b9bff" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill="url(#finder-bg)" />
      <rect x="1" y="1" width="54" height="54" rx="12" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <path
        d="M18 34c2.5 4 6 6 10 6s7.5-2 10-6"
        stroke="#fff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <ellipse cx="22" cy="24" rx="2.5" ry="3.5" fill="#fff" />
      <ellipse cx="34" cy="24" rx="2.5" ry="3.5" fill="#fff" />
      <path
        d="M22 20c1.5-2 3-3 6-3s4.5 1 6 3"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ContactsIcon() {
  return (
    <svg {...iconProps}>
      <defs>
        <linearGradient id="contacts-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fefefe" />
          <stop offset="100%" stopColor="#c8c8cc" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill="url(#contacts-bg)" />
      <rect x="10" y="8" width="36" height="40" rx="4" fill="#fff" stroke="#d1d1d6" strokeWidth="1" />
      <circle cx="28" cy="22" r="7" fill="#b0b0b5" />
      <path
        d="M17 38c1.5-5 6-8 11-8s9.5 3 11 8"
        fill="#b0b0b5"
      />
      <rect x="14" y="12" width="8" height="2" rx="1" fill="#e5e5ea" />
      <rect x="14" y="16" width="12" height="2" rx="1" fill="#e5e5ea" />
    </svg>
  );
}

export function FolderIcon() {
  return (
    <svg {...iconProps}>
      <defs>
        <linearGradient id="folder-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ec8ff" />
          <stop offset="100%" stopColor="#007aff" />
        </linearGradient>
        <linearGradient id="folder-tab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a8d8ff" />
          <stop offset="100%" stopColor="#4da3ff" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill="url(#folder-bg)" />
      <path
        d="M12 18h14l3 3h15v23a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V18z"
        fill="url(#folder-tab)"
      />
      <path
        d="M12 21h32v20a3 3 0 0 1-3 3H15a3 3 0 0 1-3-3V21z"
        fill="#fff"
        fillOpacity="0.92"
      />
    </svg>
  );
}

export function SettingsIcon() {
  return (
    <svg {...iconProps}>
      <defs>
        <linearGradient id="settings-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8e8e93" />
          <stop offset="100%" stopColor="#636366" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill="url(#settings-bg)" />
      <circle cx="28" cy="28" r="14" fill="#aeaeb2" stroke="#fff" strokeWidth="2" />
      <circle cx="28" cy="28" r="6" fill="#636366" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="26"
          y="12"
          width="4"
          height="8"
          rx="2"
          fill="#d1d1d6"
          transform={`rotate(${deg} 28 28)`}
        />
      ))}
    </svg>
  );
}

export function NotesIcon() {
  return (
    <svg {...iconProps}>
      <defs>
        <linearGradient id="notes-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe566" />
          <stop offset="100%" stopColor="#ffcc00" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill="url(#notes-bg)" />
      <rect x="14" y="10" width="28" height="36" rx="3" fill="#fff" fillOpacity="0.95" />
      <rect x="18" y="18" width="16" height="2" rx="1" fill="#ffd60a" />
      <rect x="18" y="24" width="20" height="2" rx="1" fill="#e5e5ea" />
      <rect x="18" y="30" width="18" height="2" rx="1" fill="#e5e5ea" />
      <rect x="18" y="36" width="14" height="2" rx="1" fill="#e5e5ea" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg {...iconProps}>
      <defs>
        <linearGradient id="mail-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5ac8fa" />
          <stop offset="100%" stopColor="#007aff" />
        </linearGradient>
      </defs>
      <rect width="56" height="56" rx="13" fill="url(#mail-bg)" />
      <rect x="10" y="16" width="36" height="26" rx="4" fill="#fff" fillOpacity="0.95" />
      <path
        d="M10 18l18 14 18-14"
        stroke="#007aff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 40l12-10M46 40l-12-10"
        stroke="#007aff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const DOCK_ICON_MAP = {
  header: FinderIcon,
  about: ContactsIcon,
  portfolio: FolderIcon,
  services: SettingsIcon,
  experience: NotesIcon,
  "contact-form": MailIcon,
};
