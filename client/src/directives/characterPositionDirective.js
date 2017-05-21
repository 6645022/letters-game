"use strict";
export default function characterPositionDirective($interval,charactersFactory,$timeout){
    return{
        restrict: 'A',
        scope:{
          char:'=',
          loseLife: '&loseLife'
        },
        link:function(scope, element, attrs){
            let positionInterval;
            const CONTAINER = document.getElementById('game-container');

            let destroyScope = ()=>{
                $interval.cancel(positionInterval);
                scope.$on('$destroy', function() {
                    scope.$destroy();
                    element.remove();
                });
            };
            let changeBackgroundColor = ()=>{
                CONTAINER.style.backgroundColor = 'red';
                $timeout(()=>{
                    CONTAINER.style.backgroundColor = 'black';
                }, 5);
                $timeout.cancel();
            };
            positionInterval = $interval(()=> {
                let runningCharactersListIdx;
                let runningCharactersList = charactersFactory.getCharactersObjects().runningCharactersList;

                element.css('left',`${scope.char.position.left}px`);
                element.css('top',`${scope.char.position.top++}px`);

                if(runningCharactersList)
                    runningCharactersListIdx = runningCharactersList.indexOf(scope.char.value);

                if((scope.char.position.top > (CONTAINER.clientHeight - 20)) && runningCharactersListIdx > -1){
                    destroyScope();
                    charactersFactory.removeCharacters(scope.char.value);
                    scope.loseLife();
                    changeBackgroundColor();
                }else if(runningCharactersListIdx == -1){
                    destroyScope();
                }
            }, 30);
        }
    }
}