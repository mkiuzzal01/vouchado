interface Props {
  size?: number;
  color?: string;
}

export default function TimeBased({ size = 36, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M31.125 19.875C31.125 27.12 25.245 33 18 33C10.755 33 4.875 27.12 4.875 19.875C4.875 12.63 10.755 6.75 18 6.75C25.245 6.75 31.125 12.63 31.125 19.875Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M18 12V19.5"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.5 3H22.5"
        stroke={color}
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
