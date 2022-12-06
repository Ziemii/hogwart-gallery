/* eslint-disable @typescript-eslint/ban-ts-comment */
import Character from "./character";
import Modal from "./modal";

export default class FavoritesView {
  loadFavorites() {
    const favoritesData = localStorage.getItem("favorites");
    let favorites: Character[] = [];
    if (favoritesData) {
      favorites = JSON.parse(favoritesData);
    }

    const manipulatorContainer = document.getElementById("grid-manipulator");
    manipulatorContainer?.replaceChildren(this.gridManipulator());
    manipulatorContainer?.style.setProperty("display", "block");
    document
      .getElementById("view-container")
      ?.replaceChildren(this.generateCharactersCards(favorites));
  }
  static hideManipulator() {
    document
      .getElementById("grid-manipulator")
      ?.style.setProperty("display", "none");
  }
  gridManipulator() {
    const manipulatorContainer = document.createElement("div");
    manipulatorContainer.className = "manipulator-container";

    const singleColButton = document.createElement("button");
    singleColButton.innerHTML = `<i class="fa-solid fa-1">▮</i>`;
    singleColButton.className = "grid-button";
    singleColButton.addEventListener("click", () => {
      // @ts-ignore
      document.querySelector(":root")?.style.setProperty("--grid-var", "1fr");
    });
    const threeColButton = document.createElement("button");
    threeColButton.innerHTML = `<i class="fa-solid fa-3">▮</i>`;
    threeColButton.className = "grid-button";
    threeColButton.addEventListener("click", () => {
      document
      .querySelector(":root")
      // @ts-ignore
        ?.style.setProperty("--grid-var", "1fr 1fr 1fr");
    });

    const fiveColButton = document.createElement("button");
    fiveColButton.innerHTML = `<i class="fa-solid fa-5">▮</i>`;
    fiveColButton.className = "grid-button";
    fiveColButton.addEventListener("click", () => {
      document
      .querySelector(":root")
      // @ts-ignore
        ?.style.setProperty("--grid-var", "1fr 1fr 1fr 1fr 1fr");
    });
    manipulatorContainer.innerText = "Columns: ";
    manipulatorContainer.appendChild(singleColButton);
    manipulatorContainer.appendChild(threeColButton);
    manipulatorContainer.appendChild(fiveColButton);
    return manipulatorContainer;
  }

  buildCard(character: Character) {
    const characterCard = document.createElement("div");
    characterCard.className = "character-card";
    console.log(character.image);
    characterCard.innerHTML = `
    <div class="card-container">
      <div class="card-image-container">
        <img class="card-image" src="${character.image}" />
      </div>
        <h4><b>${character.name}</b></h4>
    </div>`;
    const favoritesButton = document.createElement("button");
    favoritesButton.className = "card-favorites-del";
    favoritesButton.innerText = "Remove";
    favoritesButton.addEventListener("click", (e) => {
      Modal.toggleFavorites(character, favoritesButton);
      // @ts-ignore
      e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    });
    characterCard.appendChild(favoritesButton);
    return characterCard;
  }
  generateCharactersCards(characters: Character[]) {
    const cardsContainer = document.createElement("div");
    cardsContainer.id = "cards-container";
    characters.forEach((character) => {
      cardsContainer.appendChild(this.buildCard(character));
    });
    return cardsContainer;
  }
}
