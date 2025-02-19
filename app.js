// *GUESS THE SECRET NUMBER*
// Autor: Allan Gomes

// DECLARAÇÃO DE VARIÁVEIS
let secretNumber;
let shot;
let maxNumber = 100;
let counter = 0;
let shotsWord;
let listOfSecretNumbers = [];

// DECLARAÇÃO DE FUNÇÕES
function showTextInScreen(tag, text) {
    fieldToFill = document.querySelector(tag);
    fieldToFill.innerHTML = text;
    responsiveVoice.speak(text, 'US English Female', { rate: 1.25 });

    return fieldToFill
}

function resetField(tag) {
    fieldToReset = document.querySelector(tag);
    fieldToReset.value = '';
}

function generateRandomNumber() {
    num = parseInt(Math.random() * maxNumber + 1);
    lengthOfList = listOfSecretNumbers.length;
    if (lengthOfList == maxNumber) {
        listOfSecretNumbers = [];
    }
    if (listOfSecretNumbers.includes(num)) {
        return generateRandomNumber()
    } else {
        listOfSecretNumbers.push(num);
        console.log(listOfSecretNumbers);
        console.log(`Your new secret number is: ${num}`);
        return num
    }
}

function checkShot() {
    shot = document.querySelector('input').value;
    counter++;
    console.log(`Result: ${shot == secretNumber}`);
    if (shot == secretNumber) {
        shotsWord = counter > 1 ? 'shots' : 'shot';
        showTextInScreen('h1', `Congratulations!`);
        showTextInScreen('p', `You guessed the secret number: ${secretNumber}, in ${counter} ${shotsWord}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('continuar').setAttribute('disabled', true);
    }
    else {
        paragrafo = shot > secretNumber ? showTextInScreen('p', `Try a lower number than ${shot} (between 1 and ${maxNumber})`) : showTextInScreen('p', `Try a higher number than ${shot} (between 1 and ${maxNumber})`);
        shot = resetField('input');
    }
}

function restartGame() {
    counter = 0;
    secretNumber = generateRandomNumber();
    showTextInScreen('h1', 'Guess the Secret Number');
    showTextInScreen('p', `There's a new secret number. Try numbers between 1 and ${maxNumber}`);
    shot = resetField('input');
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('continuar').removeAttribute('disabled');
}

// ATRIBUIÇÃO DE VARIÁVEIS
showTextInScreen('h1', 'Guess the Secret Number');
showTextInScreen('p', `Try numbers between 1 and ${maxNumber}`);
secretNumber = generateRandomNumber();

// PROGRAMA PRINCIPAL
const input = document.querySelector("input");

input.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        if (shot !== '') {
            if (shot != secretNumber) {
                checkShot();
            } else if (shot == secretNumber) {
                restartGame();
            }
        }
    }
})