import { Observable as ApolloObservable } from 'apollo-client/util/Observable';
import { ObservableQuery, WatchQueryOptions } from 'apollo-client';
import { observable } from 'rxjs';
import { QueryRef, Apollo } from 'apollo-angular';
import { R, TypedVariables } from 'apollo-angular/types';

export function fixObservable<T>(
  obs: ObservableQuery<T> | ApolloObservable<T>
): ObservableQuery<T> | ApolloObservable<T> {
  (obs as any)[observable] = () => obs;
  return obs;
}

export class PatchedQueryRef<T, V = R> extends QueryRef<T, V> {
  constructor(obsQuery: ObservableQuery<T>) {
    super(fixObservable<T>(obsQuery) as ObservableQuery<T>);
  }
}

export class PatchedApollo extends Apollo  {
  constructor() {
    super();
  }

  watchQuery<T, V = R>(options: WatchQueryOptions & TypedVariables<V>): QueryRef<T> {
    return new PatchedQueryRef<T>(this.getClient().watchQuery<T>({...options}));
  }
}