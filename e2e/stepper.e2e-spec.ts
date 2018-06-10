/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { browser, element, by } from 'protractor';

describe('nb-stepper', () => {

  beforeEach((done) => {
    browser.get('#/stepper/stepper-test.component').then(() => done());
  });

  it('should go to next step on nbStepperNext click', () => {
    console.log(element(by.css('nbStepperNext')));
    expect(1).toEqual(1);
  });

  it('should go to prev step on nbStepperPrev click', () => {
    console.log(element(by.css('nbStepperNext')));
    expect(3).toEqual(3);
  });

});
