/* eslint-disable @typescript-eslint/no-unused-vars */
import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router'
import {Observable} from 'rxjs'
import {Contract} from '../models/contract'
import {ContractService} from './contract.service'



@Injectable()
export class ContractResolver implements Resolve<Contract> {

    constructor(private contractService:ContractService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contract> {
        return this.contractService.findContractById(route.params['id'])
    }

}

