interface Props {
  size?: number;
  color?: string;
}

export default function ActiveVoucher({ size = 44, color = "#31BFC8" }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
    >
      <path
        d="M35.7493 22.9163C35.7493 20.3863 37.8027 18.333 40.3327 18.333V16.4997C40.3327 9.16634 38.4993 7.33301 31.166 7.33301H12.8327C5.49935 7.33301 3.66602 9.16634 3.66602 16.4997V17.4163C6.19602 17.4163 8.24935 19.4697 8.24935 21.9997C8.24935 24.5297 6.19602 26.583 3.66602 26.583V27.4997C3.66602 34.833 5.49935 36.6663 12.8327 36.6663H31.166C38.4993 36.6663 40.3327 34.833 40.3327 27.4997C37.8027 27.4997 35.7493 25.4463 35.7493 22.9163Z"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.5 27.042L27.5 16.042"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M27.4906 27.0417H27.507"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.4906 16.9587H16.507"
        stroke={color}
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
