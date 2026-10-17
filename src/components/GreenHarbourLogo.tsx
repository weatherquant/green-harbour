type LogoProps = {
  compact?: boolean;
  className?: string;
};

export default function GreenHarbourLogo({
  compact = false,
  className = "",
}: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={compact ? "40" : "52"}
        height={compact ? "32" : "40"}
        viewBox="0 0 64 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Green Harbour Energy"
      >
        {/* Harbour / G form */}
        <path
          d="M7 28C14 18 24 13 35 14C43 15 49 13 57 7"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

        <path
          d="M8 36C17 28 26 25 36 27C44 29 51 27 57 22"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Horizon */}
        <path
          d="M17 20H49"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />

        {/* Stored-energy terminal */}
        <path
          d="M49 20L57 20L57 15"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {!compact && (
        <div className="leading-none">
          <div className="text-[12px] font-semibold tracking-[0.22em]">
            GREEN HARBOUR
          </div>

          <div className="mt-1.5 text-[8px] font-medium tracking-[0.34em] text-[#60776b]">
            ENERGY
          </div>
        </div>
      )}
    </div>
  );
}