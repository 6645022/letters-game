"use strict";

export default function gameCtrl($scope,$rootScope,$interval,$timeout,charactersFactory,playerFactory){

    let scoreTimeout;
    let characters = [...'qwertyuiopasdfghjklzxcvbnm'];
    const maxLife  = 3;
    const containerWidth  = 290;
    const drawCharacterTimeout  = 3500;

    let updateScore = ()=> {
        $scope.player.score++;
        scoreTimeout = $timeout(updateScore, 50);
    };
    let drawCharacter = () => {
            $timeout(() => {
                let [value] = characters;
                characters = characters.slice(1);
                charactersFactory.pushRunningCharactersList(value);
                charactersFactory.pushRunningCharacters({
                    value: value,
                    position : {
                        top: 0,
                        left: Math.floor(Math.random() * (10 - containerWidth))+containerWidth
                    }
                });
                $scope.runningCharacters = charactersFactory.getCharactersObjects().runningCharacters;

                if(characters.length && $scope.gameIsActive){
                    drawCharacter();
                }
            }, drawCharacterTimeout);
    };
    let initGame = ()=>{
        charactersFactory.initCharactersObjects();
        $scope.availableToRestart = false;
        $scope.player = {score:0};
        $scope.life = maxLife;
        $scope.gameIsActive = true;
        drawCharacter();
        updateScore();
    };
    let gameOver = ()=>{
        $timeout.cancel(scoreTimeout);
        charactersFactory.clearRunningCharactersObject();
        $scope.gameIsActive = false;
    };
    (function init(){
        initGame();
    }());
    $scope.loseLife = ()=>{
        $scope.life--;
        if($scope.life == 0){
            gameOver();
        }
    };
    $rootScope.keyDown = (keyCode)=> {
        if ((keyCode >= 65 && keyCode <= 90) && $scope.gameIsActive){
            let characterValue = String.fromCharCode(keyCode).toLowerCase();
            let runningCharactersList =  charactersFactory.getCharactersObjects().runningCharactersList;
            if (!(runningCharactersList).includes(characterValue)) {
                $scope.loseLife();
            } else {
                charactersFactory.removeCharacters(characterValue);
            }
        }else if($scope.availableToRestart){
           initGame();
        }
    };
}