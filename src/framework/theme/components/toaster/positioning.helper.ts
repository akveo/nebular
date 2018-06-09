/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { ComponentRef, Injectable } from '@angular/core';
import { NbToastPosition, NbToastRegistryBag } from './model';

@Injectable()
export class NbPositioningHelper {

  private static positionCalculator = {
    [NbToastPosition.TOP_RIGHT](ref: ComponentRef<any>, registry: NbToastRegistryBag[]): { top: number, right: number } {
      const [top, right] = this.calcDimens(ref, registry, NbToastPosition.TOP_RIGHT);
      return { top, right };
    },

    [NbToastPosition.BOTTOM_RIGHT](ref: ComponentRef<any>, registry: NbToastRegistryBag[]): { bottom: number, right: number } {
      const [bottom, right] = this.calcDimens(ref, registry, NbToastPosition.BOTTOM_RIGHT);
      return { bottom, right };
    },

    [NbToastPosition.TOP_LEFT](ref: ComponentRef<any>, registry: NbToastRegistryBag[]): { top: number, left: number } {
      const [top, left] = this.calcDimens(ref, registry, NbToastPosition.TOP_LEFT);
      return { top, left };
    },

    [NbToastPosition.BOTTOM_LEFT](ref: ComponentRef<any>, registry: NbToastRegistryBag[]): { bottom: number, left: number } {
      const [bottom, left] = this.calcDimens(ref, registry, NbToastPosition.BOTTOM_LEFT);
      return { bottom, left };
    },

    calcDimens(ref: ComponentRef<any>, registry: NbToastRegistryBag[], position: NbToastPosition): [number, number] {
      const sameTypeToasts: any[] = registry.filter(({ portal }) => portal.position === position);
      const currentIndex = sameTypeToasts.findIndex(item => item.ref === ref);
      const margin = sameTypeToasts[currentIndex].portal.margin;
      const dimen: number = this.calcMainDimen(currentIndex, sameTypeToasts, margin);

      return [dimen + margin, margin];
    },

    calcMainDimen(currIndex: number, registry: NbToastRegistryBag[], margin: number): number {
      return registry.slice(0, currIndex).reduce((top: number, item: { ref: ComponentRef<any> }) => {
        const { height } = item.ref.location.nativeElement.getBoundingClientRect();
        return height + margin + top;
      }, 0)
    },
  };

  calcPosition(ref: ComponentRef<any>, registry: NbToastRegistryBag[]): ClientRect {
    const bag = registry.find(bag => bag.ref === ref);
    const positionCalculator: Function = NbPositioningHelper.positionCalculator[bag.portal.position];
    return positionCalculator.call(NbPositioningHelper.positionCalculator, ref, registry);
  }
}
