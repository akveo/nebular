/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { DEFAULT_MEDIA_BREAKPOINTS, NbMediaBreakpointsService, NB_MEDIA_BREAKPOINTS } from '@nebular/theme';

describe('breakpoint-service', () => {
  let breakpointService: NbMediaBreakpointsService;

  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [{ provide: NB_MEDIA_BREAKPOINTS, useValue: DEFAULT_MEDIA_BREAKPOINTS }, NbMediaBreakpointsService],
    });
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(
    waitForAsync(
      inject([NbMediaBreakpointsService], (_breakpointService) => {
        breakpointService = _breakpointService;
      }),
    ),
  );

  const total = 8;
  it(`has ${total} default breakpoints`, () => {
    expect(breakpointService.getBreakpoints().length).toEqual(total);
  });

  describe('getByWidth', () => {
    it(`handles unknown breakpoint`, () => {
      expect(breakpointService.getByWidth(-1).name).toEqual('unknown');
      expect(breakpointService.getByWidth(Number.NEGATIVE_INFINITY).name).toEqual('unknown');
      expect(breakpointService.getByWidth(Number.NaN).name).toEqual('unknown');
      expect(breakpointService.getByWidth(undefined).name).toEqual('unknown');
    });

    it(`has correct xs breakpoint`, () => {
      expect(breakpointService.getByWidth(0).name).toEqual('xs');
      expect(breakpointService.getByWidth(399).name).toEqual('xs');
    });

    it(`has correct is breakpoint`, () => {
      expect(breakpointService.getByWidth(400).name).toEqual('is');
      expect(breakpointService.getByWidth(490).name).toEqual('is');
      expect(breakpointService.getByWidth(575).name).toEqual('is');
    });

    it(`has correct sm breakpoint`, () => {
      expect(breakpointService.getByWidth(576).name).toEqual('sm');
      expect(breakpointService.getByWidth(690).name).toEqual('sm');
      expect(breakpointService.getByWidth(767).name).toEqual('sm');
    });

    it(`has correct md breakpoint`, () => {
      expect(breakpointService.getByWidth(768).name).toEqual('md');
      expect(breakpointService.getByWidth(934).name).toEqual('md');
      expect(breakpointService.getByWidth(991).name).toEqual('md');
    });

    it(`has correct lg breakpoint`, () => {
      expect(breakpointService.getByWidth(992).name).toEqual('lg');
      expect(breakpointService.getByWidth(1001).name).toEqual('lg');
      expect(breakpointService.getByWidth(1199).name).toEqual('lg');
    });

    it(`has correct xl breakpoint`, () => {
      expect(breakpointService.getByWidth(1200).name).toEqual('xl');
      expect(breakpointService.getByWidth(1303).name).toEqual('xl');
      expect(breakpointService.getByWidth(1399).name).toEqual('xl');
    });

    it(`has correct xxl breakpoint`, () => {
      expect(breakpointService.getByWidth(1400).name).toEqual('xxl');
      expect(breakpointService.getByWidth(1556).name).toEqual('xxl');
      expect(breakpointService.getByWidth(1599).name).toEqual('xxl');
    });

    it(`has correct xxxl breakpoint`, () => {
      expect(breakpointService.getByWidth(1600).name).toEqual('xxxl');
      expect(breakpointService.getByWidth(1900).name).toEqual('xxxl');
      expect(breakpointService.getByWidth(Number.POSITIVE_INFINITY).name).toEqual('xxxl');
    });
  });

  describe('getByName', () => {
    it(`handles unknown breakpoint`, () => {
      expect(breakpointService.getByName('unknown name').width).toEqual(NaN);
    });

    it('has correct xs breakpoint', () => {
      expect(breakpointService.getByName('xs').width).toEqual(0);
    });

    it('has correct sm breakpoint', () => {
      expect(breakpointService.getByName('sm').width).toEqual(576);
    });

    it('has correct md breakpoint', () => {
      expect(breakpointService.getByName('md').width).toEqual(768);
    });

    it('has correct lg breakpoint', () => {
      expect(breakpointService.getByName('lg').width).toEqual(992);
    });

    it('has correct xl breakpoint', () => {
      expect(breakpointService.getByName('xl').width).toEqual(1200);
    });

    it('has correct xxl breakpoint', () => {
      expect(breakpointService.getByName('xxl').width).toEqual(1400);
    });

    it('has correct xxxl breakpoint', () => {
      expect(breakpointService.getByName('xxxl').width).toEqual(1600);
    });
  });
});
