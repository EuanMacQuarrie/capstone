const { updateUI } = require("../client/js/application");

import {updateUI} from '.../client/js/application';
import { timeStamp } from 'console';

describe('Testing the fucntions works', () =>{
    timeStamp('Return true', () => {
        expect(updateUI).toBeDefined();
    });
});