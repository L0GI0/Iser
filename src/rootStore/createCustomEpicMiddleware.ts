import { createEpicMiddleware } from "redux-observable";
import { Subject } from 'rxjs';

export const createCustomEpicMiddleware = (rootEpic: (a$: any, s: any) => any) => {
  const action$ = new Subject();
  const epicMiddleware = createEpicMiddleware({
    dependencies: { action$ },
  });

  return { epicMiddleware, action$ }

}