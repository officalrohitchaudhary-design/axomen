const TEXT = "Get First Session Free";
const REPEAT = 10;

function FistIcon() {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24"
      fill="#fff" aria-hidden
      className="shrink-0"
    >
      <path d="M9 11V6a1 1 0 0 1 2 0v5M11 6V4a1 1 0 0 1 2 0v7M13 5a1 1 0 0 1 2 0v6M15 7a1 1 0 0 1 2 0v4a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-1.5A1.5 1.5 0 0 1 4.5 14H6" />
      <path d="M6 10V6a1 1 0 1 1 2 0v5" />
    </svg>
  );
}

function Item() {
  return (
    <span className="inline-flex items-center gap-3 shrink-0">
      <span
        className="text-[#fff] text-[11px] tracking-[0.02em] uppercase whitespace-nowrap font-[400]"
        style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
      >
        {TEXT}
      </span>
      <FistIcon />
    </span>
  );
}

export default function MarqueeBanner() {
  return (
    <div className="h-[32px] w-full bg-[#16aee2] overflow-hidden flex items-center">
      <div className="marquee-track flex items-center gap-6 px-3">
        {Array.from({ length: REPEAT }).map((_, i) => (
          <Item key={i} />
        ))}
        {/* Duplicate for seamless loop */}
        {Array.from({ length: REPEAT }).map((_, i) => (
          <Item key={`d${i}`} />
        ))}
      </div>
    </div>
  );
}
