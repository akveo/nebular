import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { NgdMdSection } from './text.service';

/**
 * We store the last viewed section here to prevent flickering when switching between articles.
 * When a user clicks on an article link, `ngd-md-block` is destroyed and a new one is created.
 * This service replays the last viewed article to the newly created `ngd-md-block` to show it
 * while a requested article is loading.
 * */
@Injectable()
export class NgdLastViewedSectionService {
  private _sections = new ReplaySubject<NgdMdSection[]>(1);

  setSection(section: NgdMdSection[]): void {
    this._sections.next(section);
  }

  getSections(): Observable<NgdMdSection[]> {
    return this._sections.asObservable();
  }
}
