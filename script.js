const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const inputOriginal = document.getElementById('input-original');
const cipher = document.getElementById('cipher');
const result = document.getElementById('result');
const range = document.getElementById('range');

const shifMessage = () => {
    const wordArray = [...inputOriginal.value.toUpperCase()];
    printChar(0, wordArray);
};

const printChar = (currentLetterIndex, wordArray) => {
    if(wordArray.length === currentLetterIndex) return;
    inputOriginal.value = inputOriginal.value.substring(1);
    const spanChar = document.createElement("span");
    result.appendChild(spanChar);
    animateChar(spanChar)
        .then( () => {
            const charNoCode = wordArray[currentLetterIndex];
            spanChar.innerHTML = alphabet.includes(charNoCode) ? 
                alphabet[(alphabet.indexOf(charNoCode) + parseInt(range.value)) % alphabet.length] : 
                charNoCode;
            printChar(currentLetterIndex + 1, wordArray);
        });
};

const animateChar = spanChar => {
    let changeLetter = 0;
    return new Promise(resolve => {
        const interval = setInterval(() => {
            spanChar.innerHTML = alphabet[Math.floor(Math.random() * alphabet.length)];
            changeLetter++;
            if(changeLetter === 3) {
                clearInterval(interval);
                resolve();
            }
        }, 50);
    });
};

const submit = e => {
    e.preventDefault();
    result.innerHTML = '';
    shifMessage();
};

cipher.onsubmit = submit;
