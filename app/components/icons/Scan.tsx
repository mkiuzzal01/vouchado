interface ScanProps {
  size?: number;
  color?: string;
}

export default function Scan({ size = 15, color = "#31BFC8" }: ScanProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M1.83398 8.24967V5.95801C1.83398 3.67551 3.67648 1.83301 5.95898 1.83301H8.25065"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.75 1.83301H16.0417C18.3242 1.83301 20.1667 3.67551 20.1667 5.95801V8.24967"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.166 14.667V16.042C20.166 18.3245 18.3235 20.167 16.041 20.167H14.666"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.25065 20.1667H5.95898C3.67648 20.1667 1.83398 18.3242 1.83398 16.0417V13.75"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.5827 8.70801V13.2913C15.5827 15.1247 14.666 16.0413 12.8327 16.0413H9.16602C7.33268 16.0413 6.41602 15.1247 6.41602 13.2913V8.70801C6.41602 6.87467 7.33268 5.95801 9.16602 5.95801H12.8327"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17.4173 11H4.58398"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
