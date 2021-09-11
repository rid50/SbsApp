import { CdkAccordionItem } from '@angular/cdk/accordion';
import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-contract-accordion',
  templateUrl: './contract-accordion.component.html',
  styleUrls: ['./contract-accordion.component.scss']
})
export class ContractAccordionComponent extends CdkAccordionItem implements AfterViewInit {

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  recordsCount = 0

  // items = ['Purchase Requisitions ()', 'Pending Store Receipt Vouchers (0)', 'Pending Delivery Notes (0)', 'Outstanding Invoices (0)', 'Outstanding Contracts (0)'];
  items = ['Purchase Requisitions', 'Pending Store Receipt Vouchers (0)', 'Pending Delivery Notes (0)', 'Outstanding Invoices (0)', 'Outstanding Contracts (0)'];
  expandedIndex = 0;

  @ViewChildren(CdkAccordionItem, { read: ElementRef }) accordionItems: QueryList<ElementRef>;
  
  ngAfterViewInit(): void {
    const accordionItem = this.accordionItems.toArray()

    // this.toggle()
  }

  onRecordsCount(count:number): void {
    this.recordsCount = count
  }
}
