import {
  CdkCell,
  CdkCellDef,
  CdkColumnDef,
  CdkFooterCell,
  CdkFooterCellDef,
  CdkFooterRow,
  CdkFooterRowDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
  CdkHeaderRow,
  CdkHeaderRowDef,
  CdkRow,
  CdkRowDef,
  RowContext,
  STICKY_POSITIONING_LISTENER,
} from '@angular/cdk/table';

export const NbCdkRowDef = CdkRowDef;
export const NbCdkRow = CdkRow;
export const NbCdkCellDef = CdkCellDef;

export const NbCdkHeaderRowDef = CdkHeaderRowDef;
export const NbCdkHeaderRow = CdkHeaderRow;
export const NbCdkHeaderCellDef = CdkHeaderCellDef;

export const NbCdkFooterRowDef = CdkFooterRowDef;
export const NbCdkFooterRow = CdkFooterRow;
export const NbCdkFooterCellDef = CdkFooterCellDef;

export const NbCdkColumnDef = CdkColumnDef;

export const NbCdkCell = CdkCell;
export const NbCdkHeaderCell = CdkHeaderCell;
export const NbCdkFooterCell = CdkFooterCell;

export type NbRowContext<T> = RowContext<T>;

export const NB_STICKY_POSITIONING_LISTENER = STICKY_POSITIONING_LISTENER;
