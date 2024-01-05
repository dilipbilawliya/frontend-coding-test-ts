<template>
  <div class="pokemon-wrapper">
    <h1>Pokémon List</h1>
    <ul class="pokemon-list">
      <li
        v-for="(pokemon, index) in paginatedPokemons"
        :key="pokemon.name"
        class="pokemon-item"
      >
        <router-link
          :to="{
            name: 'PokemonDetails',
            params: { id: extractPokemonId(pokemon.url) },
          }"
        >
          <div class="pokemon-card">
            <img
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${extractPokemonId(
                pokemon.url,
              )}.png`"
              :alt="pokemon.name"
              class="pokemon-imagelist"
            />
            <p class="pokemon-name">{{ pokemon.name }}</p>
          </div>
        </router-link>
      </li>
    </ul>
    <div class="pagination-buttons">
      <button
        class="custom-button previous-button"
        @click="previousPage"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span class="pagination-info">{{ currentPage }} of {{ totalPages }}</span>
      <button
        class="custom-button next-button"
        @click="nextPage"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pokemons: [],
        currentPage: 1,
        itemsPerPage: 20,
        totalPokemons: 0,
      }
    },
    mounted() {
      this.fetchPokemons()
    },
    computed: {
      paginatedPokemons() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage
        const endIndex = startIndex + this.itemsPerPage
        return this.pokemons.slice(startIndex, endIndex)
      },
      totalPages() {
        return Math.ceil(this.totalPokemons / this.itemsPerPage)
      },
    },
    methods: {
      async fetchPokemons(offset) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?limit=${this.itemsPerPage}&offset=${offset}`,
          )
          const data = await response.json()
          this.pokemons.push(...data.results) // Append fetched data to the array
          this.totalPokemons = data.count
        } catch (error) {
          console.error('Error fetching Pokémon:', error)
        }
      },
      extractPokemonId(pokemonUrl) {
        const id = pokemonUrl.split('/').slice(-2, -1)[0]
        return id
      },
      async nextPage() {
        const offset = this.currentPage * this.itemsPerPage
        if (this.currentPage < this.totalPages) {
          this.currentPage++
          this.fetchPokemons(offset)
        }
      },
      async previousPage() {
        if (this.currentPage > 1) {
          const offset = (this.currentPage - 2) * this.itemsPerPage
          this.currentPage--
          this.fetchPokemons(offset)
        }
      },
    },
  }
</script>

<style>
/* Add your styles here */
main {
  font-family: 'Lato', sans-serif;
}

.pokemon-list {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.pokemon-item {
  flex: 0 0 calc(25% - 20px);
}

.pokemon-card {
  padding: 25px;
  text-align: center;
  border-radius: 15px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 13px 5px #eaebed;
  background-color: #f8f8f8;
}

.pokemon-card:hover {
  transform: scale(1.05);
  transition: .5s ease;
  box-shadow: 0 2px 20px 8px #eaebed;
  background-color: #fff;
}

.pokemon-imagelist {
  width: 120px; /* Adjust the image size as needed */
  height: 120px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin: 0 auto 20px;
  background-color: rgb(31 41 55);
}

.pokemon-name {
  font-size: 18px;  
  font-weight: 400;
}

.marginLeft {
  margin-right: 5px;
  margin-left: 5px;
}

.custom-button {
  background-color: transparent;
  color: #4a5568;
  border: 1px solid #cbd5e0;
  border-radius: 0.375rem;
  padding: 0.5rem 1rem;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.custom-button:hover {
  background-color: #fff5f7;
  color: #e53e3e;
}

.custom-button:active {
  background-color: #fed7e2;
  color: #d53f8c;
}

.pagination-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 15px 0;
  font-size: 16px;
}

.custom-button {
  background-color: #1f2937;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  color: #ffffff;
  background-color: #718096;
}

.custom-button:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
}

.previous-button {
  margin-right: 10px;
}

.next-button {
  margin-left: 10px;
}

.pagination-info {
  font-size: 1rem;
  color: #4a5568;
  margin: 0 10px;
}

.pokemon-wrapper {
  width: 80%;
  padding: 15px 0;
}

.pokemon-wrapper h1 { 
  font-size: 28px;
  font-weight: 700;
  padding: 20px 0 30px;
}

@media (max-width: 767px) {
  .pokemon-item {
    flex: unset;
  }
}

</style>
