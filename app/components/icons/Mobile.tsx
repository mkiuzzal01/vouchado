interface Props {
  size?: number;
  color?: string;
}

export default function Mobile({ size = 22, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17 26"
      fill="none"
    >
      <path
        d="M10.0938 2.16666H6.90625C4.40192 2.16666 3.14975 2.16666 2.37174 2.95991C1.59375 3.75317 1.59375 5.02989 1.59375 7.58333V18.4167C1.59375 20.9701 1.59375 22.2468 2.37174 23.0401C3.14975 23.8333 4.40192 23.8333 6.90625 23.8333H10.0938C12.5981 23.8333 13.8502 23.8333 14.6283 23.0401C15.4062 22.2468 15.4062 20.9701 15.4062 18.4167V7.58333C15.4062 5.02989 15.4062 3.75317 14.6283 2.95991C13.8502 2.16666 12.5981 2.16666 10.0938 2.16666Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.625 2.16666H6.375L6.90625 3.46666H10.0938L10.625 2.16666Z"
        stroke="#2DAEB6"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
