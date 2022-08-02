import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  pdata: any;
  constructor() {}

  getLoggedData(data: any) {
    this.pdata = data;
  }
}
