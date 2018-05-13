import { Component } from '@angular/core';
// Se desabilita la funcionalidad de traducción
// import { TranslateService } from '@ngx-translate/core';

import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
// Se desabilita la funcionalidad de traducción
// import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
// Se desabilita la funcionalidad de traducción
// import { locale as navigationEnglish } from './navigation/i18n/en';
// import { locale as navigationTurkish } from './navigation/i18n/tr';

@Component({
    selector   : 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    constructor(
        // Se desabilita la funcionalidad de traducción
        // private translate: TranslateService,
        private fuseNavigationService: FuseNavigationService,
        private fuseSplashScreen: FuseSplashScreenService
        // Se desabilita la funcionalidad de traducción
        // private fuseTranslationLoader: FuseTranslationLoaderService
    )
    {
        // Add languages
        // this.translate.addLangs(['en', 'tr']);

        // Set the default language
        // this.translate.setDefaultLang('en');

        // Set the navigation translations
        // this.fuseTranslationLoader.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        // this.translate.use('en');
    }
}
