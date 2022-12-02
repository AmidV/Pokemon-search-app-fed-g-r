import { Component, Input } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-pokemon-cards",
  templateUrl: "./pokemon-cards.component.html",
  styleUrls: ["./pokemon-cards.component.scss"]
}) 

export class PokemonCardsComponent{
  // ----- Receive Poks Data -----
  @Input("receivedPokemons") pokemon!: { name: string; url: string; };

  // ----- Images and Ids of received Poks -----
  fetchedImage:any;
  pokImage:any;
  pokID:number = 0;

  constructor(private http: HttpClient) {
    this.fetchedImage="";
    this.pokImage=[];
  }

  ngOnInit() {
    this.fetchIndividualPokemonImg();
  }
    
// ----- Fetching Image of Individual Pokemon -----
  private fetchIndividualPokemonImg() {
    this.http.get(`${this.pokemon.url}`)
    .subscribe((pokemonUrl:any) => {
      this.fetchedImage = pokemonUrl;
      this.pokImage.push(
        this.fetchedImage.sprites.front_default 
        ? this.fetchedImage.sprites.front_default 
        : this.fetchedImage.sprites.other["official-artwork"].front_default 
        || this.fetchedImage.sprites.front_shiny 
        || this.fetchedImage.sprites.other.home.front_default 
        || this.fetchedImage.sprites.versions["generation-viii"].icons.front_default
      )
      this.pokID = this.fetchedImage.id;
    })    
  }
}