import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';


import { FuseUtils } from '@fuse/utils';

import { Contact } from './contact.model';

// Apollo
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

// Types
import { Stop } from '../masterdata.types';

// Interface To-Do Migrar a un archivo separado de conjunto con las query y mutation graphql
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
    contacts: Contact[];
    searchText: string;

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
              console.log('getContacts() data.allStops.nodes' + ' ' + this.stops);

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
      // CRUD
      createNewStop(stop)
      {
          return new Promise((resolve, reject) => {

            this.apollo.mutate({
              mutation: gql`
              mutation ($stop: CreateStopInput!) {
                  createStop(input: $stop) {
                    stop {
                      stopId
                      stopName
                      stopType
                      stopResEmail
                      stopCreateAt
                    }
                  }
              }
            `,
            variables: {
              "stop": {
                "stop": {
                  "stopName": stop.stopName,
                  "stopType": stop.stopType,
                  "stopResEmail": stop.stopResEmail
                }
              }
            },
            update: (store, { data: { createStop } }) => {

              const query = gql `
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
              `;

              const data: any = store.readQuery({
                  query: query
              });

              data.allStops.nodes.push(createStop);
              store.writeQuery({ query: query, data });
            }
            }).subscribe(({ data }) => {
                      this.getContacts();
                      resolve(data.createStop.stop);
                  });
          });
      }

    updateContact(stop)
    {
        return new Promise((resolve, reject) => {

          this.apollo.mutate({
            mutation: gql`
            mutation ($stop: UpdateStopByStopIdInput!) {
              updateStopByStopId(input: $stop) {
                stop {
                  stopId
                  stopName
                  stopType
                  stopResEmail
                  stopCreateAt
                }
              }
            }
          `,
          variables: {
            "stop": {
              "stopId": stop.stopId,
              "stopPatch": {
                "stopName": stop.stopName,
                "stopType": stop.stopType,
                "stopResEmail": stop.stopResEmail
              }
            }
          },
          update: (store, { data: { updateStopByStopId } }) => {

            const query = gql `
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
            `;

            const data: any = store.readQuery({
                query: query
            });
            const updatedStop = data.allStops.nodes.find(o => o.stopId === stop.stopId);
            updatedStop.stopName = updateStopByStopId.stop.stopName;
            updatedStop.stopType = updateStopByStopId.stop.stopType;
            updatedStop.stopResEmail = updateStopByStopId.stop.stopResEmail;
            store.writeQuery({ query: query, data });
          }
          }).subscribe(({ data }) => {
                    this.getContacts();
                    console.log('updateContact() raw data' + ' ' + data);
                    console.log('updateContact() data.updateStopByStopId.stop' + ' ' + data.updateStopByStopId.stop);
                    resolve(data.updateStopByStopId.stop);
                });
        });
    }

    deleteContact(stop)
    {
        return new Promise((resolve, reject) => {

          this.apollo.mutate({
            mutation: gql`
            mutation ($stop: DeleteStopByStopIdInput!) {
                deleteStopByStopId(input: $stop) {
                  stop {
                    stopId
                    stopName
                    stopType
                    stopResEmail
                    stopCreateAt
                  }
                }
            }
          `,
          variables: {
            "stop": {
              "stopId": stop.stopId,
            }
          },
          update: (store, { data: { updateStopByStopId } }) => {

            const query = gql `
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
            `;

            const data: any = store.readQuery({
                query: query
            });
            const deletedStopIndex = data.allStops.nodes.findIndex(_stop => _stop.stopId === stop.stopId);
            data.allStops.nodes.splice(deletedStopIndex, 1);
            store.writeQuery({ query: query, data });
          }
          }).subscribe(({ data }) => {
                    this.getContacts();
                    resolve(data.deleteStopByStopId.stop);
                });
        });
    }
}