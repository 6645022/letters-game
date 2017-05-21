"use strict";
import { playerRouter} from './routes/playerRouter';

export default class routes{
    constructor(app){
        let allowCrossOrigin = (req, res, next)=>{
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        };

        app.use(allowCrossOrigin);
        app.use('/player',playerRouter);
    };
};