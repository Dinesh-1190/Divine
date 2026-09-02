type Props = {
  className?: string;
  strokeWidth?: number;
  /** Renders the mirrored pair — used for the watermark, not the nav lockup. */
  paired?: boolean;
};

const FEATHERS = [
  "M4 34 C 20 33.4, 33 28.2, 42 15.8",
  "M4 34 C 22 30.6, 34.5 23.6, 41 9.4",
  "M4 34 C 23.5 27.4, 33.6 18.6, 37.2 4.6",
  "M4 34 C 22.4 24.6, 28.8 14.4, 30.4 2",
];

/** The wing reads as four strokes of light leaving a single point —
 *  abstract enough to sit beside the wordmark without becoming iconography. */
export default function WingMark({ className, strokeWidth = 1.4, paired }: Props) {
  return (
    <svg
      viewBox={paired ? "0 0 92 40" : "0 0 46 40"}
      fill="none"
      className={className}
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
        {FEATHERS.map((d, i) => (
          <path key={i} d={d} opacity={1 - i * 0.16} />
        ))}
        {paired &&
          FEATHERS.map((d, i) => (
            <path
              key={`m${i}`}
              d={d}
              opacity={1 - i * 0.16}
              transform="translate(92 0) scale(-1 1)"
            />
          ))}
      </g>
    </svg>
  );
}
