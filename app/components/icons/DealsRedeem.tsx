interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export default function DealsRedeem({
  size = 30,
  color = "#31BFC8",
  className,
}: Props) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
    >
      <path
        d="M36.6126 18.333H7.2793V32.9997C7.2793 38.4997 9.11263 40.333 14.6126 40.333H29.2793C34.7793 40.333 36.6126 38.4997 36.6126 32.9997V18.333Z"
        stroke={color}
        strokeWidth={3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M39.4173 12.8337V14.667C39.4173 16.6837 38.4456 18.3337 35.7506 18.3337H8.25065C5.44565 18.3337 4.58398 16.6837 4.58398 14.667V12.8337C4.58398 10.817 5.44565 9.16699 8.25065 9.16699H35.7506C38.4456 9.16699 39.4173 10.817 39.4173 12.8337Z"
        stroke={color}
        strokeWidth={3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3398 9.16632H11.2198C10.5964 8.48798 10.6148 7.44298 11.2748 6.78298L13.8781 4.17965C14.5564 3.50132 15.6748 3.50132 16.3531 4.17965L21.3398 9.16632Z"
        stroke={color}
        strokeWidth={3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M32.7626 9.16632H22.6426L27.6292 4.17965C28.3076 3.50132 29.4259 3.50132 30.1042 4.17965L32.7076 6.78298C33.3676 7.44298 33.3859 8.48798 32.7626 9.16632Z"
        stroke={color}
        strokeWidth={3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.3906 18.333V27.7563C16.3906 29.223 18.004 30.0847 19.2323 29.2963L20.9556 28.1597C21.579 27.7563 22.3673 27.7563 22.9723 28.1597L24.604 29.2597C25.814 30.0663 27.4456 29.2047 27.4456 27.738V18.333H16.3906Z"
        stroke={color}
        strokeWidth={3}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
