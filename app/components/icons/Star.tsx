interface Props {
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
}

export default function Star({
  size = 186,
  activeColor = "#31BFC8",
  inactiveColor = "#DFE3E8",
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={(size * 32) / 186}
      viewBox="0 0 186 32"
      fill="none"
    >
      {/* Star 1 */}
      <path
        d="M16 0L20.533 9.76086L31.2169 11.0557L23.3345 18.3831L25.4046 28.9443L16 23.712L6.59544 28.9443L8.66545 18.3831L0.783095 11.0557L11.467 9.76086L16 0Z"
        fill={activeColor}
      />

      {/* Star 2 */}
      <path
        d="M54.4004 0L58.9334 9.76086L69.6173 11.0557L61.7349 18.3831L63.805 28.9443L54.4004 23.712L44.9958 28.9443L47.0658 18.3831L39.1835 11.0557L49.8674 9.76086L54.4004 0Z"
        fill={activeColor}
      />

      {/* Star 3 */}
      <path
        d="M92.7988 0L97.3318 9.76086L108.016 11.0557L100.133 18.3831L102.203 28.9443L92.7988 23.712L83.3943 28.9443L85.4643 18.3831L77.5819 11.0557L88.2658 9.76086L92.7988 0Z"
        fill={activeColor}
      />

      {/* Star 4 */}
      <path
        d="M131.199 0L135.732 9.76086L146.416 11.0557L138.534 18.3831L140.604 28.9443L131.199 23.712L121.795 28.9443L123.865 18.3831L115.982 11.0557L126.666 9.76086L131.199 0Z"
        fill={activeColor}
      />

      {/* Star 5 (half/empty support style) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M168.817 0L164.283 9.76094L153.6 11.0557L161.482 18.3832L159.412 28.9443L168.817 23.7119V0Z"
        fill={activeColor}
      />

      <path
        d="M168.814 0L173.347 9.76094L184.031 11.0557L176.149 18.3832L178.219 28.9443L168.814 23.7119V0Z"
        fill={inactiveColor}
      />
    </svg>
  );
}
