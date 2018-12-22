function doubleAfter2seconds(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(2 * num)
        }, 0);
    } )
}

async function testResult() {
    let first = await doubleAfter2seconds(30);
    let second = await doubleAfter2seconds(50);
    let third = await doubleAfter2seconds(30);
    console.log(3)
    console.log(first + second + third);
    let result = await doubleAfter2seconds(30);
    console.log(result);
    console.log(4)
}
console.log(1)

testResult();

console.log(2)
