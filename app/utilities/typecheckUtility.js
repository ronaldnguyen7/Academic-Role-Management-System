const isNumber = (n, msg) => {
    if (typeof n != 'number') {
        throw new Error(msg || `Expected a string, but ${n} is not a string`);
    }
}

const isString = (s, msg) => {
    if (typeof s != 'string') {
        throw new Error(msg || `Expected a string, but ${s} is not a string`);
    }
}

const isArray = (array, typecheck, aMsg, type) => {
    if (!Array.isArray(array)) {
        throw new Error(aMsg || `Expected an array, but ${array} is not an array`)
    }

    array.forEach(
        a => typecheck(a, `Expected an array of ${type}, ${a} is a ${type}.`)
    )
}

const parseQueryArray = (query, converter, typecheck, type) => {
    if (!query) return undefined;

    let array = Array.isArray(query) ? query : [query];
    array = array.map(element => converter(element));
    isArray(array, typecheck, null, type);
    return array;
}

module.exports = {
    isNumber,
    isString,
    isArray,
    parseQueryArray
}