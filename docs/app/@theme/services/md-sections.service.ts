import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgdMdSection } from './text.service';

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
