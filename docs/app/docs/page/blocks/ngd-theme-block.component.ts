import { Component, OnInit, Input, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'ngd-theme-block',
  template: `
  <div class="theme-header" >
    <div class="theme-title">{{ themeTitle }} Theme
      <span *ngIf="parentTheme">inherited from {{parentTheme}} theme</span>
    </div>
    <div class="input-group">
      <input #searchInput
        type="text"
        class="form-control"
        [ngModel]="searchTermModel"
        [class.form-control-warning]="isWarning && searchInput.value"
        placeholder="Search for..."
        (keyup.enter)="filterThemeContent(searchInput.value)">
      <span class="input-group-btn">
        <button 
          class="btn btn-success"
          (click)="filterThemeContent(searchInput.value)">
          Search
        </button>
      </span>
    </div>
    <div *ngIf="isWarning && searchInput.value" class="filter-warning">Nothing filtered</div>
  </div>
  <div class="table-container">  
    <table class="table-striped table theme-table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Value</td>
          <td>Parent</td>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let prop of filteredContent;" fragment="{{prop.name}}" tableCell ngdFragment>
          <td>
            <a [routerLink]="" fragment="{{prop.name}}" class="fragment"></a><span>{{ prop.name }}</span>
          </td>
          <td ngdSassValue>{{ prop.value }}</td>
          <td class="theme-parents-cell">
            <a routerLink="/docs/themes/{{prop.parents[0]?.theme}}" fragment="{{prop.parents[0]?.prop}}" tableCell ngdFragment>
              {{ prop.parents[0]?.prop }}
              <span *ngIf="prop.parents[0] && prop.parents[0].theme !== themeName">({{prop.parents[0]?.theme}})</span>
            </a>
            <div *ngIf="prop.parents.length > 1" class="theme-prop-parents">
              <span *ngFor="let parent of prop.parents | slice:1">
                <i class="inheritance-icon ion-arrow-left-c"></i>
                <a routerLink="/docs/themes/{{parent.theme}}" fragment="{{parent.prop}}" remoteLink ngdFragment>
                  {{ parent.prop }}
                  <span *ngIf="parent.theme !== themeName">({{parent.theme}})</span>
                  </a>
               </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
`,
})
export class NgdThemeComponent implements OnInit, OnDestroy {
//TODO: remove warning
  themeTitle: string;
  filteredContent: any;
  themeContent: any;
  themeName: string;
  parentTheme: string;

  isWarning: boolean = false;
  searchTermModel: string = '';

  private fragmentSubscription: Subscription;

  @Input('block')
  set setProps(block: any) {
    this.themeTitle = block.name;
    this.themeContent = Object.keys(block.blockData.data).map(key => block.blockData.data[key]);
    this.filteredContent = this.themeContent;
    this.themeName = block.blockData.name;
    this.parentTheme = block.blockData.parent;
  }

  constructor(private renderer: Renderer2,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.fragmentSubscription = this.route.fragment
      .subscribe(fr => {
        this.filterThemeContent('');
        this.searchTermModel = '';
      });
  }

  filterThemeContent(term) {
    if (term !== this.searchTermModel) {
      this.searchTermModel = term;
      const filterResult = this.themeContent.filter(item => {
        return new RegExp(`${term}`, 'gi').test(`${item.name} ${item.value}`);
      });
      if (filterResult.length > 0) {
        this.filteredContent = filterResult;
        this.isWarning = false;
      } else {
        this.filteredContent = this.themeContent;
        this.isWarning = true;
      }
      this.renderer.setProperty(document.body, 'scrollTop', 0);
    }
  }

  ngOnDestroy() {
    this.fragmentSubscription.unsubscribe();
  }
}
