import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgdMdSection } from './text.service';

/**
 * This service stores sections for NgdMdBLockComponent.
 * It's necessary in order to show old content before new content is loaded to prevent flickering.
 * */
@Injectable()
export class NgdMdSectionsService {
  private _sections = new BehaviorSubject<NgdMdSection[]>([]);

  public setSections(value: NgdMdSection[]): void {
    this._sections.next(value);
  }

  public get sections$(): Observable<NgdMdSection[]> {
    return this._sections.asObservable();
  }

  public get sections(): NgdMdSection[] {
    return this._sections.value;
  }
}
