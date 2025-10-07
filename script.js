//API
const input = document.getElementById('search-input');
const btn = document.getElementById('search-button');
const creatureName = document.getElementById('creature-name');
const creatureID = document.getElementById('creature-id');
const creatureWeight = document.getElementById('weight');
const creatureHeight= document.getElementById('height');
const loading = document.getElementById('loading');
const types = document.getElementById('types');

/* STATS  */
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
/* STATS  */

const searchForm = document.getElementById('searchForm');


searchForm.addEventListener('submit', async e =>{
    e.preventDefault();
    console.log('clicked');
    try {
        reset();
        const data = await getFromAPI(input.value.toLowerCase());
        console.log(data);
        const {name, id, weight, height, special, stats, types} = data; //DESTRUCTURE
        creatureName.textContent = name;
        creatureID.textContent = `#${id}`;
        creatureWeight.textContent = `Weight: ${weight}`;
        creatureHeight.textContent = `Height: ${height}`;
        //STATS
        hp.textContent = stats[0].base_stat;
        attack.textContent = stats[1].base_stat;
        defense.textContent = stats[2].base_stat;
        specialAttack.textContent = stats[3].base_stat;
        specialDefense.textContent = stats[4].base_stat;
        speed.textContent = stats[5].base_stat;
        //STATS

        //TYPES
        types.forEach(element => {
            const type = document.createElement('div');
            type.classList.add('typeChip');
            type.textContent = element.name;
            type.style.backgroundColor = creatureType(element.name);
        });
    } catch (error) {
        console.error(`Caught error ${error}`);
        
    }
});

async function getFromAPI(input){
    console.log(input);
    const APICall = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${input}`;
    loading.style.display = 'block';
    const resp = await fetch(APICall);
    loading.style.display = 'none';
    if(!resp.ok){
        alert('Creature not found.');
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

const creatureType = (typeName) =>{
    switch(typeName){
        case 'Fire': return '#e25822';
        case '': 
    }
    return '';
}