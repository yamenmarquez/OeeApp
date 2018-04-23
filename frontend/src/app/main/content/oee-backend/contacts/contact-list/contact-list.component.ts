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
    displayedColumns = ['checkbox', 'stopName', 'stopType', 'stopResEmail', 'buttons'];
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
                stops.map(stop => {
                    this.checkboxes[stop.stopId] = false;
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
    }

    ngOnDestroy()
    {
        this.onContactsChangedSubscription.unsubscribe();
        this.onSelectedContactsChangedSubscription.unsubscribe();
    }

    editContact(stop)
    {
        this.dialogRef = this.dialog.open(FuseContactsContactFormDialogComponent, {
            panelClass: 'contact-form-dialog',
            data      : {
                stop: stop,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this.contactsService.updateContact(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteContact(stop);

                        break;
                }
            });
    }

        /**
     * Delete Contact
     */
    deleteContact(stop)
    {
        this.confirmDialogRef = this.dialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this.contactsService.deleteContact(stop);
            }
            this.confirmDialogRef = null;
        });

    }

    onSelectedChange(stopId)
    {
        this.contactsService.toggleSelectedContact(stopId);
    }

}

export class FilesDataSource extends DataSource<any>
{
    constructor(private contactsService: ContactsService)
    {
        super();
    }

    /** Connect function called by the table to retrieve one stream containing the data to render. */
    connect(): Observable<any[]>
    {
        return this.contactsService.onContactsChanged;
    }

    disconnect()
    {
    }
}
