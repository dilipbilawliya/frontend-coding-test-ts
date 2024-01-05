import { render, fireEvent, waitFor } from '@testing-library/vue';
import PokemonList from '../../views/PokemonList.vue'; // Replace this with the correct path
import { RouterLinkStub } from '@vue/test-utils';

beforeEach(() => {
  (global.fetch as any).mockClear();
});

global.fetch = jest.fn().mockResolvedValue({
  json: () =>
    Promise.resolve({
      results: [{ name: 'Pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }],
      count: 1,
    }),
});

test('renders Pokemon List component', async () => {
  const { getByText, getByRole } = render(PokemonList);

  await waitFor(() => {
    const pokemonListTitle = getByText('Pokémon List');
    expect(pokemonListTitle).toBeInTheDocument();
  });

  await waitFor(() => {
    const previousButton = getByRole('button', { name: 'Previous' });
    expect(previousButton).toBeInTheDocument();

    const nextButton = getByRole('button', { name: 'Next' });
    expect(nextButton).toBeInTheDocument();
  });
});

test('fetches Pokemons on mounted and next page click', async () => {
  const { getByRole } = render(PokemonList);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0');
  });

  const nextButton = getByRole('button', { name: 'Next' });
  fireEvent.click(nextButton);
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20');
  });
});

test('navigates to Pokemon details on link click', async () => {
  const { getByText } = render(PokemonList, {
    global: {
      stubs: {
        RouterLink: RouterLinkStub,
      },
    },
  });

  const pokemonLink = getByText('Pikachu');
  await fireEvent.click(pokemonLink);

});
