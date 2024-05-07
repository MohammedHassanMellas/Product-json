import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {appHttpInterceptor} from "./services/app-http.interceptor";
import {AuthGuard} from "./guards/authguard.guard";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideClientHydration(),provideHttpClient(withFetch()),
    importProvidersFrom(FormsModule, HttpClientModule, AuthGuard) ]

};
