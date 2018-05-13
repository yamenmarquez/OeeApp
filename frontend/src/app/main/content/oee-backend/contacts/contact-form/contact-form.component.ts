import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { CalendarEvent } from 'angular-calendar';

import { Contact } from '../contact.model';

import { Stop } from '../../masterdata.types'

@Component({
    selector     : 'fuse-contacts-contact-form-dialog',
    templateUrl  : './contact-form.component.html',
    styleUrls    : ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class FuseContactsContactFormDialogComponent
{
    event: CalendarEvent;
    dialogTitle: string;
    contactForm: FormGroup;
    action: string;
    contact: Contact;
    stop: Stop;

    constructor(
        public dialogRef: MatDialogRef<FuseContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder
    )
    {
        this.action = data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Editar parada';
            this.stop = data.stop;
        }
        else
        {
            this.dialogTitle = 'Nueva parada';
            this.stop = new Stop({});
        }

        this.contactForm = this.createContactForm();
    }

    createContactForm()
    {
        return this.formBuilder.group({
            stopId          : [this.stop.stopId],
            stopName        : [this.stop.stopName],
            stopType        : [this.stop.stopType],
            stopResEmail    : [this.stop.stopResEmail]
        });
    }
}
