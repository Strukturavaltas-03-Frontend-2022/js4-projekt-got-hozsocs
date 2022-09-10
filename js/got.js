/*
A karakterek adatait egy weboldalon kell megjeleníteni,

1. HTML és CSS segítségével hozz létre egy hasonló elrendezésű oldalt! (Ne használj
  táblázatot!)
  2. Az ÉLŐ karakterek profilképe és alatta a nevük legyen megjelenítve.
  Mivel ez összesen 48 karakter lesz,  pontosan 6 sorod legyen, soronként 8 karakterrel.
  A képek útvonala ott van a JSON-objektumban.
  A térkép a "site" nevű mappában található az „assets“-en belül.
  A házak ikonja a "houses” mappában található az „assets"-en belül.
  Ha bármelyik kép hiányzik, használj egy szabadon választott placeholder image-et.

  3. A karakterek megjelenítése név szerint rendezve történjen!

  4. Amennyiben egy karakter nevére rákattintok, a jobb oldali sávban jelenjen meg a nagyobb
  méretű, filmből kivett képe, a karakter neve, a házának a címere (ha van) és a rövid leírása.

  5. Amennyiben a keresőmezőbe beírok egy nevet (teljes nevet, kis- és nagybetűk közötti
    különbség nem számít), akkor az adott nevű karakterről jeleníti meg az adatokat.
    Amennyiben nincs ilyen név, kiírja: "Character not found".

    Plusz:

    1. Font Awesome vagy egyéb ikonok használata a keresőmezőnél
    2. Használj saját betűkészletet a szövegek megjelenítéséhez
    3. A karakterek képeinek/nevének szövege legyen valamilyen effekttel ellátva, amikor föléjük viszem a kurzort
    4. A karakterek képeinek/nevének szövege legyen valamilyen effekttel ellátva, amikor az adott karakter van kiválasztva
    5. Legyen reszponzív a megjelenés  */

// import user from '../json/got.json' assert { type: "json" };
let user = [];

const asideHtml = document.querySelector('.aside');
asideHtml.innerHTML = `<div><h3 class="aside__title">GameofThrones</h3><img class="bigimage" 
src="../assets/pictures/kezdo.webp"> </div>`;
const searchInput = document.querySelector('#searchgot');
let lastTimeout = 0;

// keresés
const searchfunction = (searchvalue) => {
  const searchuserindex = user.findIndex((item) => item.name.toLowerCase() === searchvalue.toLowerCase());
  (searchuserindex === -1) ? alert(new Error('Character not found')) : writeToAsside(searchuserindex);
  searchInput.value = '';
};

// keresőmező figyelése
searchInput.addEventListener('keyup', (ev) => {
  clearTimeout(lastTimeout);
  lastTimeout = setTimeout(() => {
    clearTimeout(lastTimeout);

    searchfunction(ev.target.value);
  }, 2000);
});

// Rekordok sorba rendezése

const datasort = () => {
  user.sort((a, b) => {
    if (a.name.split(' ')[1] > b.name.split(' ')[1]) return 1; return -1;
  });
};

// Információk kiírása az Aside-ban!
const writeToAsside = (index) => {
  asideHtml.removeChild(asideHtml.firstElementChild);
  const asideinner = document.createElement('div');
  let houses = `../assets/houses/${user[index].house}.png`;
  if ((user[index].house === undefined) && (user[index].organization === undefined)) { houses = '../assets/houses/non.webp'; } else if
  (user[index].house === undefined) { houses = `../assets/houses/${user[index].organization}.png`; } else { houses = `../assets/houses/${user[index].house}.png`; }

  asideinner.innerHTML = `<h3 class="aside__title">GameofThrones</h3><img class="bigimage" 
    alt="${user[index].name}" id="img${index}" 
    src="../${user[index].picture}"/> <p class="aside_bigtext">${user[index].name} 
    <img class="image_house" id="img_house${index}" 
    src="${houses}"/></p> <p class="bio"> 
    ${user[index].bio} </p>`;
  document.getElementById('aside').appendChild(asideinner);
};

// elemek kiíratása

const writeElements = () => {
  for (let index = 0; index < 48; index++) {
    const divelement = document.createElement('div');
    divelement.setAttribute('id', `div${index}`);
    divelement.setAttribute('class', 'divelements');
    divelement.innerHTML = `<img class="image" alt="${user[index].name}" 
      id="img${index}" src="${user[index].portrait}"/> <p>${user[index].name}</p>`;

    document.getElementById('picture__container').appendChild(divelement);

    const divitem = document.querySelector(`#div${index}`);

    divitem.addEventListener('click', () => {
      writeToAsside(index);
    });
  }
};

const getProducts = async (url = '../json/got.json') => {
  try {
    const response = await fetch(url);
    user = await response.json();
    datasort();
    writeElements();
    return user;
  } catch (err) {
    console.error(err);
    return [];
  }
};

getProducts();
