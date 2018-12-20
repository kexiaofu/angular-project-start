import axios from 'axios';
import { Injectable } from '@angular/core';
// import {IeventService} from '../../service/ievent/ievent.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
// import {StoreService} from '../../service/store/store.service';

@Injectable({
  providedIn: 'root'
})
export class ApiRequire {
  constructor(private translate: TranslateService, private router: Router) {}
  async fetchApi (options) {
    const option: {
      url: string,
      method: string | null,
      data?: object | null,
      name?: string | null,
      duration?: number,
      isFlesh?: boolean,
      params?: object | null // post 的时候，除了data数据，可能链接会附带params数据，例如上传图片会附带一些上传的信息
    } = Object.assign({}, {
      url: '',
      method: 'get',
      name: null
    }, options);
    let result: any;
    let status: string;
    const nowTime = new Date().getTime();
    // 带条件/分页的不能缓存，数据会错误
    if (option.name !== null && options.isFlesh /*&& this.store.state.hasOwnProperty(option.name)*/) {
      status = 'ok';
      // result = this.store.state[option.name];
    } else if (
      option.name !== null
      && !option.isFlesh
      && window.sessionStorage.getItem(option.name) !== null
      && window.sessionStorage.getItem(option.name) !== 'undefined'
      && (nowTime - +window.sessionStorage.getItem(`${option.name}Time`) < option.duration * 1000)) {
      status = 'ok';
      result = JSON.parse(window.sessionStorage.getItem(option.name));
    } else {
      if (option.method === 'get' || option.method === undefined || option.method === null) {
        result =  await axios.get(option.url, {
          params: option.data
        })
          .then(res => {
            if (res.data.code === 2000) {
              status = 'ok';
              if (option.name !== null) {
                if (option.isFlesh) {
                  // this.store.action$.emit({type: option.name, data: res.data.result});
                } else {
                  console.log(res.data.result);
                  window.sessionStorage.setItem(option.name, JSON.stringify(res.data.result));
                  window.sessionStorage.setItem(`${option.name}Time`, new Date().getTime().toString());
                }
              }
              return res.data.result;
            } else {
              console.log(res, 'res');
              window.dispatchEvent(new CustomEvent('toastEvent', { detail: {
                  status: 'error',
                  msg: res.data.msg
                }
              }));
              console.log(res.data.msg);
              return null;
            }
          })
          .catch( error => {
            if (error.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              if (error.response.status === 401) {
                // No Auth
                /*this.ievent.toastEvent$.emit({
                  status: 'error',
                  msg: this.translate.instant('errorTips.noAuth')
                });*/
                // this.router.navigateByUrl('/login');
              } else {
                return null;
              }

            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
              console.log(error.message);
              return null;
            }
          });
      } else {
        result =  await axios.post(option.url, option.data, {
          params: option.params
        })
          .then( res => {
            if (res.data.code === 2000) {
              status = 'ok';
              console.log(option.name, res.data.result);
              if (option.name !== null) {
                window.sessionStorage.setItem(option.name, JSON.stringify(res.data.result));
                window.sessionStorage.setItem(`${option.name}Time`, new Date().getTime().toString());
              }
              return res.data.result;
            } else {
              window.dispatchEvent(new CustomEvent('toastEvent', { detail: {
                  status: 'error',
                  msg: res.data.msg
                }
              }));
              console.log(res.data.msg);
              return null;
            }
          })
          .catch(error => {
            if (error.response) {
              // 请求已发出，但服务器响应的状态码不在 2xx 范围内
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);

              if (error.response.status === 401) {
                window.sessionStorage.clear();
                /*this.ievent.toastEvent$.emit({
                  status: 'error',
                  msg: this.translate.instant('errorTips.noAuth')
                });*/
                // this.router.navigateByUrl('/login');
              } else {
                console.log(error);
                return null;
              }

            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
              console.log(error.message);
              return null;
            }
          });
      }
    }
    if (status === 'ok') {
      return result;
    } else {
      throw Error('error happen when fetch api');
    }
  }
}
