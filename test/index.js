var should = require('should');
var htmlToXpaths = require('../src/html-to-xpaths');
var $ = require('jquery');
var fs = require('fs');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const htmlString = require('./fixtures/simple.html');
const simpleHtml = $(htmlString).get(0);

const expected = [
    '/#document-fragment[1]/div[1]/table[1]',
    '/#document-fragment[1]/div[1]/div[1]/ul[1]/li[1]',
    '/#document-fragment[1]/div[1]/div[1]/ul[1]',
    '/#document-fragment[1]/div[1]/div[1]/span[1]',
    '/#document-fragment[1]/div[1]/div[1]/ul[2]/li[1]',
    '/#document-fragment[1]/div[1]/div[1]/ul[2]/li[2]',
    '/#document-fragment[1]/div[1]/div[1]/ul[2]',
    '/#document-fragment[1]/div[1]/div[1]',
    '/#document-fragment[1]/div[1]/table[2]',
    '/#document-fragment[1]/div[1]/div[2]/ul[1]/li[1]',
    '/#document-fragment[1]/div[1]/div[2]/ul[1]',
    '/#document-fragment[1]/div[1]/div[2]/span[1]',
    '/#document-fragment[1]/div[1]/div[2]/ul[2]/li[1]',
    '/#document-fragment[1]/div[1]/div[2]/ul[2]/li[2]',
    '/#document-fragment[1]/div[1]/div[2]/ul[2]',
    '/#document-fragment[1]/div[1]/div[2]'
];

describe('HTML to xpaths', function() {

    it('convert from element', function() {
    	const result = htmlToXpaths.htmlElementToXpaths(simpleHtml);
        expected.should.eql(result);
    });

    it('convert from string', function() {
        const result = htmlToXpaths.htmlStringToXpaths(htmlString);
        expected.should.eql(result);
    });
});