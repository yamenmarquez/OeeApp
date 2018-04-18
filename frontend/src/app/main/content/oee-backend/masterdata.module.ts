import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCheckboxModule, MatIconModule } from '@angular/material';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FuseAngularMaterialModule } from '../components/angular-material/angular-material.module';

import { FuseSharedModule } from '@fuse/shared.module';

import { NpstopComponent } from './npstop/npstop.component';
import { NpstopCreateComponent } from './npstop-create/npstop-create.component';

const routes = [
    {
        path     : 'masterdata/npstop',
        component: NpstopComponent
    },
    {
        path        : 'masterdata/npstop-2',
        loadChildren: './contacts/contacts.module#FuseContactsModule'
    },
];

@NgModule({
    declarations: [
        NpstopComponent,
        NpstopCreateComponent
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
