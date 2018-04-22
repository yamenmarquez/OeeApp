import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';


import { FuseUtils } from '@fuse/utils';

import { Contact } from './contact.model';

// prueba
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';

// Types

import { Stop } from '../masterdata.types';


// Migrando for Npstop Component
interface AllStopsQueryResponse {
  allStops: {nodes: Stop[]};
}


@Injectable()
export class ContactsService implements Resolve<any>
{
    onContactsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSelectedContactsChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onUserDataChanged: BehaviorSubject<any> = new BehaviorSubject([]);
    onSearchTextChanged: Subject<any> = new Subject();
    onFilterChanged: Subject<any> = new Subject();

    
    stops: Stop[];
    response: any;
    contacts: Contact[];
    // user: any;
    selectedContacts: string[] = [];

    searchText: string;
    filterBy: string;

    // Migrando for Npstop Component
    npstops: any;
    loading: boolean;
    private querySubscription: Subscription;

    // ngx-datatable
    np1stops: Observable<any>;
    loadingIndicator = false;
    reorderable = true;

    constructor(private apollo: Apollo)
    {
    }

    /**
     * The Contacts App Main Resolver
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
      return new Promise((resolve, reject) => {

          Promise.all([this.getContacts()])
          .then(
              ([files]) => {

                  this.onSearchTextChanged.subscribe(searchText => {
                      this.searchText = searchText;
                      this.getContacts();
                  });

                  resolve();

              },
              reject
          );
      });
    }

    getContacts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.apollo.watchQuery<AllStopsQueryResponse>({
            query: gql`
              query {
                allStops {
                  nodes{
                    stopId
                    stopName
                    stopType
                    stopResEmail
                    stopCreateAt
                  }
                }
              }
            `
            }).valueChanges.subscribe(({data}) => {
            
              this.stops =  data.allStops.nodes;
              console.log(this.stops);

              if ( this.searchText && this.searchText !== '' )
              {
                  this.stops = FuseUtils.filterArrayByString(this.stops, this.searchText);
              }

              this.stops = this.stops.map(stop => {
                  return new Stop(stop);
              });
              
              this.onContactsChanged.next(this.stops);
              resolve(this.stops);

              }, reject);
            }
          );
      }


    // /**
    //  * Toggle selected contact by id
    //  * @param id
    //  */
    // toggleSelectedContact(id)
    // {
    //     // First, check if we already have that todo as selected...
    //     if ( this.selectedContacts.length > 0 )
    //     {
    //         const index = this.selectedContacts.indexOf(id);

    //         if ( index !== -1 )
    //         {
    //             this.selectedContacts.splice(index, 1);

    //             // Trigger the next event
    //             this.onSelectedContactsChanged.next(this.selectedContacts);

    //             // Return
    //             return;
    //         }
    //     }

    //     // If we don't have it, push as selected
    //     this.selectedContacts.push(id);

    //     // Trigger the next event
    //     this.onSelectedContactsChanged.next(this.selectedContacts);
    // }

    // /**
    //  * Toggle select all
    //  */
    // toggleSelectAll()
    // {
    //     if ( this.selectedContacts.length > 0 )
    //     {
    //         this.deselectContacts();
    //     }
    //     else
    //     {
    //         this.selectContacts();
    //     }
    // }

    selectContacts(filterParameter?, filterValue?) {}
    // {
    //     this.selectedContacts = [];

    //     // If there is no filter, select all todos
    //     if ( filterParameter === undefined || filterValue === undefined )
    //     {
    //         this.selectedContacts = [];
    //         this.contacts.map(contact => {
    //             this.selectedContacts.push(contact.id);
    //         });
    //     }
    //     else
    //     {
    //         /* this.selectedContacts.push(...
    //              this.contacts.filter(todo => {
    //                  return todo[filterParameter] === filterValue;
    //              })
    //          );*/
    //     }

    //     // Trigger the next event
    //     this.onSelectedContactsChanged.next(this.selectedContacts);
    // }

    updateContact(contact) {}
    // {
    //     return new Promise((resolve, reject) => {

    //         this.http.post('http://fuse-angular-material.withinpixels.com/api/contacts-contacts/' + contact.id, {...contact})
    //             .subscribe(response => {
    //                 this.getContacts();
    //                 resolve(response);
    //             });
    //     });
    // }

    // updateUserData(userData)
    // {
    //     return new Promise((resolve, reject) => {
    //         this.http.post('http://fuse-angular-material.withinpixels.com/api/contacts-user/' + this.user.id, {...userData})
    //             .subscribe(response => {
    //                 this.getUserData();
    //                 this.getContacts();
    //                 resolve(response);
    //             });
    //     });
    // }

    deselectContacts() {}
    // {
    //     this.selectedContacts = [];

    //     // Trigger the next event
    //     this.onSelectedContactsChanged.next(this.selectedContacts);
    // }

    deleteContact(contact) {}
    // {
    //     const contactIndex = this.contacts.indexOf(contact);
    //     this.contacts.splice(contactIndex, 1);
    //     this.onContactsChanged.next(this.contacts);
    // }

    deleteSelectedContacts() {}
    // {
    //     for ( const contactId of this.selectedContacts )
    //     {
    //         const contact = this.contacts.find(_contact => {
    //             return _contact.id === contactId;
    //         });
    //         const contactIndex = this.contacts.indexOf(contact);
    //         this.contacts.splice(contactIndex, 1);
    //     }
    //     this.onContactsChanged.next(this.contacts);
    //     this.deselectContacts();
    // }

}
