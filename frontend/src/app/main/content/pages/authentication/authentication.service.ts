import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable()
export class AuthenticationService {

  constructor(private apollo: Apollo) { }

  authenticate(email: String, passwd: String) {

    this.apollo.mutate({
      mutation: gql`
      mutation ($auth:AuthenticateInput!) {
          authenticate(input:$auth) {
              jwtToken
          }
      }
    `,
    variables: {
      auth: {
        email: email,
        passwd: passwd
      }
    }
    }).subscribe(({ data }) => {
      console.log('Token', data.authenticate.jwtToken);
    },(error) => {
      console.log('there was an error sending the query', error);
    });

    console.log('Se esta ejecutando la funcion del servicio');
    console.log(email);
    console.log(passwd);
    
  };
}
