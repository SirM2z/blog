import { useEffect } from 'react';
import _ from 'lodash/fp';

type CallbackFunc = (event: Event) => void;

const useWindowScroll = (callback: CallbackFunc, resize: boolean = false) => {
  useEffect(() => {
    const scrollListener: EventListener = _.throttle(80, (event) => callback(event));
    // const scrollListener: EventListener = (event) => callback(event);
    document.addEventListener('scroll', scrollListener);
    return () => {
      document.removeEventListener('scroll', scrollListener);
    };
  });
};

export default useWindowScroll;
