import { render, waitFor } from '@testing-library/vue';
import PokemonDetail from '../../views/PokemonDetails.vue';

global.fetch = jest.fn().mockResolvedValue({
  json: () =>
    Promise.resolve({
      name: 'Pikachu',
      sprites: { front_default: 'image-url' },
      height: 20,
      weight: 10,
      abilities: [{ ability: { name: 'ability1' } }, { ability: { name: 'ability2' } }],
    }),
});

test('renders Pokemon Detail component with loading state', async () => {
  const { getByText } = render(PokemonDetail);

  await waitFor(() => {
    const loadingText = getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });
});

test('fetches and renders Pokemon details on mounted', async () => {
  const { getByText, getByAltText } = render(PokemonDetail, {
    global: {
      mocks: {
        $route: {
          params: {
            id: 25, // Example ID
          },
        },
      },
    },
  });

  await waitFor(() => {
    const title = getByText('Pokémon Detail - Pikachu');
    const image = getByAltText('Pikachu');
    const height = getByText('Height: 20');
    const weight = getByText('Weight: 10');
    const ability1 = getByText('ability1');
    const ability2 = getByText('ability2');

    expect(title).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(ability1).toBeInTheDocument();
    expect(ability2).toBeInTheDocument();
  });
});
