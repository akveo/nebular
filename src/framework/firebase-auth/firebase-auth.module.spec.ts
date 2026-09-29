import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  NbFirebaseFacebookStrategy,
  NbFirebaseGoogleStrategy,
  NbFirebasePasswordStrategy,
  NbFirebaseTwitteStrategy,
} from './public_api';
import { NbFirebaseAuthModule } from './firebase-auth.module';

describe('NbFirebaseAuthModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NbFirebaseAuthModule],
      providers: [
        {
          provide: AngularFireAuth,
          useValue: jasmine.createSpyObj<AngularFireAuth>('AngularFireAuth', [
            'confirmPasswordReset',
            'createUserWithEmailAndPassword',
            'sendPasswordResetEmail',
            'signInWithEmailAndPassword',
            'signInWithPopup',
            'signOut',
          ]),
        },
      ],
    });
  });

  it('should provide all compatibility authentication strategies', () => {
    expect(TestBed.inject(NbFirebasePasswordStrategy)).toBeTruthy();
    expect(TestBed.inject(NbFirebaseGoogleStrategy)).toBeTruthy();
    expect(TestBed.inject(NbFirebaseFacebookStrategy)).toBeTruthy();
    expect(TestBed.inject(NbFirebaseTwitteStrategy)).toBeTruthy();
  });

  it('should preserve the password strategy setup contract', () => {
    const options = { name: 'firebase' };

    expect(NbFirebasePasswordStrategy.setup(options)).toEqual([NbFirebasePasswordStrategy, options]);
  });
});
