import Logo from "@/components/Logo";

type HeaderProps = { activeCount: number; totalCount: number; showSummary?: boolean };

export default function Header({ activeCount, totalCount, showSummary = true }: HeaderProps) {
    return (
        <header className="app-header">
            <Logo />
            <nav className="header-nav" aria-label="Primary navigation">
                <a href="/">Tasks</a>
                <a href="/guide">Project guide</a>
                {showSummary && <p className="header-summary"><strong>{activeCount}</strong> active <span aria-hidden="true">/</span> {totalCount} total</p>}
            </nav>
        </header>
    );
}
