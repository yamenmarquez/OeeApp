import { Component } from '@angular/core';

// Se desabilita la funcionalidad de traducción
// import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class FuseSampleComponent
{
    sampleData = 'Hola Mundo Oee';
    // Se desabilita la funcionalidad de traducción
    constructor(/* private fuseTranslationLoader: FuseTranslationLoaderService */)
    {
        // Se desabilita la funcionalidad de traducción
        // this.fuseTranslationLoader.loadTranslations(english, spanish);
    }
}
