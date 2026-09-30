import {
  useEffect,
  useState,
} from "react";

import Header from "./components/Header.jsx";
import Scoreboard from "./components/Scoreboard.jsx";
import GameBoard from "./components/GameBoard.jsx";

import shuffle from "./utils/shuffle.js";

import "./styles/App.css";

const POKEMON_IDS = [
  1,
  4,
  7,
  25,
  39,
  52,
  54,
  94,
  133,
  143,
  150,
  151,
];

export default function App() {
  const [pokemon, setPokemon] =
    useState([]);

  const [
    selectedPokemon,
    setSelectedPokemon,
  ] = useState([]);

  const [score, setScore] =
    useState(0);

  const [bestScore, setBestScore] =
    useState(0);

  const [message, setMessage] =
    useState(
      "Click a Pokémon to begin."
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(function () {
    async function fetchPokemon() {
      try {
        setIsLoading(true);
        setError("");

        const requests =
          POKEMON_IDS.map(
            function (id) {
              return fetch(
                `https://pokeapi.co/api/v2/pokemon/${id}`
              );
            }
          );

        const responses =
          await Promise.all(
            requests
          );

        const failedResponse =
          responses.find(
            function (response) {
              return !response.ok;
            }
          );

        if (failedResponse) {
          throw new Error(
            "Pokémon data could not be loaded."
          );
        }

        const pokemonData =
          await Promise.all(
            responses.map(
              function (response) {
                return response.json();
              }
            )
          );

        const formattedPokemon =
          pokemonData.map(
            function (item) {
              return {
                id: item.id,

                name:
                  item.name.charAt(
                    0
                  ).toUpperCase() +
                  item.name.slice(1),

                image:
                  item.sprites.other[
                    "official-artwork"
                  ].front_default,

                types:
                  item.types.map(
                    function (
                      typeInformation
                    ) {
                      return (
                        typeInformation
                          .type.name
                      );
                    }
                  ),
              };
            }
          );

        setPokemon(
          shuffle(
            formattedPokemon
          )
        );
      } catch (fetchError) {
        setError(
          fetchError.message
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchPokemon();
  }, []);

  function handlePokemonSelect(id) {
    const hasAlreadyBeenSelected =
      selectedPokemon.includes(id);

    if (hasAlreadyBeenSelected) {
      setScore(0);

      setSelectedPokemon([]);

      setMessage(
        "You already clicked that Pokémon. Try again!"
      );

      setPokemon(
        function (
          currentPokemon
        ) {
          return shuffle(
            currentPokemon
          );
        }
      );

      return;
    }

    const updatedSelection = [
      ...selectedPokemon,
      id,
    ];

    const updatedScore =
      score + 1;

    setSelectedPokemon(
      updatedSelection
    );

    setScore(updatedScore);

    setBestScore(
      function (
        currentBestScore
      ) {
        return Math.max(
          currentBestScore,
          updatedScore
        );
      }
    );

    if (
      updatedScore ===
      pokemon.length
    ) {
      setMessage(
        "Perfect score! You caught them all!"
      );

      setScore(0);

      setSelectedPokemon([]);
    } else {
      setMessage(
        "Correct! Choose another Pokémon."
      );
    }

    setPokemon(
      function (currentPokemon) {
        return shuffle(
          currentPokemon
        );
      }
    );
  }

  function restartGame() {
    setScore(0);
    setSelectedPokemon([]);

    setMessage(
      "The game has been restarted."
    );

    setPokemon(
      function (currentPokemon) {
        return shuffle(
          currentPokemon
        );
      }
    );
  }

  return (
    <div className="app">
      <div className="page-container">
        <Header />

        <div className="game-toolbar">
          <Scoreboard
            score={score}
            bestScore={bestScore}
          />

          <button
            className="restart-button"
            type="button"
            onClick={restartGame}
          >
            Restart game
          </button>
        </div>

        <p
          className="game-message"
          aria-live="polite"
        >
          {message}
        </p>

        {isLoading && (
          <div className="status">
            <div className="spinner"></div>

            <p>
              Loading Pokémon...
            </p>
          </div>
        )}

        {error && (
          <div className="status error">
            <p>{error}</p>

            <button
              type="button"
              onClick={function () {
                window.location.reload();
              }}
            >
              Try again
            </button>
          </div>
        )}

        {!isLoading &&
          !error && (
            <GameBoard
              pokemon={pokemon}
              onPokemonSelect={
                handlePokemonSelect
              }
            />
          )}
      </div>
    </div>
  );
}