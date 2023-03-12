import { useConnectModal } from '@rainbow-me/rainbowkit';
import React from 'react';

export interface Props {
  type: number;
  color: string;
  name: string;
  address: string;
}

function App2(props: Props) {
  const { openConnectModal } = useConnectModal();

  return (
    <>
      <div>
        <button type="button" onClick={openConnectModal}>
          open x999
        </button>
      </div>
    </>
  );
}

export default App2;
