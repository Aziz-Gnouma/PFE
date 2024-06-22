import { Component } from '@angular/core';
import { ElementRef, AfterViewInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})

export class AcceuilComponent implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    if (typeof $ !== 'undefined') {
      console.log('jQuery is working successfully!');
      
      // Example: Change the color of an element
      $(this.el.nativeElement).find('.your-element-class').css('color', 'green');
    } else {
      console.error('jQuery is not loaded or there is an issue.');
    }
  }
}