/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */


import { NgModule } from '@angular/core';
import { NbFirebasePasswordStrategy } from './strategies/password/firebase-password.strategy';
import { NbFirebaseGoogleStrategy } from './strategies/google/firebase-google.strategy';


@NgModule({
  providers: [
    NbFirebasePasswordStrategy,
    NbFirebaseGoogleStrategy,
  ],
})
export class FirebaseAuthModule { }
