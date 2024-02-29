import {formatCurrency} from '../scripts/utils/money.js';


console.log('Converts cents into dollars!')

if(formatCurrency(2095) === '20.95') console.log('Passed!');
else console.log('Failed!');

console.log('Works with 0');

if(formatCurrency(2000.4) === '20.00') console.log('Passed!');
else console.log('Failed!');

console.log('Rounds up to the nearest cent')

if(formatCurrency(2000.4) === '20.00') console.log('Passed!');
else console.log('Failed!');

console.log(formatCurrency(2000.4));


