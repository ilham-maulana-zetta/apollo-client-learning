import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apollo: Apollo) { }

  getUsers(last_name: string): Observable<any> {
    return this.apollo.query({
      query: gql`
      query ($last_name: String) {
        GetAllUsers (
          last_name: $last_name
        ) {
          _id
          first_name
          last_name
          civility
        }
      }
      `,
      variables: {
        last_name
      }
    })
  }

}
