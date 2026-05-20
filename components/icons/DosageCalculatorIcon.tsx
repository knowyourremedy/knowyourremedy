interface DosageCalculatorIconProps {
    size?: number
    color?: string
    className?: string
  }
  
  export default function DosageCalculatorIcon({
    size = 24,
    color = '#2d4a3e',
    className,
  }: DosageCalculatorIconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="Dosage Calculator"
        role="img"
      >
        {/* Calculator body */}
        <rect
          x="14"
          y="8"
          width="52"
          height="64"
          rx="6"
          stroke={color}
          strokeWidth="3"
          fill="none"
        />
  
        {/* Display screen */}
        <rect
          x="20"
          y="14"
          width="40"
          height="14"
          rx="2"
          stroke={color}
          strokeWidth="2"
          fill="none"
        />
  
        {/* Measurement tick marks on display */}
        <line x1="46" y1="17" x2="46" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="50" y1="19" x2="50" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="54" y1="17" x2="54" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  
        {/* Operator button — emphasized with outline */}
        <rect x="50" y="34" width="8" height="8" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
        <line x1="52" y1="38" x2="56" y2="38" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="54" y1="36" x2="54" y2="40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  
        {/* Number buttons — row 1 */}
        <circle cx="24" cy="38" r="2.5" fill={color} />
        <circle cx="34" cy="38" r="2.5" fill={color} />
        <circle cx="44" cy="38" r="2.5" fill={color} />
  
        {/* Number buttons — row 2 */}
        <circle cx="24" cy="48" r="2.5" fill={color} />
        <circle cx="34" cy="48" r="2.5" fill={color} />
        <circle cx="44" cy="48" r="2.5" fill={color} />
        <circle cx="54" cy="48" r="2.5" fill={color} />
  
        {/* Number buttons — row 3 */}
        <circle cx="24" cy="58" r="2.5" fill={color} />
        <circle cx="34" cy="58" r="2.5" fill={color} />
        <circle cx="44" cy="58" r="2.5" fill={color} />
        <circle cx="54" cy="58" r="2.5" fill={color} />
  
        {/* Bottom row — slightly smaller */}
        <circle cx="24" cy="65" r="2" fill={color} />
        <circle cx="34" cy="65" r="2" fill={color} />
        <circle cx="44" cy="65" r="2" fill={color} />
        <circle cx="54" cy="65" r="2" fill={color} />
      </svg>
    )
  }