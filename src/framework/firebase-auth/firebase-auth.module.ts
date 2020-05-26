/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { NgModule } from '@angular/core';
import { NbFirebasePasswordStrategy } from './strategies/firebase-password.strategy';


@NgModule({
  providers: [
    NbFirebasePasswordStrategy,
  ],
})
export class FirebaseAuthModule { }
