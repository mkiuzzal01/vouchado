interface Props {
  color?: string;
  size?: number;
}

export default function ProtectedRedeem({
  color = "#31BFC8",
  size = 32,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M2.66797 12.0001V8.66675C2.66797 5.34675 5.34797 2.66675 8.66797 2.66675H12.0013"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 2.66675H23.3333C26.6533 2.66675 29.3333 5.34675 29.3333 8.66675V12.0001"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.332 21.3333V23.3333C29.332 26.6533 26.652 29.3333 23.332 29.3333H21.332"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.0013 29.3333H8.66797C5.34797 29.3333 2.66797 26.6533 2.66797 23.3333V20"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.9987 9.33325V11.9999C13.9987 13.3333 13.332 13.9999 11.9987 13.9999H9.33203C7.9987 13.9999 7.33203 13.3333 7.33203 11.9999V9.33325C7.33203 7.99992 7.9987 7.33325 9.33203 7.33325H11.9987C13.332 7.33325 13.9987 7.99992 13.9987 9.33325Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.6667 9.33325V11.9999C24.6667 13.3333 24 13.9999 22.6667 13.9999H20C18.6667 13.9999 18 13.3333 18 11.9999V9.33325C18 7.99992 18.6667 7.33325 20 7.33325H22.6667C24 7.33325 24.6667 7.99992 24.6667 9.33325Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.9987 20V22.6667C13.9987 24 13.332 24.6667 11.9987 24.6667H9.33203C7.9987 24.6667 7.33203 24 7.33203 22.6667V20C7.33203 18.6667 7.9987 18 9.33203 18H11.9987C13.332 18 13.9987 18.6667 13.9987 20Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.6667 20V22.6667C24.6667 24 24 24.6667 22.6667 24.6667H20C18.6667 24.6667 18 24 18 22.6667V20C18 18.6667 18.6667 18 20 18H22.6667C24 18 24.6667 18.6667 24.6667 20Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
