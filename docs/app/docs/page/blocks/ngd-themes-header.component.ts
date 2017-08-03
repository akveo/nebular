import { Component, HostBinding, Inject, OnInit, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

import { DocsService } from '../../docs.service';

@Component({
  selector: 'ngd-themes-header',
  template: `
    <div class="theme-header fixed-theme-header">
      <div class="theme-header-content">
        <span class="block-title"> Theme {{themeName}}</span>
          <span *ngIf="parentTheme">inherited from {{parentTheme}} theme</span>
        <div class="theme-filter">
          <input #searchInput [(ngModel)]="searchInputValue" (keyup)="searchTerms$.next(searchInput.value)">
          <span *ngIf="isWarning" class="filter-warning">Nothing found</span>
        </div>
      </div>
    </div>
`
})
export class NgdThemesHeaderComponent implements OnInit, OnDestroy {

  themeName: string;
  parentTheme: string;
  isWarning: boolean = false;
  themesPositions: any = [];
  searchInputValue: string;
  searchTerms$ = new Subject();

  private scrollSubscription: Subscription;
  private searchTermsSubscription: Subscription;
  private themesSubscription: Subscription;

  @HostBinding('class.transparent') isTransparent: boolean = true;

  constructor(private docsService: DocsService,
              @Inject(DOCUMENT) private document: Document) {  }


  ngOnInit() {
    this.themesSubscription = this.docsService.getThemesPositions()
      .subscribe(theme => {
        this.themesPositions = this.themesPositions.filter(item => item.name !== theme.name);
        this.themesPositions.push(theme);
      });

    this.scrollSubscription = Observable.fromEvent(window, 'scroll')
      .delay(1)
      .subscribe(event => this.setCurrentTheme(this.document.body.scrollTop));

    this.searchTermsSubscription = this.searchTerms$
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe((term: string) => this.docsService.filterData(term, this.themeName));
  }

  setCurrentTheme(scrollPosition) {
    const aboveThemes = this.themesPositions.filter(theme => ((theme.position - scrollPosition - 90) < 0));
    const belowThemes = this.themesPositions.filter(theme => !aboveThemes.includes(theme));
    if (aboveThemes.length === 0 ||
      ((Math.min.apply(null, belowThemes.map(theme => theme.position)) - scrollPosition - 90) < 100 )) {
      this.isTransparent = true;
    } else {
      ({
        name: this.themeName,
        parentTheme: this.parentTheme,
        isWarning: this.isWarning,
        searchInputValue: this.searchInputValue,
      } = aboveThemes.find(item => item.position === Math.max.apply(null, aboveThemes.map(theme => theme.position))));
      this.isTransparent = false;
    }
  }

  ngOnDestroy() {
    this.scrollSubscription.unsubscribe();
    this.searchTermsSubscription.unsubscribe();
    this.themesSubscription.unsubscribe();
  }
}
