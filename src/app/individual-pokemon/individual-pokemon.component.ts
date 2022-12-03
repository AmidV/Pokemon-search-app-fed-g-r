import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
    selector: "app-individual-pokemon",
    templateUrl: "./individual-pokemon.component.html",
    styleUrls: ["./individual-pokemon.component.scss"]
}) 

export class IndividualPokemonComponent{
  pokemon!: { id: number };
  
  pokemonName:any;
  pokemonBaseExperience:any;
  pokemonHeight:any;
  pokemonWidth:any;
  pokemonAbility:any;
  pokemonImage:any;

  allAbilities:Object[] = [];
  statNames:Object[] = [];
  baseStat:Object[] = [];

  fetchedInfo:any;


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private _location: Location) { 
              }

  ngOnInit() {
    this.pokemon = {
      id: this.route.snapshot.params['id']
    },

    this.fetchIndividualPokemon()
  }

  onBackToHome() {
    this._location.back();
  }
// ----- Fetching an Image and a Bio of Individual Pokemon -----
  private fetchIndividualPokemon() {
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemon.id}`)
    .subscribe((pokemonInfo:any) => {
      this.fetchedInfo = pokemonInfo;
      this.pokemonBaseExperience = this.fetchedInfo.base_experience;
      this.pokemonName = this.fetchedInfo.name;
      this.pokemonHeight = this.fetchedInfo.height;
      this.pokemonWidth = this.fetchedInfo.weight;
      this.pokemonAbility = this.fetchedInfo.abilities;
      
      this.pokemonImage = this.fetchedInfo.sprites.front_default 
      ? this.fetchedInfo.sprites.front_default 
      : this.fetchedInfo.sprites.other["official-artwork"].front_default 
      || this.fetchedInfo.sprites.front_shiny 
      || this.fetchedInfo.sprites.other.home.front_default 
      || this.fetchedInfo.sprites.versions["generation-viii"].icons.front_default;
         
      for(let abilityOne of this.fetchedInfo.abilities) {
        if(abilityOne.ability.name) {
          this.allAbilities.push(abilityOne.ability.name);
        }
      }

      for(let bStat of this.fetchedInfo.stats) {
        if(bStat.base_stat) {
          this.baseStat.push(bStat.base_stat);
        }
      }

      for(let sName of this.fetchedInfo.stats) {
        if(sName.stat.name) {
          this.statNames.push(sName.stat.name);
        }
      }
    })
    console.log(this.fetchedInfo)
  }
}