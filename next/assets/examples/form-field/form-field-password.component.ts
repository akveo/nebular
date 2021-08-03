import { Component } from '@angular/core';

@Component({
 template: `
   <nb-card size="small">
     <nb-card-body>

       <nb-form-field>
         <input [type]="getInputType()" nbInput>
         <button nbSuffix nbButton ghost (click)="toggleShowPassword()">
           <nb-icon [icon]="showPassword ? 'eye-outline' : 'eye-off-2-outline'"
                    pack="eva"
                    [attr.aria-label]="showPassword ? 'hide password' : 'show password'">
           </nb-icon>
         </button>
       </nb-form-field>

     </nb-card-body>
   </nb-card>
 `,
})
export class FormFieldPasswordComponent {
  showPassword = true;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
}
