/// <reference types="react" />
export interface HeaderProps {
    name: string;
    address: string;
    type: string;
    normalmode?: boolean;
}
declare function Header(props: HeaderProps): JSX.Element;
export default Header;
