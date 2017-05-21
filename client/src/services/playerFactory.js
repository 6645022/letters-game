"use strict";
let promise = require('bluebird');
export default function playerFactory($http,$rootScope){
	return {
        setPlayer:(parameters) => {
			return new promise((resolve,reject)=>{
				$http({
					method: 'POST',
					url: `${$rootScope.api}/player`,
					data: parameters,
					headers: {'Content-Type': 'application/json'}
				}).then((result)=>{
					resolve(result)
				},(err)=>{
					reject(err);
				})
			});
		},
		getHighestScorePlayer:()=>{
			return new promise((resolve,reject)=>{
				$http.get(`${$rootScope.api}/player`).then((result)=>{
					resolve(result)
				},(err)=>{
					reject(err);
				});
			});
		}
	}
};