
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideRouter, Router, Routes } from '@angular/router';
import { HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { httpInterceptor } from "./interceptor/http.interceptor";

import { routes } from './app-routing.module';


export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes),
                provideHttpClient(withInterceptors([httpInterceptor]))]
};

