import { BrowserModule } from '@angular/platform-browser';
import {HashLocationStrategy , LocationStrategy} from '@angular/common';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { appRoutes, AuthService} from './app.router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';

// 使用TranslateHttpLoader加载项目的本地语言json配置文件
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule, // ngModel
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  providers: [TranslateService, AuthService, HttpClient, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
