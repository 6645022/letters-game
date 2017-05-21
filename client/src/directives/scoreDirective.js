"use strict";
export default function scoreDirective(playerFactory){
    return{
        restrict: 'E',
        templateUrl: "./src/templates/score.html",
        link:function(scope, element, attrs){
            let getHighestScorePlayer = ()=>{
                playerFactory.getHighestScorePlayer()
                    .then((result) => {
                        scope.highestScorePlayer = result.data.data;
                        scope.$parent.availableToRestart = true;
                    },(err)=>{
                        console.log(err);
                    });
            }
            scope.submitScore = ($event) =>{
                $event.preventDefault();
                playerFactory.setPlayer(scope.player)
                    .then(()=>{
                        getHighestScorePlayer();
                },(err)=>{
                    console.log(err);
                });
            };
        }
    }
}