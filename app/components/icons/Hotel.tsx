interface Props {
  size?: number;
  color?: string;
}

export default function Hotel({ size = 32, color = "#454F5B" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M2.66602 27.333H29.3327"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.06906 19.7002C4.69091 19.3058 5.32394 18.7337 5.41488 18.003C6.06983 12.7399 10.5589 8.66699 15.9993 8.66699C21.4397 8.66699 25.9288 12.7399 26.5839 18.003C26.6748 18.7337 27.3077 19.3058 27.9296 19.7002C28.4808 20.0498 28.8809 20.6234 28.9948 21.3065L29.3327 22.667H2.66602L3.00388 21.3065C3.11772 20.6234 3.51787 20.0498 4.06906 19.7002Z"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M15.9993 8.66699V4.66699M15.9993 4.66699H12.666M15.9993 4.66699H19.3327"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M25.3327 7.33301L24.666 8.66634M28.666 10.6663L27.3339 11.333"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.66732 7.33301L7.33398 8.66634M4.66616 11.333L3.33398 10.6663"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
