var PostfixParser = (function () {
    'use strict';

    var input, pos = 0,

    lookahead = function() {
        return input[pos];
    },
    isNumber = function(x) {
        return (x >= '0' && x <= '9') ? true : false;
    },
    match = function (t) {
        if (lookahead() === t) {
            pos += 1;
        } else {
            throw {
                e: 'syntax_error',
                msg: 'syntax error'
            };
        }
    },
    term = function () {
        if (isNumber(lookahead())) {
            process.stdout.write(lookahead());
            match(lookahead());
        } else {
            throw {
                e: 'syntax_error',
                msg: 'syntax error'
            };
        }
    },
    expr = function () {
        term();
        while (true) {
            if (lookahead() === '+') {
                match('+');
                term();
                process.stdout.write('+');
            } else if (lookahead() === '-') {
                match('-');
                term();
                process.stdout.write('-');
            } else {
                return;
            }
        }
    };

    return function(x) {
        input = x;
        expr();
        console.log('');
    };

}());

var p = new PostfixParser('9-5+2');
