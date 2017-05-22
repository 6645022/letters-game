import angular from 'angular';
import gameController from './controllers/gameController';
import characterPositionDirective from './directives/characterPositionDirective'
import scoreDirective from './directives/scoreDirective'
import playerFactory from './services/playerFactory'
import charactersFactory from './services/charactersFactory'

import 'angular-route';

angular.module('game', ['ngRoute'])
.run(($rootScope) => {
    $rootScope.api    = "q:80";
})
.config(($routeProvider) => {
    $routeProvider
	.when('/game', {
        templateUrl: './src/templates/game.html',
        controller : gameController
	})
	.otherwise({
        redirectTo: '/game'
    });
})
.controller('gameCtrl', gameController)
.directive('characterPosition', characterPositionDirective)
.directive('score', scoreDirective)
.factory('playerFactory', playerFactory)
.factory('charactersFactory', charactersFactory);
