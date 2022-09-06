import { useEffect } from 'react';
import { Observable } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";

// ----------------------------------------------------------------------

export const createDebounceObservable = (observable: any, callbackFunction: any) => {
  return observable.pipe(
    debounceTime(750),
    distinctUntilChanged(),
    map((value) => callbackFunction(value))
  );
};

const useObservable = (observable: Observable<any>, setter: any) => {
  useEffect(() => {
    let subscription = observable.subscribe((result: any) => {
      setter(result);
  });
    return () => subscription.unsubscribe();
  }, []);
};

export default useObservable;