import Character from "./character";
import { fetch_characters, HouseChoice, mapDataToCharacter } from "./helpers";
import Modal from "./modal";

export default class HouseView {
  _sortState = {
    name: false,
    dob: false,
    house: false,
  };
  _characters = {};

  async loadHouse(house: HouseChoice) {
    const fetched_data = await fetch_characters(house);
    const characters = mapDataToCharacter(fetched_data);
    document
      .getElementById("view-container")
      ?.replaceChildren(this._generateTable(characters));
  }

  _generateTable(characters: Character[]) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const nameHeader = document.createElement("th");
    nameHeader.id = "header-name";
    nameHeader.innerHTML = 'Name<i class="fa-solid fa-sort">';
    nameHeader.addEventListener("click", () => {
      document
        .getElementById("view-container")
        ?.replaceChildren(this._sortTable(characters, "name"));
    });
    const dateOfBirthHeader = document.createElement("th");
    dateOfBirthHeader.id = "header-dob";
    dateOfBirthHeader.innerHTML =
      'Date of birth<i class="fa-solid fa-sort"></i>';
    dateOfBirthHeader.addEventListener("click", () => {
      document
        .getElementById("view-container")
        ?.replaceChildren(this._sortTable(characters, "dob"));
    });
    const houseHeader = document.createElement("th");
    houseHeader.id = "header-house";
    houseHeader.innerHTML = 'House<i class="fa-solid fa-sort"></i>';
    houseHeader.addEventListener("click", () => {
      document
        .getElementById("view-container")
        ?.replaceChildren(this._sortTable(characters, "house"));
    });
    const wizardHeader = document.createElement("th");
    wizardHeader.textContent = "Wizard";
    const ancestryHeader = document.createElement("th");
    ancestryHeader.textContent = "Ancestry";
    const memberHeader = document.createElement("th");
    memberHeader.textContent = "Is student/staff";
    const tbody = document.createElement("tbody");
    tbody.id = "table-body";

    characters.forEach((character) => {
      const tableRow = document.createElement("tr");
      tableRow.className = "character-row";
      tableRow.innerHTML = `
            <td class="character-name">${character.name}</td>
            <td class="character-dob">${character.dateOfBirth}</td>
            <td class="character-house">${character.house}</td>
            <td>${character.wizard}</td>
            <td>${character.ancestry}</td>
            <td>
            ${character.hogwartsStudent ? "Student" : ""}
            ${character.hogwartsStaff ? "Staff" : ""}
            </td>
            `;
      tableRow.addEventListener("click", () => {
        Modal.showCharacterModal(character);
      });
      tbody.appendChild(tableRow);
    });
    thead.replaceChildren(
      nameHeader,
      dateOfBirthHeader,
      houseHeader,
      wizardHeader,
      ancestryHeader,
      memberHeader
    );
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }
  _sortTable(characters: Character[], sortBy) {
    switch (sortBy) {
      case "name":
        console.log("name");
        this._sortState.name
          ? characters.sort((a, b) => (a.name < b.name ? 1 : -1))
          : characters.sort((a, b) => (a.name > b.name ? 1 : -1));
        this._sortState.name = !this._sortState.name;
        break;
      case "dob":
        this._sortState.dob
          ? characters.sort((a, b) => (a.isoDate < b.isoDate ? 1 : -1))
          : characters.sort((a, b) => (a.isoDate > b.isoDate ? 1 : -1));
        this._sortState.dob = !this._sortState.dob;
        break;
      case "house":
        this._sortState.house
          ? characters.sort((a, b) => (a.house < b.house ? 1 : -1))
          : characters.sort((a, b) => (a.house > b.house ? 1 : -1));
        this._sortState.house = !this._sortState.house;
        break;
    }
    return this._generateTable(characters);
  }
}
