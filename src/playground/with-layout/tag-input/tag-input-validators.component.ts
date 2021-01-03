import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'nb-app-tag-input-validators',
  template: `
    <nb-card>
      <nb-card-header>Max length 5, start with '@'</nb-card-header>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          placeholder="add a new tag"
          fullWidth
          [validators]="validators"
          [errorMessages]="errorMessages"
          [tags]="['@Java', '@C#', '@TS']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
    <nb-card>
      <nb-card-header>Numbers only, async validators</nb-card-header>
      <nb-card-body>
        <nb-tag-input
          status="primary"
          tagStatus="primary"
          placeholder="add a new tag"
          fullWidth
          [asyncValidators]="asyncValidators"
          [errorMessages]="asyncErrorMessages"
          [tags]="['111', '222', '333']">
        </nb-tag-input>
      </nb-card-body>
    </nb-card>
  `,
})
export class TagInputValidatorsComponent {

  validators = [Validators.maxLength(5), this.startsWithAt];
  asyncValidators = [this.validateAsync];

  errorMessages = {
    'maxlength': `Tag's max length is 5`,
    'startsWithAt@': `Tag needs to start with '@'`,
  };

  asyncErrorMessages = {
    'isNaN': 'Numbers only',
  };

  private startsWithAt(control: FormControl) {
    if (control.value.charAt(0) !== '@' && control.value !== '') {
      return {
        'startsWithAt@': true,
      }
    }

    return null;
  }

  private validateAsync(control: FormControl): Promise<any> {
    return new Promise(resolve => {
      const result = Number.isNaN(control.value) ? {
        'isNaN': true,
      } : null;

      setTimeout(() => {
        resolve(result);
      }, 400);
    })
  }
}
