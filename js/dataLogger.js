module.exports = function (arr) {
    let output = [];

    arr.forEach(({id, accurances}) => {
        output.push({
            id,
            accurances
        })
    });

    console.log(output);
    return arr
}