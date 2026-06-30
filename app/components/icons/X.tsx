interface Props {
  size?: number;
  color?: string;
}

export default function X({ size = 12, color = "white" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
    >
      <g clip-path="url(#clip0_15899_6741)">
        <path
          d="M7.14163 5.08118L11.6089 0H10.5503L6.67137 4.41192L3.57328 0H0L4.68492 6.6716L0 12H1.05866L5.15491 7.34087L8.4267 12H12L7.14137 5.08118H7.14163ZM5.69165 6.73038L5.21697 6.06604L1.44011 0.779805H3.06615L6.11412 5.04596L6.5888 5.71031L10.5508 11.2556H8.92478L5.69165 6.73064V6.73038Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_15899_6741">
          <rect width={size} height={size} fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}
