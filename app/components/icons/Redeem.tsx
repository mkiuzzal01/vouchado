interface Props {
  color?: string;
  size?: number;
}

export default function Redeem({ color = "#31BFC8", size = 40 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17 29"
      fill="none"
    >
      <path
        d="M15.9893 22.4505V27.4505H11.3726C8.90594 27.4505 7.45594 25.7672 5.85594 21.9005L5.55594 21.1505C7.57261 20.3505 8.55594 18.0172 7.70594 16.0005C6.88928 13.9838 4.57261 13.0172 2.53928 13.8505L2.25594 13.1338C-0.144058 7.26715 0.689275 5.21716 6.55594 2.80049L10.9559 1.00049L15.9893 13.2005V17.4505"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
