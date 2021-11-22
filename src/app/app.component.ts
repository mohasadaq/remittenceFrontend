import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare var $ : any
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {

  title = 'remittance';
  route = new ActivatedRoute()
  
  // pageHeader :any = url.name;
  ngOnInit(): void {
    location.pathname
    console.log(this.route.snapshot);
    this.route.snapshot
    // throw new Error('Method not implemented.');
  }

  
}

