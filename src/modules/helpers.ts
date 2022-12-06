import Character from "./character";

export enum HouseChoice {
  hogwart = "https://hp-api.herokuapp.com/api/characters/students",
  gryffindor = "https://hp-api.herokuapp.com/api/characters/house/gryffindor",
  slytherin = "https://hp-api.herokuapp.com/api/characters/house/slytherin",
  hufflepuff = "https://hp-api.herokuapp.com/api/characters/house/hufflepuff",
  ravenclaw = "https://hp-api.herokuapp.com/api/characters/house/ravenclaw",
}

export async function fetch_characters(house: string): Promise<Character[]> {
  return await fetch(house)
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function mapDataToCharacter(data) {
  const characters: Array<Character> = data.map((character: Character) => {
    let isoDate = new Date("1900-10-10");
    if (character.dateOfBirth != "") {
      const [DD, MM, YYYY]: string[] = character.dateOfBirth.split("-");
      isoDate = new Date(YYYY.concat("-", MM).concat("-", DD));
    }

    return <Character>{
      name: character.name,
      dateOfBirth: character.dateOfBirth != "" ? character.dateOfBirth : "―――",
      isoDate: isoDate,
      house: character.house != "" ? character.house : "―――",
      wizard: character.wizard,
      ancestry: character.ancestry != "" ? character.ancestry : "―――",
      hogwartsStudent: character.hogwartsStudent,
      hogwartsStaff: character.hogwartsStaff,
      image: character.image
        ? character.image
        : new URL("../img/hogwarts-crest.jpg", import.meta.url),
    };
  });
  return characters;
}

export function changeSectionTitle(title: string) {
  const sectionTitle = document.getElementById("section-title");
  if (sectionTitle) {
    sectionTitle.innerHTML = title;
  } else {
    console.error("Couldn't get section title.");
  }
}

