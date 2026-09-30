export default function PokemonCard({
  pokemon,
  onSelect,
}) {
  function handleClick() {
    onSelect(pokemon.id);
  }

  return (
    <button
      className="pokemon-card"
      type="button"
      onClick={handleClick}
      aria-label={`Select ${pokemon.name}`}
    >
      <div className="pokemon-number">
        #{String(pokemon.id).padStart(
          3,
          "0"
        )}
      </div>

      <div className="image-container">
        <img
          src={pokemon.image}
          alt={pokemon.name}
        />
      </div>

      <div className="pokemon-information">
        <h2>{pokemon.name}</h2>

        <div className="type-list">
          {pokemon.types.map(
            function (type) {
              return (
                <span
                  className={`type type-${type}`}
                  key={type}
                >
                  {type}
                </span>
              );
            }
          )}
        </div>
      </div>
    </button>
  );
}