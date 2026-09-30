export default function Header() {
  return (
    <header className="game-header">
      <div className="header-text">
        <p className="eyebrow">
          Pokémon Memory Game
        </p>

        <h1>
          Gotta click ’em all.
        </h1>

        <p className="instructions">
          Click every Pokémon once.
          Clicking the same Pokémon twice
          resets your current score.
        </p>
      </div>

      <div
        className="pokeball"
        aria-hidden="true"
      >
        <span></span>
      </div>
    </header>
  );
}