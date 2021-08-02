import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/core/http-services/http.service';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/core/data-services/data-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public tableConfig: any = [];
  public isLoading = false;
  public receivedChildEvent: any;
  constructor(
    private httpService: HttpService,
    private router: Router,
    private dataService: DataServiceService,
    private datePipe:DatePipe
  ) {
    this.tableConfig['headers'] = [
      "fullName",
      "email",
      "phone",
      "DOB",
      "city"
    ];
    this.getTableData();
  }

  ngOnInit() {
  }
  getEvent(event: object) {
    this.receivedChildEvent = event;
    console.log('this.receivedChildEvent', this.receivedChildEvent);
    this.getActions(event);
  }

  getActions(event) {

    if (event.eventType === 'edit') {
      console.log("event", event.eventType)
    }
    if (event.eventType === 'delete') {
      console.log("event", event.eventType)
    }

  }

  getTableData() {
    //https://randomuser.me/api/?results=5
    this.httpService.get('?results=50')
      .subscribe((data: any) => {
        console.log("data", data);
        if(data && data.results) {
          data.results.map((ele) => {
            ele['photo'] = ele.picture.thumbnail;
            ele['fullName'] = ele.name.title +" "+ ele.name.first+" "+ ele.name.last;
            ele['DOB'] = this.datePipe.transform( ele.dob.date,'yyyy-MM-dd');
            ele['city'] = ele.location.city;
          });
          this.tableConfig['elementsData'] = data.results;
          this.tableConfig['pagination'] = {
            "total": 20,
            "recordPerPage": 5,
            "pageSizeOptions": [
              2,
              5,
              10,
              50
            ]
          }
        }
        // this.tableConfig = data;
        this.isLoading = true;
        this.dataService.changeData(this.tableConfig)
      });
  }
}
