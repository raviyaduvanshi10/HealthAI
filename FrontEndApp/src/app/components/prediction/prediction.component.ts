import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { predictionForm } from '../models/user';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.scss']
})
export class PredictionComponent {

  submitted = false;
  prediction: any = predictionForm;
  predictedDesease: any;

  constructor(private router: Router, private usersService: UsersService, private location: Location,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(predictionForm: NgForm) {
    console.log(this.prediction);
    this.save();
    predictionForm.resetForm();
  }

  save() {
    this.usersService
      .predictDesease(this.prediction).subscribe(data => {
        let d1 = JSON.stringify(data);
        let d2 = JSON.parse(d1);
        console.log(d2);
        if (d2.statusCode == 302) {
          alert(d2.message);
        }
        else {
          this.predictedDesease = d2[0]["prediction"]
          this.submitted = true;
        }
      },
        error => console.log(error));
  }

  saveData() {
    var jsonData = {
      "desease": this.predictedDesease
    }
    console.log(jsonData)
    this.usersService.savePrediction(jsonData).subscribe(data => {
      console.log(data)
      this.router.navigate(['/default'])
    },
      error => console.log(error));
  }

  gotoHome() {
    this.router.navigate(['/'])
  }
  cancel() {
    this.location.back();
  }

}
