/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-accordion',
  templateUrl: './contract-accordion.component.html',
  styleUrls: ['./contract-accordion.component.scss']
})
export class ContractAccordionComponent implements OnInit {

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
    
  constructor() { }

  ngOnInit(): void {
  }

}
