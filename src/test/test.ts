import { expect } from 'chai';

import match from '../';

describe('Module exports', () => {
    const module = require('../../');

    it('Should have `__esModule` flag', () => {
        module.__esModule.should.be.true;
    });

    it('Should export method `match`', () => {
        (typeof module.match).should.equal('function');
    });

    it('Should export default as method `match`', () => {
        module.default.should.equal(module.match);
    });

    it('Should export entire module as method `match`', () => {
        module.should.equal(module.match);
    });
});

describe('Semver matching', () => {
    it('Should match the lastest version', () => {
        match('*', ['0.1.0', '0.2.0']).should.equal('0.2.0');
    });

    it('Should match the lastest version of range', () => {
        match('^0.1.0', ['0.1.0', '0.1.1', '0.2.0']).should.equal('0.1.1');
    });

    it('Should match nothing', () => {
        expect(match('^0.3.0', ['0.1.0', '0.2.0'])).to.be.undefined;
    });

    it('Should match tag', () => {
        match('next', ['0.1.0', '0.2.0'], {
            latest: '0.1.0',
            next: '0.2.0'
        })
            .should.equal('0.2.0');
    });
});
