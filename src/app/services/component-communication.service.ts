import {Injectable} from '@angular/core'

//import { DataSource } from '@angular/cdk/collections'
import { IContract } from '../models/contract'

@Injectable()
export class ComponentCommunicationService {

    contract: IContract;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}

    setContract (contract: IContract) : void {
        this.contract = contract;
    }

    getContract (): IContract {
        return this.contract;
    }
}
