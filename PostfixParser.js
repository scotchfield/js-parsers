var PostfixParser = (function (x) {
    var input, pos = 0,

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
    },
    term = function () {
        if (isNumber(lookahead())) {
            process.stdout.write(lookahead());
            match(lookahead());
        } else {
            throw {
                e: 'syntax_error',
                msg: 'syntax error',
            };
        }
    },
    match = function (t) {
        if (lookahead() === t) {
            pos += 1;
        } else {
            throw {
                e: 'syntax_error',
                msg: 'syntax error',
            };
        }
    },
    lookahead = function() {
        return input[pos];
    },
    isNumber = function(x) {
        return (x >= '0' && x <= '9') ? true : false;
    };

    return function(x) {
        input = x;
        expr();
        console.log('');
    };

})();

var p = PostfixParser('9-5+2');
