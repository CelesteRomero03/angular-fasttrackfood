import { Component } from '@angular/core';
import { Loading } from '../../services/loading1/loading';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-spinner',
  imports: [AsyncPipe],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
})
export class Spinner {


  loading$: any;

  constructor(private loading: Loading) {

    this.loading$ = this.loading.loading$;
  }
}
