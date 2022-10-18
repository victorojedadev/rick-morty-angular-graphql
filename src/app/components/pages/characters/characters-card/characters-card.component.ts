import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/shared/interfaces/data.interface';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-characters-card',
  templateUrl: './characters-card.component.html',
  styleUrls: ['./characters-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {

  @Input() character!: Character;

  constructor(
    private localStorageSvc: LocalStorageService,
  ) { }

  getIcon(): string {
    return this.character.isFavorite ? 'heart-solid.svg' : 'heart.svg';
  }

  toggleFavorite(): void {
    const isFavorite = this.character.isFavorite;
    this.getIcon();
    this.character.isFavorite = !isFavorite;
    this.localStorageSvc.addOrRemoveFavorite(this.character);
  }

}
