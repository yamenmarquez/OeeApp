import { Component, OnInit, OnDestroy } from '@angular/core';

// import { NpstopService } from '../services/npstop.service';

// prueba
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'apollo-client/util/Observable';

// Types

import { Npstop } from '../masterdata.types';

interface AllNpStopsQueryResponse {
  allNpStops: {nodes: Npstop[]};
  loading: boolean;

}

@Component({
  selector: 'fuse-oeeapp-npstop',
  templateUrl: './npstop.component.html',
  styleUrls: ['./npstop.component.scss']
})
export class NpstopComponent implements OnInit, OnDestroy {

  npstops: any;
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
    this.querySubscription = this.apollo.watchQuery<AllNpStopsQueryResponse>({
      query: gql`
        query {
          allNpStops {
            nodes{
              npStopId
              npStopName
              npStopResEmail
              npStopCreateAt
            }
          }
        }
      `
    }).valueChanges.subscribe(({ data, loading }) => {
      this.loading = loading;
      this.npstops = data.allNpStops;
      // To-do Hacer algo mientras loading is true
      console.log(this.loading);
      console.log('Paradas No planificadas', this.npstops.nodes);
      // ngx-datatable
      this.rows = this.npstops.nodes;
    }, (error) => {
      // To-do mejorar gestión de errores
      console.log('Error al enviar la consulta.', error);
    });

  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
}
