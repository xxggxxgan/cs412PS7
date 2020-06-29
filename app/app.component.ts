import { Component,OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { data } from './mockData';
import { covidType } from './Data';
import { data2 } from './mockdata2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'ps6';
  covids: covidType[] = data;
  selectedCOVID: covidType;
  dailyData = data2[0].datapp;

  inputForm;
  resultData;
  submitted = false;

  ngOnInit() {
  }




}

