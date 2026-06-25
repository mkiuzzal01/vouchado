interface Props {
  size?: number;
  color?: string;
}

export default function Promotion({ size = 36, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
    >
      <path
        d="M9.13467 19.9201H13.7697V30.7201C13.7697 33.2401 15.1347 33.7501 16.7997 31.8601L28.1547 18.9601C29.5497 17.3851 28.9647 16.0801 26.8497 16.0801H22.2147V5.28009C22.2147 2.76009 20.8497 2.25009 19.1847 4.14009L7.82966 17.0401C6.44966 18.6301 7.03467 19.9201 9.13467 19.9201Z"
        stroke={color}
        stroke-width="2"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
