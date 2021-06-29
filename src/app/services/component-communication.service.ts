import {Injectable} from '@angular/core'

//import { DataSource } from '@angular/cdk/collections'
import { Contract } from '../models/contract'

@Injectable()
export class ComponentCommunicationService {

    contract: Contract;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    setContract (contract: Contract) : void {
        this.contract = contract;
    }

    getContract (): Contract {
        return this.contract;
    }
}
