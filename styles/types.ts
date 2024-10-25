// styles/types.ts
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
  number: number; // ID của Pokemon
}

// Interface cho dạng tiến hóa của Pokémon
export interface PokemonEvolution {
  number: number; // ID của Pokemon hiện tại
  id: number; // ID của Pokémon ở dạng tiến hóa
  name: string; // Tên của Pokémon ở dạng tiến hóa
  evolution_trigger: string; // Cách tiến hóa (ví dụ: level-up, stone, trade)
  min_level?: number; // Level tối thiểu cần thiết để tiến hóa (nếu có)
  item?: string; // Vật phẩm cần thiết để tiến hóa (nếu có)
  evolved_species_id?: number; // ID của Pokémon sau khi tiến hóa (nếu có)
}
