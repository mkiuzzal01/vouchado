interface Props {
  color?: string;
  size?: number;
}

export default function CreateGiftVoucherIcon({
  color = "#637381",
  size = 22,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M18.3053 9.16699H3.63867V16.5003C3.63867 19.2503 4.55534 20.167 7.30534 20.167H14.6387C17.3887 20.167 18.3053 19.2503 18.3053 16.5003V9.16699Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.7077 6.41634V7.33301C19.7077 8.34134 19.2218 9.16634 17.8743 9.16634H4.12435C2.72185 9.16634 2.29102 8.34134 2.29102 7.33301V6.41634C2.29102 5.40801 2.72185 4.58301 4.12435 4.58301H17.8743C19.2218 4.58301 19.7077 5.40801 19.7077 6.41634Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10.6699 4.58365H5.60988C5.29822 4.24448 5.30738 3.72198 5.63738 3.39198L6.93905 2.09031C7.27822 1.75115 7.83738 1.75115 8.17655 2.09031L10.6699 4.58365Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.3803 4.58365H11.3203L13.8136 2.09031C14.1528 1.75115 14.712 1.75115 15.0511 2.09031L16.3528 3.39198C16.6828 3.72198 16.692 4.24448 16.3803 4.58365Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.19531 9.16699V13.8787C8.19531 14.612 9.00198 15.0428 9.61615 14.6487L10.4778 14.0803C10.7895 13.8787 11.1836 13.8787 11.4861 14.0803L12.302 14.6303C12.907 15.0337 13.7228 14.6028 13.7228 13.8695V9.16699H8.19531Z"
        stroke={color}
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
