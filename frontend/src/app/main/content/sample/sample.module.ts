import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Se desabilita la funcionalidad de traducción
// import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseSampleComponent } from './sample.component';

const routes = [
    {
        path     : 'sample',
        component: FuseSampleComponent
    }
];

@NgModule({
    declarations: [
        FuseSampleComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        // Se desabilita la funcionalidad de traducción
        // TranslateModule,

        FuseSharedModule
    ],
    exports     : [
        FuseSampleComponent
    ]
})

export class FuseSampleModule
{
}
