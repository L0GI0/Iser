import { ajax, AjaxResponse } from "rxjs/ajax";
import { Observable } from "rxjs/index";
import { StateObservable } from "redux-observable";
import { RootState } from "rootStore/rootReducer";

// ----------------------------------------------------------------------

export const apiUrl =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/";

type ResponseType = XMLHttpRequest["responseType"];

type ApiBodyCall = (
  endpoint: string,
  body?: Record<string, unknown>,
  headers?: Record<string, unknown>
) => Observable<AjaxResponse<any>>;

type ApiBodylessCall = (
  endpoint: string,
  headers?: Record<string, unknown>,
  responseType?: ResponseType
) => Observable<AjaxResponse<any>>;

export interface ApiAjaxCreationMethod {
  (
    endpoint: string,
    method: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType?: ResponseType,
    withCredentials?: boolean
  ): Observable<AjaxResponse<any>>;
  get: ApiBodylessCall;
  post: ApiBodyCall;
  put: ApiBodyCall;
  patch: ApiBodyCall;
  delete: ApiBodylessCall;
}

export const ajaxApi = <
  T extends StateObservable<RootState> | RootState = StateObservable<RootState>
>(
  state$?: T
): ApiAjaxCreationMethod => {
  const accessToken = (state$ as RootState)?.accountReducer?.accessToken ||
    (state$ as StateObservable<RootState>)?.value?.accountReducer?.accessToken;
  
  const mainHeader = state$
    ? {
        accept: "application/json",
        authorization: `Bearer ${accessToken}`,
      }
    : {
        accept: "application/json",
      };

  const ajaxCall = function (
    endpoint: string,
    method = "GET",
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType: ResponseType = "json",
    withCredentials = false
  ) {
    const directUrl = apiUrl + endpoint;
    const bodyHeaders = body ? { "Content-Type": "application/json" } : {};
    const allHeaders = { ...mainHeader, ...bodyHeaders, ...(headers || {}) };
    
    return ajax({
      url: directUrl,
      method,
      body,
      headers: allHeaders,
      responseType,
      withCredentials
    }); 
  };

  ajaxCall.get = (
    endpoint: string,
    headers?: Record<string, unknown>,
    responseType?: ResponseType
  ) => ajaxCall(endpoint, "GET", undefined, headers, responseType, true);
  ajaxCall.post = (
    endpoint: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType?: ResponseType
  ) => ajaxCall(endpoint, "POST", body, headers, responseType, true);
  ajaxCall.put = (
    endpoint: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType?: ResponseType
  ) => ajaxCall(endpoint, "PUT", body, headers, responseType);
  ajaxCall.patch = (
    endpoint: string,
    body?: Record<string, unknown>,
    headers?: Record<string, unknown>,
    responseType?: ResponseType
  ) => ajaxCall(endpoint, "PATCH", body, headers, responseType);
  ajaxCall.delete = (
    endpoint: string,
    headers?: Record<string, unknown>,
    responseType?: ResponseType
  ) => ajaxCall(endpoint, "DELETE", undefined, headers, responseType);

  return ajaxCall;
};
