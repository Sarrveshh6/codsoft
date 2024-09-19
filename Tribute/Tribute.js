const quotes = [
    "Captaincy is about backing your instinct, not following the crowd.",
    "You don't play for the crowd; you play for the country.",
    "I believe in giving more than 100% on the field and I don't really worry about the result.",
    "Learn to assess the situation and react accordingly.",
    "For me, the opposition is just another opposition.",
    "Face the failure, until the failure fails to face you.",
    "The process is more important than the results. And if you take care of the process, you will get the results.",
    "A loss makes you humble",
    "I don't mind repeating everything.",
];

function displayQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').innerText = quotes[randomIndex];
}
function toggleGallery() {
    const gallery = document.getElementById('gallery');
    const button = document.querySelector('.gallery-section button');

    if (gallery.style.display === 'none' || gallery.style.display === '') {
        gallery.style.display = 'block';
        button.textContent = 'Hide Gallery';
    } else {
        gallery.style.display = 'none';
        button.textContent = 'Show Gallery';
    }
}

function textGenerator(input) {
    
    const targetSum = 7;
    const targetLength = 7;
    const targetOutput = "Thala for a reason";
    const notBlessedOutput = "You are not blessed enough";

   
    if (!isNaN(input)) {
        
        input = input.toString();
        
        const digits = input.split('');
        const sum = digits.reduce((acc, char) => acc + parseInt(char, 10), 0);
        

        if (sum === targetSum) {
            return `${digits.join(' + ')} = ${sum} (Thala for a reason)`;
        } else {
            return `${digits.join(' + ')} = ${sum}. ${notBlessedOutput}`;
        }
    }

    
    if (typeof input === 'string') {
        
        if (input.length === targetLength) {
            return `${input.split('').join(' + ')} = ${targetLength} (Thala for a reason)`;
        }
        
        
        return `${input.split('').join(' + ')} = ${input.length}. ${notBlessedOutput}`;
    }

    return notBlessedOutput;
}

function showThalaReason() {
    const userInput = document.getElementById('userInput').value;
    const output = document.getElementById('thalaOutput');
    const result = textGenerator(userInput);
    output.innerText = result;
}
