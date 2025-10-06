//API
const input = document.getElementById('search-input');
const btn = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureID = document.getElementById('creature-id');
const creatureWeight = document.getElementById('weight');
const creatureHeight= document.getElementById('height');

const searchForm = document.getElementById('searchForm');


searchForm.addEventListener('submit', async e =>{
    e.preventDefault();
    console.log('clicked');
    try {
        const data = await getFromAPI(input.value.toLowerCase());
        console.log(data);

        const {name, id, weight, height, special, stats, types} = data; //DESTRUCTURE
        creatureName.textContent = name;
        creatureID.textContent += id;
        creatureWeight.textContent += weight;
        creatureHeight.textContent += height;

    } catch (error) {
        console.error('Caught an error.');
    }
});

async function getFromAPI(input){
    console.log(input);
    const APICall = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${input}`;
    const resp = await fetch(APICall);
    if(!resp.ok){
        throw new Error('Could not fetch creature data.');
    }
    return resp.json();
}

const reset = () =>{
    creatureName.textContent = '';
    creatureID.textContent = '';
    creatureHeight.textContent = '';
    creatureWeight.textContent = '';
}

const searchCreature = () =>{

}