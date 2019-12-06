import { Platform } from '@angular/cdk/platform';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useClass: Platform,
})
export class NbPlatform extends Platform {}
