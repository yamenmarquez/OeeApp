import { Component, OnInit, OnDestroy } from '@angular/core';

// import { NpstopService } from '../services/npstop.service';

// prueba
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';

// Types

import { Stop } from '../masterdata.types';

interface AllStopsQueryResponse {
  allStops: {nodes: Stop[]};
  loading: boolean;

}

@Component({
  selector: 'fuse-oeeapp-npstop',
  templateUrl: './npstop.component.html',
  styleUrls: ['./npstop.component.scss']
})
export class NpstopComponent implements OnInit, OnDestroy {

  stops: any;
  loading: boolean;
  private querySubscription: Subscription;

  // ngx-datatable
  rows: any[];
  loadingIndicator = false;
  reorderable = true;

  constructor( private apollo: Apollo) {

  }

  ngOnInit() {
    console.log('ngOnInit se esta ejecutando');
    this.querySubscription = this.apollo.watchQuery<AllStopsQueryResponse>({
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
    }).valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.stops = data.allStops;
      // To-do Hacer algo mientras loading is true
      console.log(this.loading);
      console.log('Paradas No planificadas', this.stops);
      // ngx-datatable
      this.rows = this.stops.nodes;
    }, (error) => {
      // To-do mejorar gestión de errores
      console.log('Error al enviar la consulta.', error);
    });

  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
