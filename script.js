async function getCharacters() {
  let characters;
  let endpoint;

  // Lee el parámetro de la URL
  const urlParams = new URLSearchParams(window.location.search);
  let pagina = "index";
  pagina = urlParams.get("pagina");

  // Modifica el endpoint según la página en la que se encuentre
  if (pagina === "index" || pagina === null) {
    endpoint = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20";
  } else if (pagina === "second") {
    endpoint = "21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40";
  }

  // Recoge la informacion de la base de datos (es lo equivalente a un fetch de clase)
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${endpoint}`
    );
    characters = response.data;
  } catch (error) {
    console.error(error);
  }

  // Se devulve la informacion obtenida
  return characters;
}

async function showCharacters() {
  // Esperamos a que getCharacters() termine, almacenamos los datos en characters y le asignamos un variable al div contenedor 1
  const characters = await getCharacters();
  const characterContainer = document.querySelector(".character-container");

  characters.forEach((character) => {
    // Creamos un elemento div con la clase character-info
    const characterInfo = document.createElement("div");
    characterInfo.classList.add("character-info");

    // Crea elementos HTML para cada propiedad del personaje (parte interior del div character-info)
    const name = document.createElement("h1");
    name.textContent = character.name;
    characterInfo.appendChild(name);

    const status = document.createElement("p");
    status.textContent = `Status: ${character.status}`;
    characterInfo.appendChild(status);

    const species = document.createElement("p");
    species.textContent = `Especie: ${character.species}`;
    characterInfo.appendChild(species);

    const id = document.createElement("p");
    id.textContent = `Id: ${character.id}`;
    characterInfo.appendChild(id);

    // Aqui para poner la foto del personaje de fondo
    //characterInfo.style.backgroundImage = `url(${character.image})`;

    // Se agrega el elemento "character-info" al contenedor de personajes "characterContainer".
    characterContainer.appendChild(characterInfo);
  });
}
/*
async function searchCharacter(characterName) {
  const characters = await getCharacters();
  const filter = characters.filter((character) => {
    return character.name.toLowerCase().includes(characterName.toLowerCase());
  });

  showCharacter(filter);
}
*/
async function showCharacter(character) {
  const charac = await getCharacter(character);
  // Limpia el contenedor de personajes
  const characterContainer = document.querySelector(".character-container");
  characterContainer.innerHTML = "";

  charac.forEach((character) => {
    const characterInfo = document.createElement("div");
    characterInfo.classList.add("character-info");

    const name = document.createElement("h1");
    name.textContent = character.name;
    characterInfo.appendChild(name);

    const status = document.createElement("p");
    status.textContent = `Status: ${character.status}`;
    characterInfo.appendChild(status);

    const species = document.createElement("p");
    species.textContent = `Especie: ${character.species}`;
    characterInfo.appendChild(species);

    const id = document.createElement("p");
    id.textContent = `Id: ${character.id}`;
    characterInfo.appendChild(id);

    characterContainer.appendChild(characterInfo);
  });
}

showCharacters();

const searched = document.getElementById("buscador");
searched.addEventListener("submit", (e) => {
  e.preventDefault();
  showCharacter(e.srcElement.value);
});

async function getCharacter(name) {
  let character;
  let endpoint;
  endpoint = `?name=${name}`;

  // Recoge la informacion de la base de datos (es lo equivalente a un fetch de clase)
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${endpoint}`
    );
    character = response.data;
    console.log(character);
  } catch (error) {
    console.error(error);
  }

  // Se devulve la informacion obtenida
  return character;
}
