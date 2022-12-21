import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'personajes', pathMatch: 'full' },
  { path: 'inicio', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
  { path: 'episodios', loadChildren: () => import('./components/pages/episodes/episodes.module').then(m => m.EpisodesModule) },
  {
    path: 'personajes',
    loadChildren: () => import('./components/pages/characters/characters-list/characters-list.module').then(m => m.CharactersListModule)
  },
  {
    path: 'personaje-detalle/:id',
    loadChildren: () => import('./components/pages/characters/characters-details/characters-details.module').then(m => m.CharactersDetailsModule)
  },
  { path: 'informacion', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },
  { path: '**', loadChildren: () => import('./components/pages/not-found/not-found.module').then(m => m.NotFoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }