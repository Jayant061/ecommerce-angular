import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { routes } from "./app.route"
import { provideHttpClient } from "@angular/common/http";
import { AuthService } from "./components/auth/auth.service";

export const appConfig:ApplicationConfig = {
    providers:[
        provideRouter(routes,withComponentInputBinding(),withRouterConfig({
            paramsInheritanceStrategy:"always"
        })),
        provideHttpClient(),
        AuthService
    ]
}