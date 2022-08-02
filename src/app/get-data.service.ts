import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  dataClone: any;
  constructor() {}

  getLoggedData(data: any) {
    this.dataClone = data;
  }
}
