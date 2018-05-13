import { Component } from '@angular/core';
// Se desabilita la funcionalidad de traducción 
// import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

// import { locale as english } from './i18n/en';
// import { locale as turkish } from './i18n/tr';

@Component({
    selector   : 'fuse-sample',
    templateUrl: './sample.component.html',
    styleUrls  : ['./sample.component.scss']
})
export class FuseSampleComponent
{
    sampleData = 'Hola Mundo Oee'; 
    constructor(/*private fuseTranslationLoader: FuseTranslationLoaderService*/)
    {
        // this.fuseTranslationLoader.loadTranslations(english, turkish);
    }
}
