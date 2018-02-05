import { Observable } from 'rxjs/Observable';

export interface NbUserProvider<T> {

  load(force: boolean): Observable<T>;
}
