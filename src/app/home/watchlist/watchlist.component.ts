import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../home.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StockService } from 'src/app/stock-details/stock.service';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  myMath =  Math;
  watchlist: any;
  watchlistName: string = "";
  listIndex: any;
  constructor(private _homeService: HomeService, private route: ActivatedRoute, private modalService: NgbModal, private stockService: StockService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listIndex = params['id'];
      this.getTickerInfo();
    })
    
  }

  getTickerInfo() {

    this._homeService.getAllTickers(this.listIndex).then(
      res => {
        res.map((item: any) => {
          this.getTickerPrice(item);
          console.log(res);
        });
        console.log(res);
        this.watchlist = res;
        this.watchlistName = history.state.name;
      }
    )

  }

  updateList(){
    this.getTickerInfo();
  }
  getTickerPrice(item: any) {
    console.log(item);
    this.stockService.getStockData(item.ticker).then(response => {
      item.data = response;
    })
  }
  openSearchBar(content: any) {
    let modelRef = this.modalService.open(content, { centered: true });
  }

  openConfirmBox(content: any, tickerIndex: any) {
    let modelRef = this.modalService.open(content, { centered: true });
    modelRef.result
    .then(() => {
      this._homeService.deleteTicker( tickerIndex, this.listIndex).subscribe(res => {
        this.updateList();
      })
    })
    .catch(() => {});
  
  }

  addToList(stock: any){

    this.stockService.getCompanyDetails(stock.symbol).subscribe({
      next: r => {
        this._homeService.createTicker(r, this.listIndex).subscribe(res => {
          this.updateList();
        })
      }
    })
  }

  deleteList(){
    console.log(this.listIndex);
    this._homeService.deleteWatchlist(this.listIndex).subscribe(res => {
      this.router.navigate(['lists']);
    })
  }


}
