import { CollectionViewer, ListRange } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

export interface NbCollectionViewer extends CollectionViewer {
  viewChange: Observable<ListRange>;
}
