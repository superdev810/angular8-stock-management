import { Component, ViewChild, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // App title
  title = 'Stock Management';

  // Loading subject
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading = this.loadingSubject.asObservable();

  // Search input native element
  @ViewChild('searchInput', {static: false}) searchInput: ElementRef;

  // Table columns list
  tableColumns: string[] = ['symbol', 'price', 'size', 'time', 'action'];

  // User portfolio stock list
  stocks = [];

  // User persist stocks list
  userStocks = [];

  constructor(private apiService: ApiService) { }

	ngOnInit() {
    const storedStocks = localStorage.getItem('user_stocks');
    if (storedStocks) {
      this.userStocks = JSON.parse(storedStocks);
    }
    const stockNames = this.userStocks.join();
    this.apiService.get(stockNames).subscribe((data: any[])=>{
			console.log(data);
      this.stocks = this.stocks.concat(data);
      this.loadingSubject.next(false);
		})
  }
  
  // Search stock data
  searchStock() {
    console.log(this.searchInput.nativeElement.value);
    this.loadingSubject.next(true);
    const stockName = this.searchInput.nativeElement.value;
    this.apiService.get(stockName).subscribe((data: any[])=>{
      console.log(data);
      data.forEach((stock) => {
        this.stocks = this.stocks.concat(stock);
        this.userStocks = this.userStocks.concat(stock['symbol']);
      })
      localStorage.setItem('user_stocks', JSON.stringify(this.userStocks));
      this.loadingSubject.next(false);
		})
  }

  // Delete stock data in datasource and storage
  delete(stock) {
    // Remove user stock symbol in user storage
    this.userStocks = this.userStocks.filter((item) => item !== stock.symbol);
    localStorage.setItem('user_stocks', JSON.stringify(this.userStocks));

    // Remove stock in data source
    this.stocks = this.stocks.filter((item) => stock.symbol !== item.symbol);
  }
}
