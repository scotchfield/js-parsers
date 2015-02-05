var Lexer = (function () {
    'use strict';

    var input, pos = 0, line = 1, words = {},

    Token = function (t) {
        return {tag: t};
    },
    Num = function (v) {
        var that = new Token('_num');
        that.value = v;
        return that;
    },
    Word = function (t, s) {
        var that = new Token(t);
        that.lexeme = s;
        return that;
    },
    peek = function () {
        return input[pos];
    },
    reserve = function (t) {
        words[t.lexeme] = t;
    },
    isNumber = function (x) {
        return (x >= '0' && x <= '9') ? true : false;
    },
    isLetter = function (x) {
        return x !== undefined && x.match(/[a-z]/i);
    },
    scan = function () {
        var v, s, w;
        if (peek() === undefined) {
            return null;
        }
        while (true) {
            if (peek() === '\n') {
                line += 1;
            } else if (peek() !== ' ' && peek !== '\t') {
                break;
            }
            pos += 1;
        }
        if (isNumber(peek())) {
            v = 0;
            do {
                v = 10 * v + parseInt(peek(), 10);
                pos += 1;
            } while (isNumber(peek()));
            return new Num(v);
        }
        if (isLetter(peek())) {
            s = '';
            do {
                s += peek();
                pos += 1;
            } while (isLetter(peek()));
            if (s in words) {
                return words[s];
            }
            w = new Word('_id', s);
            words[s] = w;
            return w;
        }
        return new Token(peek());
    };

    return function (x) {
        var token;

        input = x;

        reserve(new Word('_true', 'true'));
        reserve(new Word('_false', 'false'));

        token = scan();
        while (token !== null) {
            console.log(token);
            token = scan();
        }
    };

}());

var l = new Lexer('42 is a number');
