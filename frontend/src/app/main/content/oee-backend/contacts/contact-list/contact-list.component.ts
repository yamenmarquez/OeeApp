import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';

import { FuseContactsContactFormDialogComponent } from '../contact-form/contact-form.component';
import { ContactsService } from '../contacts.service';
import { Stop } from '../../masterdata.types';


@Component({
    selector     : 'fuse-contacts-contact-list',
    templateUrl  : './contact-list.component.html',
    styleUrls    : ['./contact-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class FuseContactsContactListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent') dialogContent: TemplateRef<any>;

    stops: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['stopId', 'stopName', 'stopType', 'stopResEmail'];
    selectedContacts: any[];
    checkboxes: {};

    onContactsChangedSubscription: Subscription;
    onSelectedContactsChangedSubscription: Subscription;
    onUserDataChangedSubscription: Subscription;

    dialogRef: any;

    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    constructor(
        private contactsService: ContactsService,
        public dialog: MatDialog
    )
    {
        this.onContactsChangedSubscription =
            this.contactsService.onContactsChanged.subscribe(stops => {

                this.stops = stops;

                this.checkboxes = {};
                stops.map(npstop => {
                    this.checkboxes[stops.stopId] = false;
                });
            });

        this.onSelectedContactsChangedSubscription =
            this.contactsService.onSelectedContactsChanged.subscribe(selectedContacts => {
                for ( const stopId in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(stopId) )
                    {
                        continue;
                    }

                    this.checkboxes[stopId] = selectedContacts.includes(stopId);
                }
                this.selectedContacts = selectedContacts;
            });
    }

    ngOnInit()
    {
        this.dataSource = new FilesDataSource(this.contactsService);
        console.log('Hello Fucking World', this.contactsService.getContacts());
    }

    ngOnDestroy()
    {
        this.onContactsChangedSubscription.unsubscribe();
        this.onSelectedContactsChangedSubscription.unsubscribe();
        this.onUserDataChangedSubscription.unsubscribe();
    }
}

export class FilesDataSource extends DataSource<any>
{
    constructor(private contactsService: ContactsService)
    {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<Stop[]>
    {
        return this.contactsService.getContacts();
    }

    disconnect()
    {
    }
}
