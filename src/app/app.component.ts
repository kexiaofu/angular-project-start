import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lang = 'zh';
  constructor(private translate: TranslateService) {
    this.initTranslateConfig();
  }
  initTranslateConfig() {
    // 参数类型为数组，数组元素为本地语言json配置文件名
    this.translate.addLangs(['zh', 'en']);
    // 设置默认语言
    this.translate.setDefaultLang(this.lang);
    // 检索指定的翻译语言，返回Observable
    if (window.sessionStorage.getItem('lang')) {
      this.translate.use(window.sessionStorage.getItem('lang'));
    } else {
      this.translate.use(this.lang);
    }
  }
}
