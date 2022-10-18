import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersListRoutingModule } from './characters-list-routing.module';
import { CharactersListComponent } from './characters-list.component';
import { CharactersCardModule } from '../characters-card/characters-card.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SearchModule } from 'src/app/shared/components/search/search.module';


@NgModule({
  declarations: [
    CharactersListComponent
  ],
  imports: [
    CommonModule,
    CharactersCardModule,
    CharactersListRoutingModule,
    InfiniteScrollModule,
    SearchModule,
  ]
})
export class CharactersListModule { }
