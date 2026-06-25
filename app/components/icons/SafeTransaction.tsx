interface Props {
  color?: string;
  size?: number;
}

export default function SafeTransaction({
  color = "#31BFC8",
  size = 32,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M2.66797 21.3337C2.66797 24.2815 2.66797 25.7555 3.6038 26.7395C3.75348 26.897 3.91844 27.0426 4.09682 27.1746C5.21209 28.0003 6.88257 28.0003 10.2235 28.0003H11.1124C14.4534 28.0003 16.1238 28.0003 17.2392 27.1746C17.4174 27.0426 17.5825 26.897 17.7321 26.7395C18.668 25.7555 18.668 24.2815 18.668 21.3337C18.668 18.3858 18.668 16.9118 17.7321 15.9278C17.5825 15.7703 17.4174 15.6247 17.2392 15.4927C16.1238 14.667 14.4534 14.667 11.1124 14.667H10.2235C6.88257 14.667 5.21209 14.667 4.09682 15.4927C3.91844 15.6247 3.75348 15.7703 3.6038 15.9278C2.66797 16.9118 2.66797 18.3858 2.66797 21.3337Z"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M13.332 10.6667C13.332 7.71876 13.332 6.24481 14.2679 5.26075C14.4175 5.10336 14.5826 4.95779 14.7608 4.82572C15.8762 4 17.5466 4 20.8876 4H21.7764C25.1175 4 26.7879 4 27.9032 4.82572C28.0815 4.95779 28.2466 5.10336 28.3962 5.26075C29.332 6.24481 29.332 7.71876 29.332 10.6667C29.332 13.6145 29.332 15.0885 28.3962 16.0725C28.2466 16.23 28.0815 16.3756 27.9032 16.5076C26.8915 17.2567 25.4231 17.3263 22.6654 17.3327"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.66797 20H18.668"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M13.332 9.33301H29.332"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
      <path
        d="M2.66797 12C2.66797 7.57715 6.24512 4 10.668 4L9.52512 6.28572"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M29.332 20C29.332 24.4228 25.7548 28 21.332 28L22.4748 25.7143"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
