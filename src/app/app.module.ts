import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonCardsComponent } from './pokemon-list/pokemon-cards/pokemon-cards.component';
import { IndividualPokemonComponent } from './individual-pokemon/individual-pokemon.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonCardsComponent,
    IndividualPokemonComponent,
    PokemonListComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
