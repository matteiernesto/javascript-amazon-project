import {formatCurrency} from '../../scripts/utils/money.js';

// Create a test suite (test suite - function)
describe('Test suite: formatCurrency', ()=>{
    // Create a test (test name - function)
    it('Converts cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('Works with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('Rounds up to the nearest cent',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('Rounds down to the nearest cent',()=>{
        expect(formatCurrency(2000.4)).toEqual('20.00');
    });

    it('Works with negative numbers (-2094)',()=>{
        expect(formatCurrency('-2094')).toEqual('-20.94');
    });
});