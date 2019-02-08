import { NbTreeGridNode } from '@nebular/theme';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  childrenElements?: PeriodicElement[];
}

export const DATA: NbTreeGridNode<PeriodicElement>[] = [
  {
    data: { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  },
  {
    data: { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    children: [
      {
        data: { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
        children: [
          { data: { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' } },
          { data: { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' } },
        ],
      },
    ],
  },
  {
    data: { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    children: [
      { data: { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' } },
      { data: { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' } },
    ],
  },
];
