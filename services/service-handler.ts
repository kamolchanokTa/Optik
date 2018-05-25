import * as _ from 'lodash';
import * as guid from 'node-uuid';
import * as request from 'request';
import * as Promise from 'promise';

export class ServiceHandler {
  private appId: string;
  constructor(appId: string) {
    this.appId = appId;
  }
  extendPayload = (payload: any) => {
    return _.assign(payload, {
      "appId": this.appId,
      "uuid": payload.uuid,
      "transactionId": guid.v4
    });
  };

  createRequestHeader = (sessionKey: string): request.Headers => {
    return {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "appId": this.appId,
      "sessionKey": sessionKey
    };
  }

  createOption = (uri: string,payload: any,sessionKey: any): request.UriOptions => {
    const headers = this.createRequestHeader(sessionKey);
    let requestOption = {
      headers,
      uri
    };
    if (payload) {
      requestOption["body"] = JSON.stringify(this.extendPayload(payload));
    }

    return requestOption;
  }

  postAsync = (options: request.UriOptions & request.CoreOptions): Promise.IThenable<any> => {
    return new Promise((resolve, reject) => {
      request.post(options, this.createRequestCallback(resolve, reject));
    });
  };

  getAsync = (options: request.UriOptions & request.CoreOptions): Promise.IThenable<any> => {
    return new Promise((resolve, reject) => {
      request.get(options, this.createRequestCallback(resolve, reject));
    });
  };

  createRequestCallback = (resolve, reject): request.RequestCallback => {
    return (error, response, body) => {
      if (error) {
        reject(this.parseHttpError(error, response));
        return;
      }
      const data = this.parseBody(body);
      if (data.error) {
        reject(data.error);
        return;
      }
      resolve(data);
    };
  };

  parseHttpError = (error, response) => {
    let code = response ? response.statusCode : 500;
    let message = response ? response.statusText : error;
    return { code, message };
  }

  parseBody = (body) => {
    return body ? JSON.parse(body) : {};
  };
}
