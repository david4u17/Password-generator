const clipboardT = document.getElementById('clipboard');
const resultT = document.getElementById('result');
const lowerT = document.getElementById('lowercase');
const upperT = document.getElementById('uppercase');
const numberT = document.getElementById('number');
const symbolT = document.getElementById('symbol');
const lengthT = document.getElementById('length');
const generateT = document.getElementById('generate');

const randomFunc = {

    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardT.addEventListener('click', () => {
    const passwordT = resultT.innerText;

    if (!passwordT) {
        return;
    }

    navigator.clipboard.writeText(passwordT)
    alert('Password copied successfully!')

})

generateT.addEventListener('click', () => {

    const length = + lengthT.value;
    const hasLower = lowerT.checked;
    const hasUpper = upperT.checked;
    const hasNumber = numberT.checked;
    const hasSymbol = symbolT.checked;

    resultT.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

function generatePassword(lower, upper, number, symbol, length) {

    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const FuncName = Object.keys(type)[0];

            generatedPassword += randomFunc[FuncName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;

}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbol = '!@#$%^&*(){}[];<>/'
    return symbol[Math.floor(Math.random() * symbol.length)];
}