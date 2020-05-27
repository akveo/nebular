import { NgModule } from '@angular/core';
import { NbFirebasePasswordStrategy, FirebaseAuthModule } from '@nebular/firebase-auth';
import { FirebasePlaygroundRoutingModule } from './firebase-routing.module';
import { FirebasePlaygroundComponent } from './firebase-playground.component';
import { CommonModule } from '@angular/common';
import { NbAuthJWTToken, NbAuthModule } from '@nebular/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { FirebaseAuthShowcaseComponent } from './showcase/firebase-showcase.component';
import { FirebaseAPIService } from './firebase-api.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NbFirebaseGoogleStrategy } from '../../../framework/firebase-auth/strategies/google/firebase-google.strategy';

@NgModule({
  imports: [
    CommonModule,
    // developers test firebase app
    // TODO: change for some better alternative
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
            class: NbAuthJWTToken, // TODO: should be custom token?
          },
          login: {
            redirect: {
              success: '/firebase/result',
            },
          },
          register: {
            redirect: {
              success: '/firebase/result',
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
      ],
    }),
  ],
  declarations: [
    FirebasePlaygroundComponent,
    FirebaseAuthShowcaseComponent,
  ],
  providers: [
    FirebaseAPIService,
  ],
})
export class FirebasePlaygroundModule {
}
