document.addEventListener('DOMContentLoaded', () => {
    const pokedexContainer = document.getElementById('pokedex-container');
    const loader = document.getElementById('loader');
    const loadMoreButton = document.getElementById('load-more');
    const searchForm = document.querySelector('.search');
    const searchInput = document.querySelector('.search__input');
    const showAllButton = document.getElementById('show-all');
    const showFavoritesButton = document.getElementById('show-favorites');

    const API_URL = 'https://pokeapi.co/api/v2/pokemon/';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let currentView = 'all';

    const typeColors = {
        fire: '#FF6B6B', water: '#6B8BFF', grass: '#6BFF6B', electric: '#FFFF6B',
        psychic: '#FF6BFF', ice: '#BFFFFF', dragon: '#8B6BFF', dark: '#A9A9A9',
        fairy: '#FFB6C1', normal: '#F5F5DC', fighting: '#FFA500', flying: '#ADD8E6',
        poison: '#9932CC', ground: '#DEB887', rock: '#BDB76B', bug: '#9ACD32',
        ghost: '#778899', steel: '#B0C4DE', default: '#E0E0E0'
    };

    const fetchPokemon = async (id) => {
        try {
            const response = await fetch(`${API_URL}${id}`);
            if (!response.ok) throw new Error('Pokémon no encontrado');
            return await response.json();
        } catch (error) {
            alert(error.message);
            return null;
        }
    };

    const renderPokemonCard = (pokemon) => {
        const card = document.createElement('div');
        card.className = 'pokemon-card';
        card.dataset.id = pokemon.id;

        const isFavorite = favorites.includes(pokemon.id);

        card.innerHTML = `
            <span class="pokemon-card__favorite ${isFavorite ? 'pokemon-card__favorite--active' : ''}" data-id="${pokemon.id}">★</span>
            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" class="pokemon-card__image">
            <h2 class="pokemon-card__name">${pokemon.name}</h2>
            <div class="pokemon-card__types">
                ${pokemon.types.map(typeInfo => `<span class="pokemon-card__type" style="background-color: ${typeColors[typeInfo.type.name] || typeColors.default}">${typeInfo.type.name}</span>`).join('')}
            </div>
            <div class="pokemon-card__info">
                <p>Altura: ${pokemon.height / 10} m</p>
                <p>Peso: ${pokemon.weight / 10} kg</p>
            </div>
            <div class="pokemon-card__stats-container">
                ${pokemon.stats.map(statInfo => `
                    <div class="pokemon-card__stat">
                        <span>${statInfo.stat.name.replace('-', ' ')}</span>
                        <span>${statInfo.base_stat}</span>
                    </div>
                `).join('')}
            </div>
        `;

        pokedexContainer.appendChild(card);
    };

    const toggleFavorite = (id) => {
        if (favorites.includes(id)) {
            favorites = favorites.filter(favId => favId !== id);
        } else {
            favorites.push(id);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoriteViews();
    };

    const updateFavoriteViews = () => {
        document.querySelectorAll('.pokemon-card__favorite').forEach(favIcon => {
            const id = parseInt(favIcon.dataset.id);
            if (favorites.includes(id)) {
                favIcon.classList.add('pokemon-card__favorite--active');
            } else {
                favIcon.classList.remove('pokemon-card__favorite--active');
            }
        });

        if (currentView === 'favorites') {
            showFavorites();
        }
    };

    const displayPokemons = async (pokemonList) => {
        pokedexContainer.innerHTML = '';
        loader.style.display = 'block';
        for (const item of pokemonList) {
            const pokemon = await fetchPokemon(item.name || item);
            if (pokemon) renderPokemonCard(pokemon);
        }
        loader.style.display = 'none';
    };

    const loadInitialPokemon = async () => {
        loader.style.display = 'block';
        loadMoreButton.style.display = 'none';
        const response = await fetch(`${API_URL}?limit=20`);
        const data = await response.json();
        await displayPokemons(data.results);
    };

    const showFavorites = async () => {
        currentView = 'favorites';
        loadMoreButton.style.display = 'none';
        await displayPokemons(favorites);
    };

    // Event Listeners
    loadMoreButton.addEventListener('click', loadInitialPokemon);

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchTerm) return;
        pokedexContainer.innerHTML = '';
        loadMoreButton.style.display = 'none';
        const pokemon = await fetchPokemon(searchTerm);
        if (pokemon) renderPokemonCard(pokemon);
    });

    showAllButton.addEventListener('click', () => {
        currentView = 'all';
        pokedexContainer.innerHTML = '';
        loadMoreButton.style.display = 'block';
    });

    showFavoritesButton.addEventListener('click', showFavorites);

    pokedexContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('pokemon-card__favorite')) {
            const id = parseInt(e.target.dataset.id);
            toggleFavorite(id);
        }
    });
});
