type LogoProps = {
  compact?: boolean;
};

export default function Logo({ compact = false }: LogoProps) {
  return (
    <span className={`logo ${compact ? "logo-compact" : ""}`} aria-label="Vertral Tasks">
      <span className="logo-mark" aria-hidden="true">
        V
      </span>
      {!compact && <span className="logo-name">VERTRAL / TASKS</span>}
    </span>
  );
}