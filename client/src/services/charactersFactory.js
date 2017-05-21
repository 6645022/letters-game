"use strict";
export default function charactersFactory(){
    let characters;
    return {
        initCharactersObjects:()=>{
            characters = {
                runningCharacters : [],
                runningCharactersList : []
            };
        },
        getCharactersObjects:()=>{
            return characters;
        },
        pushRunningCharacters:(data)=>{
            if(characters.runningCharacters){
                characters.runningCharacters.push(data);
            };
        },
        pushRunningCharactersList:(data)=>{
            if(characters.runningCharactersList){
                characters.runningCharactersList.push(data);
            };
        },
        removeCharacters:(characterValue) => {
            if(characters.runningCharactersList && characters.runningCharacters){
                let runningCharactersIdx = characters.runningCharacters.findIndex((character)=>
                    character.value == characterValue
                );
                characters.runningCharacters.splice(runningCharactersIdx,1);

                let runningCharactersListIdx = characters.runningCharactersList.indexOf(characterValue);
                characters.runningCharactersList.splice(runningCharactersListIdx, 1);
            };
        },
        clearRunningCharactersObject:()=>{
            delete characters.runningCharacters;
            delete characters.runningCharactersList;
        }
    }
};