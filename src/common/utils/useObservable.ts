import { useEffect } from 'react';
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { ofType } from "redux-observable";
import { Observable, OperatorFunction } from 'rxjs';
import { allActions$, RootActions } from 'rootStore/rootEpic';

// ----------------------------------------------------------------------

export const createDebounceObservable = (observable: Observable<any>, callbackFunction: any) => {
  return observable.pipe(
    debounceTime(750),
    distinctUntilChanged(),
    map((value) => callbackFunction(value))
  );
};

const useObservable = (observable: Observable<any>, setter: SetStateCallback<any>) => {
  useEffect(() => {
    let subscription = observable.subscribe((result: any) => {
      setter(result);
  });
    return () => subscription.unsubscribe();
  }, []);
};

export const useRenderMiddleware = (targetActionType: string, onActionCaught: OperatorFunction<any, void>) => {
  useEffect(() => {
    const subscription = allActions$.pipe(
      ofType<any, typeof targetActionType, RootActions>(targetActionType),
      onActionCaught
    ).subscribe()
    return () => {
      subscription.unsubscribe();
    };
  }, []);
}

export default useObservable;