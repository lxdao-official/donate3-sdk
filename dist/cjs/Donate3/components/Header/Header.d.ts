import React from 'react';
export interface HeaderProps {
    normalmode?: boolean;
    setShowDonorList: any;
}
declare function Header({ setShowDonorList, normalmode }: HeaderProps): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Header>;
export default _default;
