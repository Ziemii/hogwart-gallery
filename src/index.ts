/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { HouseChoice, changeSectionTitle } from "./modules/helpers";
import Modal from "./modules/modal";
import FavoritesView from "./modules/favorites-view";
import HouseView from "./modules/house-view";

const houseView = new HouseView();
const favoritesView = new FavoritesView();

document.addEventListener("DOMContentLoaded", async () => {
  initializeFavoritesLocalStorage();
  setUpButtons();
  await houseView.loadHouse(HouseChoice.hogwart);
});

function initializeFavoritesLocalStorage() {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  if (favorites === null) {
    console.log("favorites null");
    localStorage.setItem("favorites", JSON.stringify([]));
  }
}

function setUpButtons() {
  const hogwartButton = document.getElementById("hogwart");
  changeSectionTitle("All students");
  hogwartButton.disabled = true;

  const gryffindorButton = document.getElementById("gryffindor");
  const slytherinButton = document.getElementById("slytherin");
  const hufflepuffButton = document.getElementById("hufflepuff");
  const ravenclawButton = document.getElementById("ravenclaw");
  const favoritesButton = document.getElementById("favorites");
  const buttons = [
    hogwartButton,
    gryffindorButton,
    slytherinButton,
    hufflepuffButton,
    ravenclawButton,
    favoritesButton,
  ];

  hogwartButton?.addEventListener("click", async (e) => {
    buttons.forEach((button) => (button.disabled = false));
    Modal.closeModal();
    await houseView.loadHouse(HouseChoice.hogwart);
    changeSectionTitle("All students");
    e.target.disabled = true;
    FavoritesView.hideManipulator();
  });
  gryffindorButton?.addEventListener("click", async (e) => {
    buttons.forEach((button) => (button.disabled = false));
    Modal.closeModal();
    await houseView.loadHouse(HouseChoice.gryffindor);
    changeSectionTitle("Gryffindor");
    e.target.disabled = true;
    FavoritesView.hideManipulator();
  });
  slytherinButton?.addEventListener("click", async (e) => {
    buttons.forEach((button) => (button.disabled = false));
    Modal.closeModal();
    await houseView.loadHouse(HouseChoice.slytherin);
    changeSectionTitle("Slytherin");
    e.target.disabled = true;
    FavoritesView.hideManipulator();
  });
  hufflepuffButton?.addEventListener("click", async (e) => {
    buttons.forEach((button) => (button.disabled = false));
    Modal.closeModal();
    await houseView.loadHouse(HouseChoice.hufflepuff);
    changeSectionTitle("Hufflepuff");
    e.target.disabled = true;
    FavoritesView.hideManipulator();
  });
  ravenclawButton?.addEventListener("click", async (e) => {
    buttons.forEach((button) => (button.disabled = false));
    Modal.closeModal();
    await houseView.loadHouse(HouseChoice.ravenclaw);
    changeSectionTitle("Ravenclaw");
    e.target.disabled = true;
    FavoritesView.hideManipulator();
  });
  favoritesButton?.addEventListener("click", async (e) => {
    buttons.forEach((button) => (button.disabled = false));
    Modal.closeModal();
    changeSectionTitle("Favorites");
    favoritesView.loadFavorites();
    e.target.disabled = true;
  });
}
