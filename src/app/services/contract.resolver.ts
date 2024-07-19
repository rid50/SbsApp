/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable} from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import {Observable} from 'rxjs'
import {IContract} from '../models/contract'
import {ContractService} from './contract.service'



@Injectable()
export class ContractResolver  {

    constructor(private contractService:ContractService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContract> {
        return this.contractService.findContractById(route.params['id'])
    }
}

