import { useState } from 'react';

const useLoading = (): [boolean, (aPromise: Promise<any>) => Promise<any>] => {
  const [isLoading, setState] = useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => setState(false));
  };
  return [isLoading, load];
}

export default useLoading;
