import { Component } from '@angular/core';
import { NbModalService } from '@nebular/theme/components/modal/modal.service';

@Component({
  selector: 'nb-modal',
  template: `
    <nb-card [style.width.px]="600" [style.height.px]="500">
      <nb-card-header>Lorem Ipsum Modal Showcase</nb-card-header>
      <nb-card-body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras convallis tincidunt tincidunt.
        Vestibulum vulputate maximus massa vel tristique. Suspendisse potenti. Duis aliquet purus sed dictum dictum.
        Donec fringilla, purus at fermentum imperdiet, velit enim malesuada turpis, quis luctus arcu arcu nec orci.
        Duis eu mattis felis. Quisque sollicitudin elementum nunc vel tincidunt. Vestibulum egestas mi nec
        iaculis varius. Morbi in risus sed sapien ultricies feugiat. Quisque pulvinar mattis purus,
        in aliquet massa aliquet et.
        Phasellus pretium eu velit vel posuere. Class aptent taciti sociosqu ad litora torquent per conubia nostra,
        per inceptos himenaeos. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Fusce sodales urna sed sapien mollis ultrices. Fusce pellentesque dui id neque feugiat lobortis.
        Aenean vel erat eu dolor lacinia commodo. Curabitur lectus neque, condimentum eget augue ac, vestibulum
        placerat turpis. Donec vel sem et dolor blandit luctus ut ac nisl. Donec tortor erat, luctus a libero quis,
        convallis vehicula felis. Mauris arcu nunc, condimentum vitae pretium a, sagittis ut nibh. Donec convallis
        facilisis ligula, in congue augue porta sit amet. Fusce neque urna, tincidunt id arcu eget, luctus hendrerit
        augue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Morbi euismod turpis non facilisis pellentesque. Phasellus tristique lobortis venenatis. Praesent
        ut fermentum massa,
        at ultricies augue. Praesent libero eros, lobortis quis pretium efficitur, lobortis ac sapien. Donec auctor
        congue ipsum in ultrices. In at leo ipsum. Fusce nec elementum sem, semper molestie sem. Ut porttitor nulla
        ligula, ornare lobortis justo finibus vel. Curabitur egestas eleifend dignissim. Integer eleifend euismod
        dolor ac maximus.
        Maecenas luctus aliquet turpis. Maecenas dolor ex, mattis in euismod ut, gravida vitae nisl.
        Maecenas tincidunt nec
        nisi ut rhoncus. Nullam tincidunt dolor neque, et egestas ante bibendum eu. Mauris sagittis risus vel odio
        aliquet sollicitudin. Morbi pulvinar, lectus at tristique porttitor, mauris erat pretium justo, vitae sodales
        purus augue eget purus. Ut fringilla nisi ante, nec eleifend nisi viverra id. Donec dapibus tincidunt massa
        eu ornare.
        Quisque at nisi mattis, viverra purus vel, tincidunt turpis. Nulla ac ipsum ac diam pulvinar pretium.
        Proin vitae neque
        consequat, fringilla quam nec, imperdiet neque. Cras eleifend viverra lacus. Aenean sit amet tortor ultrices,
        rhoncus risus in, mollis risus. Quisque in faucibus arcu. Donec blandit id diam sit amet ultrices. Curabitur
        ac eros at mi tempus dapibus sed sit amet metus. Integer viverra, leo nec semper laoreet, nibh metus viverra
        turpis, at tempor nisl mauris in enim. Vestibulum eu hendrerit diam. Praesent gravida erat eu neque ornare,
        id porta nulla commodo. Ut quis nisi nisl. Nulla metus turpis, porta et mi mollis, iaculis venenatis est.
        Donec congue, lectus et interdum hendrerit, ipsum mauris imperdiet turpis, ut lacinia lacus eros pharetra
        est. Vivamus interdum, sapien id maximus porta, leo nibh pretium erat, vitae condimentum dolor magna eget
        nunc.
      </nb-card-body>
    </nb-card>
  `,
})
export class NbModalComponent {
}

@Component({
  selector: 'nb-modal-showcase',
  template: `
    <button class="btn btn-primary" (click)="open()">Open Modal</button>
  `,
  styles: [
      `
      /deep/ nb-layout-column {
        height: 80vw;
      }
    `,
  ],
})
export class NbModalShowcaseComponent {
  constructor(private modalService: NbModalService) {
  }

  open() {
    this.modalService.show(NbModalComponent, { hasBackdrop: true, closeOnBackdropClick: true });
  }
}
