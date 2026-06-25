interface Props {
  size?: number;
  color?: string;
}

export default function Curated({ size = 33, color = "#2DAEB6" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 33 33"
      fill="none"
    >
      <path
        d="M20.2507 25.6979C20.1905 25.8411 20.1161 25.9718 20.0293 26.0867C19.3649 26.9684 18.1903 26.9472 17.0193 26.1874L12.6698 23.3619M0.75 29.7552H6.25637C6.74887 29.7552 7.15281 29.3523 7.15281 28.8611V24.8161M7.15281 25.6567V18.5871C7.15281 18.0959 6.74887 17.693 6.25637 17.693H0.75"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.15234 28.0356C9.51928 28.0356 9.90553 28.2813 12.8394 30.0607C15.8371 31.8755 17.18 31.8454 19.958 30.5537L30.3081 25.7384C32.9603 24.5049 31.8565 21.1687 28.9297 22.3102L20.2503 25.6977C20.7747 24.4536 20.2999 22.2696 18.6593 21.1951L17.0666 20.1508C14.9442 18.7601 12.0439 17.7422 9.40766 18.7583L7.15234 19.6278"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M22.0578 6.91901V11.8774C22.0578 12.1036 21.87 12.2909 21.6432 12.2909H18.7075C18.479 12.2909 18.293 12.1054 18.293 11.8774V6.91901"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.4922 18.4528L10.4922 8.41907C10.4922 7.59064 11.1638 6.91907 11.9922 6.91907H28.4002C29.1992 6.91907 29.8548 7.57288 29.8548 8.36982V13.7171M29.8282 12.9754L29.8548 22.086M24.1854 18.4476H26.9864M24.1854 20.3401H26.9864"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
