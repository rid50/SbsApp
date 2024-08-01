import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';

import { ActivatedRoute } from '@angular/router';
import { ActivatedRoutesService } from '../services/activated-routes.service';

@Component({
  selector: 'app-most-wanted',
  templateUrl: './most-wanted.component.html',
  styleUrls: ['./most-wanted.component.scss']
})
export class MostWantedComponent implements OnInit {

  constructor(private contractService: ContractService,
    private route: ActivatedRoute,
    private activatedRoutesService: ActivatedRoutesService) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  ngOnInit(): void {
    this.activatedRoutesService.setRoutePathForDrawer(this.route);
  }

}
