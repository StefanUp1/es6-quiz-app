const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const myQuestions = [
    {
        question: 'Who is the strongest?',
        answers: {
            a: 'Superman',
            b: 'Batman',
            c: 'Rick (from Rick and Morty)'
        },
        correctAnswer: 'c'
    },

    {
        question: 'Is it true cannibals do not eat clown because they taste funny?',
        answers: {
            a: 'They do not taste funny, trust me',
            b: 'Yes',
            c: 'No'
        },
        correctAnswer: 'a'
    },

    {
        question: 'Who was the legendary Benedictine monk who invented champagne?',
        answers: {
            a: 'Nicolas Feuillatte',
            b: 'Dom Perignon',
            c: 'Moët'
        },
        correctAnswer: 'b'
    },

    {
        question: 'Worlds longest river is?',
        answers: {
            a: 'Amazon',
            b: 'Yangtze',
            c: 'Nile'
        },
        correctAnswer: 'a'
    }
]

function buildQuiz() {
    //place to store HTML output
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        //store the list of answers choices
        const answers = [];

        //and for each available answer...
        for (letter in currentQuestion.answers) {
            //...add an HTML radio button
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter}:
                    ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        //add this question and its answers to the output
        output.push(
            `<div class="slide">
                <div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
            </div>`
        );
    });

    //combine output list into one string of HTML and put it on page
    quizContainer.innerHTML = output.join('');
}

function showResults() {
    //gether answer containers from qiuz
    const answerContainers = quizContainer.querySelectorAll('.answers');
    //keep track of user's answers
    let numCorrect = 0;

    //for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
        //find seleceted answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            //add to the number of correct answers
            numCorrect++;

            //colorThe answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            //if answer is wrong or blank, color the answers red
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    //show number of correct answers out of total
    resultContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`
}

//show slide
function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
        previousBtn.style.display = 'none';
    } else {
        previousBtn.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
        nextBtn.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

//display quiz right away
buildQuiz();

const previousBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const slides = document.querySelectorAll('.slide')
let currentSlide = 0;

showSlide(0);

//on submit, show results
nextBtn.addEventListener('click', showNextSlide);
previousBtn.addEventListener('click', showPreviousSlide);
submitButton.addEventListener('click', showResults);
