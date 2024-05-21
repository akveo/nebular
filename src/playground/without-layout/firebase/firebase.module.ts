import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { NbAuthModule } from '@nebular/auth';
import { NbFirebaseAuthModule, NbFirebasePasswordStrategy, NbFirebaseGoogleStrategy } from '@nebular/firebase-auth';

import { FirebaseAPIService } from './firebase-api.service';
import { FirebasePlaygroundComponent } from './firebase-playground.component';
import { FirebasePlaygroundRoutingModule } from './firebase-routing.module';
import { IdentityProvidersAuthShowcaseComponent } from './identity-proders-auth-showcase/identity-providers-auth-showcase.component';
import { PasswordAuthShowcaseComponent } from './password-auth-showcase/password-auth-showcase.component';

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBEvySH74-sISCTkCC6lXUd3zzYj26GjRk',
      authDomain: 'auth-sample-f48f1.firebaseapp.com',
      databaseURL: 'https://auth-sample-f48f1.firebaseio.com',
      projectId: 'auth-sample-f48f1',
      storageBucket: 'auth-sample-f48f1.appspot.com',
      messagingSenderId: '246754092661',
      appId: '1:246754092661:web:c2606b9ecdbed579673a3c',
    }),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FirebasePlaygroundRoutingModule,
    NbFirebaseAuthModule,
    NbAuthModule.forRoot({
      forms: {
        login: {
          strategy: 'password',
          rememberMe: true,
          socialLinks: [],
        },
        register: {
          strategy: 'password',
          terms: true,
          socialLinks: [],
        },
        logout: {
          strategy: 'password',
        },
        requestPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        resetPassword: {
          strategy: 'password',
          socialLinks: [],
        },
        validation: {
          password: {
            required: true,
            minLength: 6,
            maxLength: 50,
          },
          email: {
            required: true,
          },
          fullName: {
            required: false,
            minLength: 4,
            maxLength: 50,
          },
        },
      },
      strategies: [
        NbFirebasePasswordStrategy.setup({
          name: 'password',
          login: {
            redirect: {
              success: 'example/firebase/password-showcase',
            },
          },
          register: {
            redirect: {
              success: 'example/firebase/password-showcase',
            },
          },
          logout: {
            redirect: {
              success: 'example/firebase/login',
            },
          },
          requestPassword: {
            redirect: {
              success: 'example/firebase/login',
            },
          },
          resetPassword: {
            redirect: {
              success: 'example/firebase/login',
            },
          },
        }),
        NbFirebaseGoogleStrategy.setup({
          name: 'google',
        }),
      ],
    }),
  ],
  declarations: [FirebasePlaygroundComponent, PasswordAuthShowcaseComponent, IdentityProvidersAuthShowcaseComponent],
  providers: [FirebaseAPIService],
})
export class FirebasePlaygroundModule {}
