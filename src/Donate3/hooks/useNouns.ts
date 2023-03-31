import { useEffect, useState } from 'react';
import { getNounsBase64 } from '../utils/nouns';

const useNouns = (address: `0x${string}` | undefined) => {
  const [nounsBase64, setnounsBase64] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      // const getData = async (address: string) => {
      //   const res = await fetch(
      //     `http://localhost:3000/api/getnouns/${address}`,
      //   );
      //   const json = await res.json();
      //   const { code, base64 } = json;
      //   console.log(code);
      //   return base64;
      // };

      // const base64 = await getData(address);

      const base64 = null;
      if (address) {
        getNounsBase64(address);
      }
      setnounsBase64(base64);
    };

    fetchData().catch(console.error);
    return () => {};
  }, []);
  return nounsBase64;
};
export default useNouns;
