export interface Pokemon {
    name: string;
    url: string;
  }
  
  export interface PokemonDetails {
    name: string;
    sprite: string;
    types: string[];
    generation: string;
    version: string;
    number: number; // Thay đổi sang number
  }
  