import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {ChangeDetectorRef} from '@angular/core';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  watchlists: any;
  newList: any = {
    name: null
  }

  constructor(private _homeService: HomeService, private modalService: NgbModal) {
    this._homeService.changeEmitted$.subscribe(data => {
      this.update();
    })
  }

  ngOnInit(): void {
    this.getWatchListsData();

  }

  getWatchListsData(){
    this._homeService.getWatchLists().subscribe({
      next: r => this.watchlists = r,
      error: e => this.watchlists = []
    })
  }
  update() {
    this.getWatchListsData();
  }
  openVerticallyCentered(content: any) {
    let modelRef = this.modalService.open(content, { centered: true });
    modelRef.result
      .then(() => {
        this.createWatchList();
        this.newList.name = null;
      })
      .catch(() => {});
    
  }

  createWatchList(){
    this._homeService.createWatchList(this.newList)
        .subscribe({
          next: r => this.update(),
          error: e => console.log(e)
        });
  }
}
