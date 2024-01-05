<template>
  <div class="flex items-center justify-center pokemon-hg">
    <div v-if="pokemon.name" class="pokemon-container">
      <h1 class="pokemon-title pt-3">Pokémon Detail </h1>
      <h2 class="pokemon-subtitle pt-2 capitalize">{{ pokemon.name }}</h2>
      <div class="pokemon-details">
        <div class="py-3 pokemon-info border-t">
          <img :src="pokemon.sprites.front_default" :alt="pokemon.name" class="pokemon-image" />
          <div class="block text-center p-2 basic-info">
            <p class="mb-3"><strong>Height:</strong> {{ pokemon.height }}</p>
            <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
          </div>
        </div>
        <div class="flex items-baseline pt-5 border-t">
          <div class="px-3 abilities">
            <p class="mb-3"><strong>Abilities</strong></p>
            <ul class="abilities-list">
              <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
                {{ ability.ability.name }}
              </li>
            </ul>
          </div>
          <div class="px-3 abilities">
            <p class="mb-3"><strong>Types</strong></p>
            <ul class="abilities-list">
              <li v-for="type in pokemon.types" :key="type.type.name">
                {{ type?.type.name}}
              </li>
            </ul>
          </div>
        </div>
        <!-- Add more details as needed -->
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import  { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

  export default {
    data() {
      return {
        pokemon: {}
      };
    },
    mounted() {
      this.fetchPokemonDetails();
    },
    methods: {
      async fetchPokemonDetails() {
        const { id } = this.$route.params;
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
          const data = await response.json();
          this.pokemon = data;
          toast.success('Pokemon detailed fetched!', {
          timeout: 1000,
          position: 'top-right',
        })
        } catch (error) {
          console.error('Error fetching Pokémon details:', error);
          toast.error('Error occurred while fetching data', {
          timeout: 1000,
        });
        }
      }
    }
  };
</script>

<style>
/* Add your styles here */
.pokemon-container {
  min-width: 400px;
  padding: 25px 0;
  margin: 20px 0;
  border-radius: 15px;
  border: 1px solid #ddd;
  box-shadow: 0 1px 13px 5px #eaebed;
  background-color: #f8f8f8;
}

.pokemon-container:hover {
  background-color: #fff;
  transform: scale(1.01);
  transition: .75s ease;
  box-shadow: 0 1px 13px 2px #ccc;
}

.pokemon-hg {
  height: calc(100vh - 64px);
}

.pokemon-title {
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 5px;
}

.pokemon-subtitle {
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
}

.pokemon-details {
  display: block;
}

.pokemon-info {
  flex: 1;
  text-align: center;
}

.pokemon-image {
  width: 150px;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 50%;
  margin: 0 auto 15px;
  background-color: rgb(31 41 55);
  box-shadow: 0 1px 13px 5px #ccc;
}

.basic-info,
.abilities {
  font-size: 18px;
}

.abilities {
  flex: 1;
}

.abilities p {
  font-size: 18px;
}

.abilities-list {
  list-style-type: none;
  padding-left: 0;
}

.abilities-list li {
  margin-bottom: 6px;
  text-transform: capitalize;
}
</style>
