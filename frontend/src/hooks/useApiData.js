import axios from 'axios';
import { useEffect, useState } from 'react';

export default function useApiData(apiUrl, initValue = []) {
  const [dataArr, setDataArr] = useState(initValue);
  const [apiErr, setApiErr] = useState({});

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        console.log('response ===', response);
        const commFromAPI = response.data;
        setDataArr(commFromAPI);
      })
      .catch((error) => {
        console.log('useApiData errro ===', error);
        setApiErr(error);
      });
  }, [apiUrl]);

  return [dataArr, setDataArr, apiErr];
}
