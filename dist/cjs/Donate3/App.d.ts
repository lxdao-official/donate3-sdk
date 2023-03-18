import React from 'react';
export interface Props {
    type: string;
    color: string;
    name: string;
    address: string;
}
declare function App(props: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof App>;
export default _default;
