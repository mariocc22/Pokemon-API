"use strict";

const pokeCard = document.querySelector("[data-poke-card]");
const pokeShadow = document.documentElement;
const pokeName = document.querySelector("[data-poke-name]");
const pokeImg = document.querySelector("[data-poke-img]");
const pokeImgContainer = document.querySelector("[data-poke-img-container]");
const pokeId = document.querySelector("[data-poke-id]");
const pokeTypes = document.querySelector("[data-poke-types]");
const pokeStats = document.querySelector("[data-poke-stats]");

const typeColors = {
  electric: "#F8D030",
  normal: "#A8A878",
  fire: "#F08030",
  water: "#6890F0",
  ice: "#98D8D8",
  rock: "#B8A038",
  flying: "#A890F0",
  grass: "#78C850",
  psychic: "#F85888",
  ghost: "#705898",
  bug: "#A8B820",
  poison: "#A040A0",
  ground: "#E0C068",
  dragon: "#7038F8",
  steel: "#B8B8D0",
  fighting: "#C03028",
  dark: "#705848",
  default: "#2A1A1F",
};

const searchPokemon = async function (e) {
  try {
    e.preventDefault();
    const { value } = e.target.pokemon;
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`
    );
    const res = await data.json();
    renderPokemonData(res);
  } catch (err) {
    console.error(err.message);
  }
};

const renderPokemonData = (data) => {
  const sprite = data.sprites.front_default;
  const { stats, types } = data;

  pokeName.textContent = data.name;
  pokeImg.setAttribute("src", sprite);
  pokeId.textContent = `Nº ${data.id}`;
  setCardColor(types);
  renderPokemonTypes(types);
  renderPokemonStats(stats);
};

const setCardColor = (types) => {
  const colorOne = typeColors[types[0].type.name];
  const colorTwo = types[1]
    ? typeColors[types[1].type.name]
    : typeColors.default;
  pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
  pokeImg.style.backgroundSize = " 5px 5px";
  pokeShadow.style.setProperty("--clr-shadow", colorOne);
};

const renderPokemonTypes = (types) => {
  pokeTypes.innerHTML = "";
  types.forEach((type) => {
    const typeTextElement = document.createElement("div");
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    pokeTypes.appendChild(typeTextElement);
  });
};

const renderPokemonStats = (stats) => {
  pokeStats.innerHTML = "";
  stats.forEach((stat) => {
    const statElement = document.createElement("div");
    const statElementName = document.createElement("div");
    const statElementAmount = document.createElement("div");
    statElementName.textContent = stat.stat.name;
    statElementAmount.textContent = stat.base_stat;
    statElement.appendChild(statElementName);
    statElement.appendChild(statElementAmount);
    pokeStats.appendChild(statElement);
  });
};

const renderNotFound = () => {
  pokeName.textContent = "No encontrado";
  pokeImg.setAttribute("src", "poke-shadow.png");
  pokeImg.style.background = "#fff";
  pokeTypes.innerHTML = "";
  pokeStats.innerHTML = "";
  pokeId.textContent = "";
};
