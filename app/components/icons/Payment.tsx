interface Props {
  size?: number;
  color?: string;
}

export default function Payment({ size = 32, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
    >
      <g clipPath="url(#clip0_15407_5747)">
        <path
          opacity="0.6"
          d="M3.64453 21.5692L21.5722 3.6416"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          opacity="0.6"
          d="M14.4062 25.1704L16.2066 23.3701"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          opacity="0.6"
          d="M18.4414 21.1344L22.0269 17.5488"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M3.15226 13.1081L13.1137 3.14665C16.2942 -0.0338113 17.8844 -0.0488133 21.0349 3.10165L28.401 10.4677C31.5514 13.6182 31.5364 15.2084 28.3559 18.3889L18.3945 28.3503C15.214 31.5308 13.6238 31.5458 10.4733 28.3954L3.10725 21.0293C-0.0432115 17.8788 -0.0432119 16.3036 3.15226 13.1081V13.1081"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M0.75 30.75H30.7544"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      <defs>
        <clipPath id="clip0_15407_5747">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
