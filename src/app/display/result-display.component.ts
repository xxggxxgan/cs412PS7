import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent implements OnInit {

  @Input() resultData: any;
  @Input() cache: any;

  constructor() { }

  ngOnInit() {
  }

}
