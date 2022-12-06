export default interface Character {
  name: string;
  dateOfBirth: string;
  isoDate: Date;
  house: "Gryffindor" | "Slytherin" | "Hufflepuff" | "Ravenclaw" | "";
  wizard: boolean;
  ancestry: string;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  image: string;
}
