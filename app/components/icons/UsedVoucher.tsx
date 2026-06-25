interface Props {
  color?: string;
  size?: number;
}

export default function UsedVoucher({ size = 32, color = "#2DAEB6" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M33.0494 25.5001L25.4994 33.0501C22.3994 36.1501 17.366 36.1501 14.2494 33.0501L6.9327 25.7334C3.8327 22.6334 3.8327 17.6001 6.9327 14.4834L14.4994 6.95008C16.0827 5.36675 18.266 4.51675 20.4994 4.63341L28.8327 5.03341C32.166 5.18341 34.816 7.83341 34.9827 11.1501L35.3827 19.4834C35.4827 21.7334 34.6327 23.9167 33.0494 25.5001Z"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M24.1673 20.0001C21.8661 20.0001 20.0007 18.1346 20.0007 15.8334C20.0007 13.5322 21.8661 11.6667 24.1673 11.6667C26.4685 11.6667 28.334 13.5322 28.334 15.8334C28.334 18.1346 26.4685 20.0001 24.1673 20.0001Z"
        stroke={color}
        stroke-width="2.5"
        stroke-linecap="round"
      />
    </svg>
  );
}
