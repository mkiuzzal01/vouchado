interface Props {
  color?: string;
  size?: number;
}

export default function Facebook({ color = "white", size = 8 }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 8 14"
      fill="none"
    >
      <g clip-path="url(#clip0_15899_6737)">
        <path
          d="M1.88265 13.9168H4.70664V6.95842H7.26587L7.53062 4.56646H4.70664V3.37048C4.70664 3.00807 4.76547 2.75437 4.88313 2.60941C5.0008 2.46444 5.28516 2.39196 5.73621 2.39196H7.53062V0H4.94197C3.76531 0 2.96126 0.262753 2.52982 0.788258C2.09838 1.29564 1.88265 2.0839 1.88265 3.15303V4.56646H0V6.95842H1.88265V13.9168Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_15899_6737">
          <rect width={size} height="14" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
}
