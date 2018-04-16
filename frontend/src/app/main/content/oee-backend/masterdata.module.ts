import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FuseSharedModule } from '@fuse/shared.module';

import { NpstopComponent } from './npstop/npstop.component';

const routes = [
    {
        path     : 'masterdata/npstop',
        component: NpstopComponent
    }
];

@NgModule({
    declarations: [
        NpstopComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatIconModule,

        NgxDatatableModule,

        FuseSharedModule,
    ],
})
export class OeeAppMasterdataModule
{
}
