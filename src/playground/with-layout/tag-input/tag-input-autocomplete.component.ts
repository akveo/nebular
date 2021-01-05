import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nb-app-tag-input-autocomplete',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          placeholder="add a new tag"
          autoComplete
          [autoCompleteOptions]="options"
          (textChanged)="onTextChanged($event)"
          (tagAdded)="onTagAdded($event)"
          fullWidth>
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
  `,
})
export class TagInputAutoCompleteComponent {
  options;

  onTagAdded(e) {
    this.options = of([]);
  }

  onTextChanged(e) {
    this.options = of(['Java', 'Python', 'C#', 'Go', 'PHP', 'F#'])
      .pipe(
        map(options => options.filter(o => o.toLowerCase().includes(e.toLowerCase()))),
      );
  }
}
