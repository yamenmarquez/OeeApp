import { Component } from '@angular/core';
// Se desabilita la funcionalidad de traducción
// import { TranslateService } from '@ngx-translate/core';

import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';

// Se desabilita la funcionalidad de traducción
// import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

// Se desabilita la funcionalidad de traducción
/* import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationSpanish } from './navigation/i18n/es'; */

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
        private fuseSplashScreen: FuseSplashScreenService,
        // Se desabilita la funcionalidad de traducción
        // private fuseTranslationLoader: FuseTranslationLoaderService
    )
    {
        // Se desabilita la funcionalidad de traducción
        // Add languages
        // this.translate.addLangs(['en', 'es']);

        // Se desabilita la funcionalidad de traducción
        // Set the default language
        // this.translate.setDefaultLang('es');

        // Se desabilita la funcionalidad de traducción
        // Set the navigation translations
        // this.fuseTranslationLoader.loadTranslations(navigationSpanish, navigationEnglish );

        // Se desabilita la funcionalidad de traducción
        // Use a language
        // this.translate.use('es');
    }
}
