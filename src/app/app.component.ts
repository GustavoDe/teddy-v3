import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('sideNav', { static: false }) sideNav!: ElementRef;

  title = 'poc-newds-angular';
  messages: string[] = [];
  collapse: boolean = false;
  sideNavWidth!: number;
  
  constructor() {}

  ngOnInit(): void {
  }


  alterCollapse(){
    console.log('teste')

    this.collapse =! this.collapse
  }

  newMessage() {
    const message = 'Angular é melhor que react';
    this.messages.push(message);
    console.log('ta chamando')
  }
}
