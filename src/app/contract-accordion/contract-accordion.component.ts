import { CdkAccordion, CdkAccordionItem } from '@angular/cdk/accordion';
import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { PurchaseRequisition } from '../models/purchase-requisition';

@Component({
  selector: 'app-contract-accordion',
  templateUrl: './contract-accordion.component.html',
  styleUrls: ['./contract-accordion.component.scss']
})
export class ContractAccordionComponent implements AfterViewInit {

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  recordsCount = 0

  // @Input() pr: PurchaseRequisition

  // items = ['Purchase Requisitions ()', 'Pending Store Receipt Vouchers (0)', 'Pending Delivery Notes (0)', 'Outstanding Invoices (0)', 'Outstanding Contracts (0)'];
  items = ['Purchase Requisitions', 'Pending Store Receipt Vouchers (0)', 'Pending Delivery Notes (0)', 'Outstanding Invoices (0)', 'Outstanding Contracts (0)'];
  expandedIndex = 0;

  @ViewChildren(CdkAccordionItem) accordionItems: QueryList<CdkAccordionItem>;
  // @ViewChild(CdkAccordion) accordion: CdkAccordion;

  ngAfterViewInit(): void {
    // setTimeout(_=> this.accordionItems.toArray()[0].open(), 100)
    // setTimeout(_=> {
    //   this.accordion.multi = true; 
    //   this.accordion.openAll()
    // }, 100)
    setTimeout(_=> {
      this.accordionItems.forEach((item, index) => {
        if (index == 0)
          item.open()
        else
          item.disabled = true
        // console.log(item)
      })
    }, 100)

    // console.log(this.accordionItems.toArray()[0])
  }

  onRecordsCount(count: number): void {
    this.recordsCount = count
  }

  // onRecordSelected(pr: PurchaseRequisition): void {
  //   this.pr = pr
  // }  
}
