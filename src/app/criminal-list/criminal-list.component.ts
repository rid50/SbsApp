import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-criminal-list',
  templateUrl: './criminal-list.component.html',
  styleUrls: ['./criminal-list.component.scss']
})
export class CriminalListComponent implements OnInit {

  //constructor() { }

  ngOnInit(): void {
    const images = Array.from(Array(15), (x, i) => i);

    const masonryImages = [
      { image: 'https://material-components-web.appspot.com/images/photos/3x2/16.jpg' },
      { image: 'https://material-components-web.appspot.com/images/photos/2x3/1.jpg' },
      { image: 'https://material-components-web.appspot.com/images/photos/3x2/1.jpg' },    
    ];
  }
}
