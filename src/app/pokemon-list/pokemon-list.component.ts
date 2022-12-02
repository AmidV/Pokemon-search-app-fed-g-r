import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})

export class PokemonListComponent {
  // ----- Original pokemons_web_link -----
  _pokemonUrl:string = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154";
  // ----- Fetched Poks Data -----
  fetchedData:any;

  // ----- Pagination Vars -----
  page:number = 1;
  pagePokemons:number = 52;
  totalPokemons:number = 0;


  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) {
    this.fetchedData=[];
  }

  ngOnInit(): void {
    this.fetchPokemons();
    this.page = this.route.snapshot.params['page'];
    console.log(this.page);
  }

  // ----- Fetching page number from Pagination Module -----
  pageChange(newPage:number) {
    this.router.navigate([`list/${newPage}`]);
    this.page = newPage;
  }

// ----- Fetching all available Pokemons -----
  private fetchPokemons() {
    this.http.get(`${this._pokemonUrl}`)
    .subscribe((pokemons: any) => {
      this.fetchedData = pokemons;
      this.totalPokemons = this.fetchedData.results.length;
    })
  }
}
