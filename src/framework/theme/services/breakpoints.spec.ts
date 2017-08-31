/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { TestBed, inject, async } from '@angular/core/testing';

import { DEFAULT_MEDIA_BREAKPOINTS, NbMediaBreakpointsService } from './breakpoints.service';
import { nbMediaBreakpointsToken } from '../theme.options';

describe('breakpoint-service', () => {
  let breakpointService: NbMediaBreakpointsService;

  beforeEach(() => {
    // Configure testbed to prepare services
    TestBed.configureTestingModule({
      providers: [
        { provide: nbMediaBreakpointsToken, useValue: DEFAULT_MEDIA_BREAKPOINTS },
        NbMediaBreakpointsService,
      ],
    });
  });

  // Single async inject to save references; which are used in all tests below
  beforeEach(async(inject(
    [NbMediaBreakpointsService],
    (_breakpointService) => {
      breakpointService = _breakpointService
    },
  )));

  const total = 7;
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
      expect(breakpointService.getByWidth(575).name).toEqual('xs');
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
});
