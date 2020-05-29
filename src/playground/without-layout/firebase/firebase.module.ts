import { NgModule } from '@angular/core';
import { NbFirebasePasswordStrategy, FirebaseAuthModule } from '@nebular/firebase-auth';
import { FirebasePlaygroundRoutingModule } from './firebase-routing.module';
import { FirebasePlaygroundComponent } from './firebase-playground.component';
import { CommonModule } from '@angular/common';
import { NbAuthJWTToken, NbAuthModule } from '@nebular/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { PasswordAuthShowcaseComponent } from './password-auth-showcase/password-auth-showcase.component';
import { FirebaseAPIService } from './firebase-api.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NbFirebaseGoogleStrategy } from '../../../framework/firebase-auth/strategies/google/firebase-google.strategy';
import { GoogleAuthShowcaseComponent } from './google-auth-showcase/google-auth-showcase.component';
import { NbFirebaseFacebookStrategy } from '../../../framework/firebase-auth/strategies/facebook/firebase-facebook.strategy';

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
    FirebaseAuthModule,
    NbAuthModule.forRoot({
      forms: {
        login: {
          strategy: 'password',
          rememberMe: false,
          socialLinks: [],
        },
        register: {
          strategy: 'password',
          terms: false,
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
          token: {
            class: NbAuthJWTToken,
          },
          login: {
            redirect: {
              success: '/firebase/password-showcase',
            },
          },
          register: {
            redirect: {
              success: '/firebase/password-showcase',
            },
          },
          logout: {
            redirect: {
              success: '/firebase/login',
            },
          },
          requestPassword: {
            redirect: {
              success: '/firebase/login',
            },
          },
          resetPassword: {
            redirect: {
              success: '/firebase/login',
            },
          },
        }),
        NbFirebaseGoogleStrategy.setup({
          name: 'google',
          token: {
            class: NbAuthJWTToken, // TODO: should be custom token?
          },
        }),
        NbFirebaseFacebookStrategy.setup({
          name: 'facebook',
          token: {
            class: NbAuthJWTToken, // TODO: should be custom token?
          },
        }),
      ],
    }),
  ],
  declarations: [
    FirebasePlaygroundComponent,
    PasswordAuthShowcaseComponent,
    GoogleAuthShowcaseComponent,
  ],
  providers: [
    FirebaseAPIService,
  ],
})
export class FirebasePlaygroundModule {
}
