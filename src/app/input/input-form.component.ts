import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})
export class InputFormComponent implements OnInit {

  inputForm;
  resultData;
  submitted = false;
  cache;
  country: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  	this.inputForm = this.formBuilder.group({
  	  state: '',
    });
    this.cache = this.getData(this.country);
    //this.resultData = this.getData(this.country);
    
  }

  ngOnInit() {
  }

  // getCache(country = 'US') {
  //   this.http.get('http://localhost:3000/ps5/sb?country=' + country).subscribe(data => {
  //     this.cache = data['cache'];
  //     console.log(this.cache);
     
  //   });
  // }

  getData(country = 'US') {
    this.http.get('http://localhost:3000/ps5/sb?country=' + country).subscribe(data => {
      this.cache = data['cache'];
      this.resultData = data['covid'];
      this.submitted = !this.submitted;
      console.log(this.cache);
    });
  }

 

  onSubmit() {
  	this.submitted = !this.submitted;
  }

}
