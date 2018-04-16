import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
// Se desabilita la funcionalidad de traducción
// import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/sample/sample.module';

// Configuración de Apollo
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink} from 'apollo-link';

// Servicios
import { AuthenticationService } from './main/content/pages/authentication/authentication.service';

const appRoutes: Routes = [
    {
      path        : 'pages',
      loadChildren: './main/content/pages/pages.module#FusePagesModule'
    },
    {
        path      : '**',
        redirectTo: 'pages/auth/login'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        // Se desabilita la funcionalidad de traducción
        // TranslateModule.forRoot(),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        FuseSampleModule,
       
        // Apollo
        ApolloModule,
        HttpLinkModule

    ],
    providers   : [
        AuthenticationService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
    constructor(apollo: Apollo, httpLink: HttpLink) {
        apollo.create({
          link: httpLink.create({ uri: 'http://localhost:5000/graphql'}),
          cache: new InMemoryCache()
        });
    }
}
