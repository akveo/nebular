import { Observable } from 'rxjs/Observable';

export abstract class NbRoleProvider {
  abstract getRole(): Observable<string>;
}
