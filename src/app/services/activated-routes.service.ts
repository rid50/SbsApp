import { Injectable } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable()
// @Injectable({
//     providedIn: 'root',
// })
export class ActivatedRoutesService {
//    @Output() activatedRouteEvent = new EventEmitter<string>();

  //  constructor() { }
   // Observable string source
    private activatedRouteSource = new Subject<string>();
  // Observable string streams
    activatedRouteStream = this.activatedRouteSource.asObservable();


    public setRoutePathForDrawer(route: ActivatedRoute): void {

        //console.log("ROUTE " + route.snapshot.url[0].path);
        //this.activatedRouteEvent.emit(route.snapshot.url[0].path);
        
        this.activatedRouteSource.next(route.snapshot.url[0].path);
        
//         route.url.subscribe(([url]) => {
// 			const path = url.path;
//             this.activatedRouteEvent.emit(path);
// //			const { path, parameters } = url;
// 			console.log(url);
//             console.log("ROUTE2 " + route);
// //			console.log(parameters);
// 		});
    }
}