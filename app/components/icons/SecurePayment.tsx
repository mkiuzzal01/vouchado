interface Props {
  size?: number;
  color?: string;
}

export default function SecurePayment({ size = 24, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M24.9451 4.66017C22.422 3.40481 19.3345 2.66638 16 2.66638C12.6655 2.66638 9.578 3.40481 7.05488 4.66017C5.81757 5.2758 5.19892 5.58361 4.59947 6.55142C4 7.51925 4 8.45635 4 10.3306V14.9825C4 22.5604 10.0565 26.7736 13.564 28.5781C14.5423 29.0814 15.0313 29.333 16 29.333C16.9687 29.333 17.4577 29.0814 18.4359 28.5781C21.9435 26.7736 28 22.5604 28 14.9825V10.3306C28 8.45637 28 7.51926 27.4005 6.55142C26.8011 5.5836 26.1824 5.2758 24.9451 4.66017Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20 14.6664C20 16.8754 18.2092 18.6664 16 18.6664C13.7908 18.6664 12 16.8754 12 14.6664C12 12.4572 13.7908 10.6664 16 10.6664C18.2092 10.6664 20 12.4572 20 14.6664Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
