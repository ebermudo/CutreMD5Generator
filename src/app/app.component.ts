
//import { AdmobService } from './services/admob.service';

import { Component, OnInit } from "@angular/core";
import { AdmobService } from "./services/admobService.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private admobService: AdmobService) {}

  public ngOnInit(): void {
    this.admobService.initialize()
    .then(() => {
      this.admobService.showBanner();
    });
  }
}
