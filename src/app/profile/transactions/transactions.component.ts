import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UserService } from "../../shared/index";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  transactions: any;

  constructor(private userService: UserService) { }

  ngOnInit() {

    this.userService.getAllTransactions().subscribe((transactions) => {
      this.transactions = transactions
    })
  }

}
