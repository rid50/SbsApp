import { Component, OnInit } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule],
})
export class LoadingDialogComponent {
}
