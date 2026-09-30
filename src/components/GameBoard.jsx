import PokemonCard from "./PokemonCard.jsx";

export default function GameBoard({
  pokemon,
  onPokemonSelect,
}) {
  return (
    <section
      className="game-board"
      aria-label="Pokémon cards"
    >
      {pokemon.map(function (
        currentPokemon
      ) {
        return (
          <PokemonCard
            key={currentPokemon.id}
            pokemon={currentPokemon}
            onSelect={
              onPokemonSelect
            }
          />
        );
      })}
    </section>
  );
}