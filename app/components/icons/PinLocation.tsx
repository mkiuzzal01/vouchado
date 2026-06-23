interface Props {
  size?: number;
  color?: string;
}

export default function PinLocation({ size = 16, color = "#212B36" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 15"
      fill="none"
    >
      <path
        d="M9.85788 2.0325L14.4329 10.725C15.5204 12.7875 13.3229 15.03 11.2379 13.9875L8.80788 12.7725C8.13288 12.435 7.33788 12.435 6.66288 12.7725L4.23288 13.9875C2.14788 15.03 -0.042122 12.7875 1.03788 10.725L5.61288 2.0325C6.51288 0.3225 8.95788 0.3225 9.85788 2.0325Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
