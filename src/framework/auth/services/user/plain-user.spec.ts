/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed, inject, async } from '@angular/core/testing';
import { NbPlainUserProvider } from './plain-user.provider';
import { NB_AUTH_USER, NB_AUTH_USER_PROVIDER } from '../../auth.options';

describe('plain user', () => {

  let userProvider;

  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NB_AUTH_USER,
          useValue: {
            username: 'test user',
            email: 'test@test.com',
            avatar: '',
          },
        },
        { provide: NB_AUTH_USER_PROVIDER, userClass: NbPlainUserProvider },
      ],
    });
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NB_AUTH_USER_PROVIDER],
    (_userProvider) => {
      userProvider = _userProvider
    },
  )));

  it(`has empty default state`, () => {
    // console.log(userProvider);
  });

});

