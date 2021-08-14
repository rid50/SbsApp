import {Injectable} from '@angular/core'

//import { DataSource } from '@angular/cdk/collections'
import { IContract } from '../models/contract'

@Injectable()
export class ComponentCommunicationService {

    contract: IContract;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    setContract (contract: IContract) : void {
        // contract.contractValue = contract.contractValue.split(' ')[1]
        this.contract = contract;
        // this.contract.currency = contract.currency.split(' ')[0]
    }

    getContract (): IContract {
        return this.contract;
    }
}
