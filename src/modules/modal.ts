import Character from "./character";

export default class Modal {
  static showCharacterModal(character: Character) {
    const modal = document.getElementById("modal") || HTMLElement.prototype;
    const status = (character) => {
      return character.hogwartsStudent ? 'Student' : character.hogwartsStaff ? 'Staff' : '---'
    }
    modal.innerHTML = `
      <div class="modal-content">
          <div>
            <img class="modal-image" src=${character.image} />
          </div>
          <div class="modal-text">
              <h2>${character.name}</h2>
              <div><b>Date of birth:</b> ${character.dateOfBirth}</div>
              <div><b>House:</b> ${character.house}</div>
              <div><b>Wizard:</b> ${character.wizard}</div>
              <div><b>Ancestry:</b> ${character.ancestry}</div>
              <div><b>Status:</b> ${status(character)}</div>
          </div>
      </div>
      `;
    const modalButtons = document.createElement("div");
    modalButtons.className = "modal-buttons";
    const favoritesButton = document.createElement("button");
    favoritesButton.className = this.isInFavorites(character)
      ? "modal-favorites-del"
      : "modal-favorites-add";
    favoritesButton.innerText = this.isInFavorites(character)
      ? "Remove"
      : "Add";
    favoritesButton.addEventListener("click", () => {
      this.toggleFavorites(character, favoritesButton);
    });
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.className = "modal-close";
    closeButton.addEventListener("click", () => this.closeModal());

    modalButtons.replaceChildren(favoritesButton, closeButton);
    modal?.appendChild(modalButtons);
    modal.style.display = "block";
  }

  static closeModal() {
    const modal = document.getElementById("modal");
    if (modal) {
      modal.style.display = "none";
    }
  }

  static toggleFavorites(
    character: Character,
    favoritesButton: HTMLButtonElement
  ) {
    const favoritesData = localStorage.getItem("favorites");
    let favorites: Character[] = [];
    if (favoritesData) {
      favorites = JSON.parse(favoritesData);
    } else {
      console.error("Couldn't get local favorites.");
      return;
    }
    if (favorites.length === 0) {
      favoritesButton.className = "modal-favorites-del";
      favoritesButton.innerHTML = "Remove";
      favorites.push(character);
    } else {
      let foundCharacter = false;
      favorites.forEach((favorite, index) => {
        if (favorite.name == character.name) {
          foundCharacter = true;
          favorites.splice(index, 1);
        }
      });
      if (!foundCharacter) {
        favorites.push(character);
        favoritesButton.className = "modal-favorites-del";
        favoritesButton.innerHTML = "Remove";
      } else {
        favoritesButton.className = "modal-favorites-add";
        favoritesButton.innerHTML = "Add";
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  static isInFavorites(character: Character) {
    let inFavorites = false;
    const favoritesData = localStorage.getItem("favorites");
    let favorites: Character[] = [];
    if (favoritesData) {
      favorites = JSON.parse(favoritesData);
    } else {
      console.error("Couldn't get local favorites.");
      return;
    }
    if (favorites.length === 0) {
      console.log("first false");
      return false;
    }
    favorites.forEach((favorite) => {
      if (favorite.name == character.name) {
        console.log("name match");
        inFavorites = true;
      }
    });
    return inFavorites;
  }
}
