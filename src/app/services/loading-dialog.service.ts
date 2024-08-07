import { Injectable } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Injectable()
export class LoadingDialogService {
  private opened = false;
  private dialogRef!: MatDialogRef<LoadingDialogComponent>;

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    if (!this.opened) {
      this.opened = true;
      this.dialogRef = this.dialog.open(LoadingDialogComponent, {
        data: undefined,
        maxHeight: '100%',
        width: '400px',
        maxWidth: '100%',
        disableClose: true,
        hasBackdrop: true,
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.opened = false;
      });
    }
  }

  hideDialog():void {
    this.dialogRef.close();
  }
}
