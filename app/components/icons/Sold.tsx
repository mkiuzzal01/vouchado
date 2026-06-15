interface Props {
  color?: string;
  size?: number;
}

export default function Sold({ color = "#31BFC8", size = 40 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M35 11.6667V20M5 11.6667C5 16.7742 5 27.957 5 28.6022C5 30.9063 8.24273 32.2762 14.7282 35.0158C17.3337 36.1163 18.6363 36.6667 20 36.6667V18.9247"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M25 31.6667C25 31.6667 26.4583 31.6667 27.9167 35C27.9167 35 32.549 26.6667 36.6667 25"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M13.8765 16.1523L9.00787 13.7964C6.33595 12.5035 5 11.8571 5 10.8333C5 9.80963 6.33595 9.16318 9.00787 7.87026L13.8765 5.51438C16.8813 4.06036 18.3838 3.33334 20 3.33334C21.6162 3.33334 23.1187 4.06034 26.1235 5.51438L30.9922 7.87026C33.664 9.16318 35 9.80963 35 10.8333C35 11.8571 33.664 12.5035 30.9922 13.7964L26.1235 16.1523C23.1187 17.6063 21.6162 18.3333 20 18.3333C18.3838 18.3333 16.8813 17.6063 13.8765 16.1523Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M10 20L13.3333 21.6667"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M28.3327 6.66666L11.666 15"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
