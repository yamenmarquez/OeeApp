import { Injectable, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';


@Injectable()
export class NpstopService implements OnDestroy{


  loading: boolean;
  npstops: any;
  private querySubscription: Subscription;

  constructor(private apollo: Apollo) { }

  getAllNpStops() {
    console.log('Se ejecta la funcion de npstop.service');
    this.querySubscription = this.apollo.watchQuery<any>({
      query: gql`
        query {
          allNpStops {
            edges {
              node{
                npStopId
                npStopName
                npStopResEmail
                npStopCreateAt
              }
            }
          }
        }
      `
    }).valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.npstops = data.allNpStops.edges.node;
      console.log('Paradas No planificadas', this.npstops);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
