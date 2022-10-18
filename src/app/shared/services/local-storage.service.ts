import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Character } from '../interfaces/data.interface';
import { ToastrService } from 'ngx-toastr';

const MY_FAVORITES = 'myFavorites';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private charactersFavSubject = new BehaviorSubject<Character[]>([]);
  charactersFav$ = this.charactersFavSubject.asObservable();

  constructor(
    private toastrSvc: ToastrService
  ) {
    this.initialStorage();
  }

  addOrRemoveFavorite(character: Character): void {
    const { id } = character;
    const currentsFav = this.getFavoritesCharacters();
    const found = !!currentsFav.find((fav: Character) => fav.id === id);
    found ? this.removeFromFavorite(id) : this.addToFavorite(character);
  }

  private addToFavorite(character: Character): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...currentsFav, character]));
      this.charactersFavSubject.next([...currentsFav, character]);
      this.toastrSvc.success(`${character.name} se agregó a favoritos`, 'RickAndMortyAPP');
    } catch (error) {
      console.log('Error guardando en el localStorage', error);
      this.toastrSvc.error(`Error guardando en localStorage ${error} `, 'RickAndMortyAPP');
    }
  }

  private removeFromFavorite(id: number): void {
    try {
      const currentsFav = this.getFavoritesCharacters();
      const characters = currentsFav.filter((item: any) => item.id !== id);
      localStorage.setItem(MY_FAVORITES, JSON.stringify([...characters]));
      this.charactersFavSubject.next([...characters]);
      this.toastrSvc.warning(`Se removió de favoritos`, 'RickAndMortyAPP');
    } catch (error) {
      console.log('Error removiendo en el localStorage', error);
      this.toastrSvc.error(`Error removiendo en localStorage ${error} `, 'RickAndMortyAPP');
    }

  }

  getFavoritesCharacters(): any {
    try {
      const charactersFav = JSON.parse(localStorage.getItem(MY_FAVORITES) || JSON.stringify([]));
      this.charactersFavSubject.next(charactersFav);
      return charactersFav;
    } catch (error) {
      console.log('Error obteniendo favoritos de localStorage', error);
    }
  }

  clearStorage(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.log('Error limpiando localStorage', error);
    }
  }

  private initialStorage(): void {
    const currents = JSON.parse(localStorage.getItem(MY_FAVORITES) || JSON.stringify([]));
    if (!currents) {
      localStorage.setItem(MY_FAVORITES, JSON.stringify([]));
    }
    this.getFavoritesCharacters();
  }
}