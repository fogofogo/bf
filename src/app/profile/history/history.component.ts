import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/index";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  previousCompetitions: any;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getPreviousCompetitions().subscribe((previousCompetitions) => {
      this.previousCompetitions = previousCompetitions
    })
  }
}
