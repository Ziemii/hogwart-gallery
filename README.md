# Hogwart's Gallery by Łukasz Ziemacki
mail: lukasz.ziemacki@gmail.com

# Setup
```
\hogwart-gallery> npm install 
\hogwart-gallery> npm run hogwart

> parcel src/index.html
Server running at http://localhost:1234

```
After Parcel starts, the location where the dev server is listening will be printed to the terminal.

# Functionalities

Application communicates with https://hp-api.herokuapp.com/ API and have the following functionalities:

1) There are 6 buttons on the top of the page:
    * 'All students' - fetches data for characters who are Hogwarts students during the book series
    * 'Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw' - fetches data for characters in a certain house
    * 'Favorites' - navigates to a subpage with characters saved in local storage under key 'favorites'
2) Once data is fetched, displays a table containing columns:
    * Name
    * Date of birth
    * House
    * Wizard
    * Ancestry
    * Is student/staff
3) Three first columns are sortable, both ascending and descending, by clicking on desired table header.
4) Clicking on any record opens a modal containing the selected character's data and image.
5) Modal have a button for adding/removing character to Favorites. Data is saved in local storage under key 'favorites'.
6) Favorites subpage displays a rectangular card for each saved character.
7) Each card contains:
    * Image
    * Name
    * Button for removing from Favorites
8) 3 cards are displayed in a row by default, but the user is able to change the number of cards in a row (Columns: 1/3/5 buttons).

