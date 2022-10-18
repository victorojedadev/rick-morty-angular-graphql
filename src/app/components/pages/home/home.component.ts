import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  charactersFav$ = this.localStorageSvc.charactersFav$;

  constructor(
    private localStorageSvc: LocalStorageService
  ) { }

}
