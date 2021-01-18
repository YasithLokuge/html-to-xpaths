'use strict';
exports.htmlElementToXpaths = htmlElementToXpaths;
exports.htmlStringToXpaths = htmlStringToXpaths;

require('jsdom-global')();
var $ = require('jquery');

function traverseNodes(node, callback) {
    var child = node.childNodes[0];

    while (child) {
        if (child.childNodes.length) {
            traverseNodes(child, callback);
        }

        var nextNode = child.nextSibling;

        callback(child);
        child = nextNode;
    }

    return node;
}

function traverseReduce(node, callback, acc) {

    traverseNodes(node, function (child) {
        callback(acc, child);
    });

    return acc;
}

function getXPathForElement(element) {
    const idx = (sib, name) => sib
        ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
        : 1;
    const segs = elm => !elm || elm.nodeType !== 1
        ? ['']
        : elm.id && document.getElementById(elm.id) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`];
    return segs(element).join('/');
}

function htmlStringToXpaths(html) {
    var htmlObject = $(html);
    return htmlElementToXpaths(htmlObject.get(0));
}

function htmlElementToXpaths(element) {
    return traverseReduce(element, function (tags, child) {
        if (child instanceof Element) {
            tags.push(getXPathForElement(child));
        }
        return tags;
    }, [], true);
}