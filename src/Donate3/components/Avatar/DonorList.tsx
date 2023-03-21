import classNames from 'classnames/bind';
import React from 'react';
import styles from './DonorList.module.css';

export interface Data {
  imgUrl: string;
  key: string;
  desc: string;
}

function DonorList(props: { datas: Data[] }) {
  let cx = classNames.bind(styles);

  const makeDonateUserAvatar = (datas: Data[]) => {
    let dom = [];
    const url = 'https://i.imgur.com/RbcuN95.jpeg';
    const myStyle = {
      backgroundImage: `url('${url}')`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };
    dom = datas.map((item: Data) => {
      myStyle.backgroundImage = `url('${item.imgUrl}')`;
      return (
        <div
          key={item.key}
          className={styles.donateuseravatar}
          style={myStyle}
        ></div>
      );
    });
    dom.push(
      <div key={'lastitem'} className={styles.donateuseravatar}>
        190
      </div>,
    );
    return dom;
  };

  return <>{makeDonateUserAvatar(props.datas)}</>;
}

//

export default DonorList;
