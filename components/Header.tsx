import Logo from "@/components/Logo";

type HeaderProps = { activeCount: number; totalCount: number };

export default function Header({ activeCount, totalCount }: HeaderProps) {
    return (
        <header className="app-header">
            <Logo />
            <p className="header-summary">
                <strong>{activeCount}</strong> active <span aria-hidden="true">/</span> {totalCount} total
            </p>
        </header>
    );
}
