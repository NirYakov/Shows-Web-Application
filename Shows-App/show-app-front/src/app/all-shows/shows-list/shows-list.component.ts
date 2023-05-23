import { Component, OnInit } from '@angular/core';
import { ShowsService } from '../shows.service';
import { Show } from '../show.model';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.component.html',
  styleUrls: ['./shows-list.component.css']
})
export class ShowsListComponent implements OnInit {

  showsOrigin: Show[];

  buttonAll = 0;
  buttonMovie = 1;
  buttonTv = 2;

  buttonSelected = 0;

  shows: Show[];

  constructor(public showService: ShowsService) { }
  // constructor(public showService: ClipsService) { }
  // constructor() { }


  ngOnInit(): void {
    //    throw new Error('Method not implemented.');
    console.log("On init");
    this.getAllShow();

    console.log(this.shows);

    console.log("showService? : ", this.showService);

  }

  onClickType(btnSelect: number) {

    if (btnSelect === this.buttonAll && this.buttonSelected !== this.buttonAll) {
      this.shows = this.showsOrigin;
    }
    else if (btnSelect === this.buttonMovie && this.buttonSelected !== this.buttonMovie) {
      this.shows = this.showsOrigin.filter(show => show.type === "movie");

    }
    else if (btnSelect === this.buttonTv && this.buttonSelected !== this.buttonTv) {

      this.shows = this.showsOrigin.filter(show => show.type === "tv");
    }

    this.buttonSelected = btnSelect;
    // do stuff ....

  }

  getAllShow() {
    this.shows = this.showsOrigin = this.showService.getAllShows();
    console.log(this.shows);
    console.log(this.showService.getAllShows());

  }


  onAddShowClicked() {
    console.log("onAddShowClicked()");

    // this.router.navigateByUrl('/user');
  }


}