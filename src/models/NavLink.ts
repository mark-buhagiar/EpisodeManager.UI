export default interface NavLink {
    id: number;
    to?: string;
    exact?: boolean;
    label: string;
    private?: boolean;
    action?: () => void;
    visible?: boolean;
}
