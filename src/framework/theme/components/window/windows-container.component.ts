import { Component, ViewContainerRef, ViewChild } from '@angular/core';

@Component({
  selector: 'nb-windows-container',
  templateUrl: './windows-container.component.html',
  styleUrls: ['./windows-container.component.scss'],
})
export class NbWindowsContainerComponent {
  @ViewChild('viewContainerRef', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;
}
