module.exports = function check(str, bracketsConfig) {
    if (str.length % 2 !== 0) return false;

    let stack = [];
    let dict = bracketsConfig.reduce(
        (acc, rec) => ({ ...acc, [rec[0]]: rec[1] }),
        {}
    );
    let dict2 = Object.keys(dict).reduce((acc, rec) => {
        return { ...acc, [dict[rec]]: rec };
    }, {});

    for (let i = 0; i < str.length; i += 1) {
        let symb = str[i];

        if (typeof dict[symb] !== "undefined") {
            if (dict[symb] === symb && stack.indexOf(symb) >= 0) {
                let openingSymbol = stack.pop();
                if (dict[openingSymbol] !== symb) {
                    return false;
                }
                continue;
            }
            stack.push(symb);
            continue;
        }

        if (typeof dict2[symb] !== "undefined") {
            const openingSymbol = stack.pop();
            if (dict[openingSymbol] !== symb) {
                return false;
            }
        }
    }
    return true;
};
