import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable()
export class NpstopService {

  constructor(private apollo: Apollo) { }

  getAllNpStops() {
    console.log('Se ejecta la funcion de npstop.service');
    this.apollo.query({
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
    }).subscribe(({ data }) => {
      console.log('Paradas No planificadas', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
