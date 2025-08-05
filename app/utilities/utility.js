const greaterThan = (left, right) => left > right;

const lessThan = (left, right) => left < right;

const calculateAverage = numbers => {
    let sum = 0

    numbers.forEach(n => sum += n);
    return sum / numbers.length;
}

const calculate = (numbers, operator) => {
    let num = numbers[0];

    numbers.slice(1).forEach(n => {
        if (operator(n, num)) {
            num = n
        }
    })

    return num;
}

module.exports = {
    calculateAverage,
    greaterThan,
    lessThan,
    calculate
}