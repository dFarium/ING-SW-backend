function testRegex(input) {
    let regex = /[A-Za-z0-9]+\.[A-Za-z0-9]+@[A-Za-z0-9]+\.[a-zA-Z]+/i;
    return regex.test(input);
}

export default testRegex