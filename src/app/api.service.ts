import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private SERVER_URL = "https://api.iextrading.com/1.0/tops/last?symbols=";

  constructor(private httpClient: HttpClient) { }

	public get(stockName){  
		return this.httpClient.get(`${this.SERVER_URL}${stockName}`);  
  }
}
