interface Props {
  size?: number;
  color?: string;
}

export default function CardLocation({ size = 16, color = "#637381" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="19"
      viewBox="0 0 16 19"
      fill="none"
    >
      <path
        d="M0.95425 6.15834C2.59592 -1.05833 13.2876 -1.05 14.9209 6.16667C15.8793 10.4 13.2459 13.9833 10.9376 16.2C9.26258 17.8167 6.61258 17.8167 4.92925 16.2C2.62925 13.9833 -0.00408365 10.3917 0.95425 6.15834Z"
        stroke="#637381"
        stroke-width="1.5"
      />
    </svg>
  );
}
