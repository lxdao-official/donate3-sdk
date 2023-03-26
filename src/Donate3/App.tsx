import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import DonateButton from './components/DonateButton/DonateButton';
import DonorList from './components/DonorList/DonorList';
import Footer from './components/Footer/Footer';
import FormSection from './components/FormSection/FormSection';
import Header from './components/Header/Header';
import UserAvatar from './components/UserAvatar/UserAvatar';
import { useFetchDonors } from './hooks/useDonate';
import { ReactComponent as Close } from './images/close.svg';
import DonorResultMockData from './Mock/DonorResult.json';
import { getElementPosition } from './utils/index';
export interface Props {
  type: string;
  color: string;
  name: string;
  address: string;
}

export interface DonorRecord {
  chainType: string;
  coinType: number;
  createTime: string;
  fromAddress: string;
  hash: string;
  id: string;
  message: string;
  status: number;
  toAddress: string;
  updateTime: string;
  usdValue: number;
  userId: string;
  value: number;
}
export interface DonorResult {
  code: string;
  message: string;
  result: {
    current: number;
    pages: number;
    records: DonorRecord[];
    size: number;
    total: number;
  };
  success: boolean;
  timestamp: number;
}

function App(props: Props) {
  const [showForm, setShowForm] = useState(false);
  const [dialogStyle, setDialogStyle] = useState({});
  const [showDonorList, setShowDonorList] = useState(false);
  const [donorList, setDonorList] = useState<DonorResult>();
  const { donors, loading } = useFetchDonors(props.address, '1');

  const total = donorList?.result.records.length;

  console.log('--------donorlist', donors, loading);

  useEffect(() => {
    setDonorList(DonorResultMockData);
  }, []);

  console.log('-------------App donorList', donorList);
  let cx = classNames.bind(styles);
  const handleSwitchDialog = (event: any) => {
    const defaultStyle = {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
    };

    if (props.type === '2') {
      setDialogStyle(defaultStyle);
    } else {
      const { elementBottom, elementRight } = getElementPosition(
        event?.currentTarget,
      );
      if (!showForm) {
        if (window.innerWidth > 768) {
          setDialogStyle({ right: elementRight, bottom: elementBottom + 70 });
        } else {
          setDialogStyle(defaultStyle);
        }
      }
    }

    setShowForm(!showForm);
  };

  const renderDonate3Button = (type: string) => {
    if (type === '1') {
      return (
        <div
          className={cx(
            { close: showForm },
            { floatmode: !showForm },
            styles.btn,
            styles['btn-animated'],
            styles['btn-white'],
            styles.donate3btn,
          )}
          onClick={handleSwitchDialog}
        >
          {showForm ? (
            <Close className={styles.closeimg}></Close>
          ) : (
            <>
              <DonateButton type={props.type}></DonateButton>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div className={cx(styles.donate3btn)}>
          <Header
            address={props.address}
            name={props.name}
            type={props.type}
            normalmode={true}
            total={total}
          ></Header>
          <div onClick={handleSwitchDialog}>
            <DonateButton type={props.type}></DonateButton>
          </div>

          <div
            onClick={() => {
              setShowDonorList(true);
            }}
          >
            <UserAvatar
              type={props.type}
              normalmode={true}
              donorResult={donorList}
            ></UserAvatar>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {props.type === '2' && (showForm || showDonorList) ? (
        <div
          className={styles.mask}
          onClick={() => {
            setShowForm(false);
            setShowDonorList(false);
          }}
        ></div>
      ) : null}
      <div
        className={showForm ? `${styles.app} dialogAnimation` : styles.hidden}
        style={{ ...dialogStyle }}
      >
        <Header
          address={props.address}
          name={props.name}
          type={props.type}
          total={total}
        ></Header>
        <FormSection
          type={props.type}
          toAddress={props.address}
          donorResult={donorList}
        ></FormSection>
        <Footer></Footer>
      </div>
      <div
        className={
          showDonorList ? `${styles.app} dialogAnimation` : styles.hidden
        }
        style={{ ...dialogStyle }}
      >
        <DonorList
          setShowDonorList={setShowDonorList}
          donorResult={donorList}
          toAddress={props.address}
        />
      </div>

      {renderDonate3Button(props.type)}
    </>
  );
}

export default React.memo(App);
