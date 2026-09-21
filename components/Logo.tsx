type LogoProps = {
  compact?: boolean;
};

export default function Logo({ compact = false }: LogoProps) {
  return (
    <span className={`logo ${compact ? "logo-compact" : ""}`} aria-label="Vertral Tasks">
      <span className="logo-mark">
        <img
          src="https://cdn.creativefabrica.com/2022/09/01/Simple-Letter-V-Logo-Graphics-37526602-1-1-580x387.jpg"
          alt="Simple letter V logo"
        />
      </span>
      {!compact && <span className="logo-name">VERTRAL / TASKS</span>}
    </span>
  );
}