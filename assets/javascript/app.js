
$(document).ready(function(){

let correctCount = 0;
let incorrectCount = 0;
let unanswered = 0;
let currentQuestion = 0;
var intvervalID;
var timer = 10;
// let newArray = [ ];
// let holder = [ ];
let running = false;
let pick;


//create an array of objects, with each object being the question with one right answer, 3 wrong answers, and an identifier

const myQuestions = [
    {
        question: "What president was JFK?",
        answers: {
            a: '35th',
            b: '30th',
            c: '29th',
            d: '40th'
        },
        correctAnswer: 'a',
        longAnswer: 'JFK was the 35th president of the United States.',
        picture: 'assets/images/jfk.jpg'
    },
    {
        question: "What two events took place in the same summer?",
        answers: {
            a: 'Moon landing and MLK assasination',
            b: 'Summer of love and the Tet offensive',
            c: 'Stonewall riots and Moon landing',
            d: 'Kent State Massacre and Summer of love'
        },
        correctAnswer: 'c',
        longAnswer: 'The Stonewall riots and the moon landing both occured in the summer of 1969.',
        picture: 'assets/images/stonewall.jpg'
    },
    {
        question: "Dubbed the most dangerous man in America, this person was declared a threat to the very fabric of the United States by President Nixon:",
        answers: {
            a: 'Charlie Manson',
            b: 'Dr. Timothy Leary',
            c: 'Lee Harvey Oswald',
            d: 'Malcolm X'
        },
        correctAnswer: 'b',
        longAnswer: 'Dr. Leary, a Harvard psychologist, was declared the most dangerous man in America after he advocated for widespread usage of LSD.',
        picture: 'assets/images/tunein.jpg'
    },
    {
        question: "What year was the turning point of the Vietnam war?",
        answers: {
            a: '1963',
            b: '1966',
            c: '1970',
            d: '1968'
        },
        correctAnswer: 'd',
        longAnswer: 'The Tet offensive is considered the turning point of the Vietnam war, where it was officially ruled as unwinnable.',
        picture: 'assets/images/tet.jpg'
    },
    {
        question: "A vocal opponent of the Vietnam War, this person wrote the anthem Fortunate Son by Creedence Clearwater Revival",
        answers: {
            a: 'John Foggerty',
            b: 'Don McLean',
            c: 'Syd Barrett',
            d: 'Harry Nilsson'
        },
        correctAnswer: 'a',
        longAnswer: 'John Foggerty is the frontman of CCR and wrote fortunate son.',
        picture: 'assets/images/ccr2.jpg'
    },
    {
        question: "The frontman of this band said that he was amazingly jealous yet inspired by The Beatles, especially their Rubber Soul album",
        answers: {
            a: 'Rolling Stones',
            b: 'Jefferson Airplane',
            c: 'Beach boys',
            d: 'The Doors'
        },
        correctAnswer: 'c',
        longAnswer: 'Brian Wilson said in an interview that Rubber Soul inspired their hit album Pet Sounds.',
        picture: 'assets/images/battle.jpg'
    },
    {
        question: "This Swiss scientists' accidental discovery later led to the biggest drug of the counter culture movement of the 1960's",
        answers: {
            a: 'Albert Hoffman',
            b: 'Sven Hallen',
            c: 'Jens Finkes',
            d: 'Lars Strauss'
        },
        correctAnswer: 'a',
        longAnswer: 'Albert Hoffman accidentally discovered LSD while trying to create a new heart medication.',
        picture: 'assets/images/hoffman.png'
    },
    {
        question: "Which of the following governmental agencies attempted to assasinate Fidel Castro using LSD?",
        answers: {
            a: 'Central Intelligence Agency',
            b: 'Federal Bureau of Investigation',
          
        },
        correctAnswer: 'a',
        longAnswer:  'This was one of hundreds of failed attempts by the CIA to assasinate Castro.',
        picture: 'assets/images/plot.jpg'
    },
    {
        question: "This 1960s author wrote one of the most prolific novels of her time, and was later awarded numerous honorary PhDs and even a presidental medal of freedom, the highest civilian award available.",
        answers: {
            a: 'Rachel Carson',
            b: 'Vicki Baum',
            c: 'Harper Lee',
            d: 'Madeline Lengle'
        },
        correctAnswer: 'c',
        longAnswer: 'Harper Lee wrote To Kill a Mockingbird, and was awarded the presidential medal of freedom in 2003 by former President George Bush. ',
        picture: 'assets/images/harper.jpg'
    },
    {
        question: "LSD was first synthesized from the fungus of what?",
        answers: {
            a: 'Trolgot',
            b: 'Ergot',
            c: 'Eomycota',
            d: 'Hyphomycetes'
        },
        correctAnswer: 'b',
        longAnswer:  'Ergot of rye is produced by a lower fungus (Claviceps purpurea) that grows parasitically on rye, and is often used to derive medicinal compounds. One such derivative is Lysergic acid ditheylamide, or LSD. The LSD we know today is known as LSD-25.',
        picture: 'assets/images/ergot.jpg'
    }

    
]

//FUNCTIONS
function resetGame(){
    correctCount = 0;
    incorrectCount = 0;
    unanswered = 0;
    currentQuestion = 0;
    timer=10;
    running = false;

    $('#question').empty();
    $('#answer1').empty();
    $('#answer2').empty();
    $('#answer3').empty();
    $('#answer4').empty();
    $('#image-view').empty();        
        

    $('#question').html("<button id='start' type='button' class='btn btn-danger btn-md btn-primary-spacing'>Start</button>");
    $('#start').on('click', function(){
        showQuestion();
    });
    
}

function showQuestion(){
    if(correctCount + incorrectCount + unanswered === myQuestions.length){
        showEnd();
    } else{
    let i = currentQuestion;
    pick = myQuestions[i];
        startTimer();
        $('#question').html("<p class='questions'>" + pick.question + "<p>");
        $('#answer1').html("<button id='buttonA' type='button' class='btn btn-danger btn-md btn-primary-spacing'>" + pick.answers.a +"</button>");
        $('#answer2').html("<button id='buttonB' type='button' class='btn btn-danger btn-md btn-primary-spacing'>" + pick.answers.b +"</button>");
        $('#answer3').html("<button id='buttonC' type='button' class='btn btn-danger btn-md btn-primary-spacing'>" + pick.answers.c +"</button>");
        $('#answer4').html("<button id='buttonD' type='button' class='btn btn-danger btn-md btn-primary-spacing'>" + pick.answers.d +"</button>");        
        $('#image-view').empty();
        checkAnswer();
    }
}



function startTimer(){
    if(!running){
        intvervalID = setInterval(decrement, 1000);
        running = true;
    }
}

function decrement(){
    timeDisplay = timer - 1;
    $('#timer').html("<h4>Time remaining: " + timeDisplay + "</h4>");
    timer--;
    if(timer ===0) {
        unanswered++;
        stop();
        showAnswer();
    }
}

function stop() {
    running = false;
    clearInterval(intvervalID);
}


function checkAnswer(){
    let i = currentQuestion;
    $('#buttonA').on('click',function(){
        stop();
        if(myQuestions[i].correctAnswer === 'a'){
            correctCount++;
            $('#question').html("<p class='rightOrWrong'> Correct! <p>");
            showAnswer();
        } else {
            incorrectCount++;
            $('#question').html("<p class='rightOrWrong'> Wrong answer! <p>");
            showAnswer();
        }
    })

    $('#buttonB').on('click',function(){
        stop();
        if(myQuestions[i].correctAnswer === 'b'){
            correctCount++;
            $('#question').html("<p class='rightOrWrong'> Correct! <p>");
            showAnswer();
        } else {
            incorrectCount++;
            $('#question').html("<p class='rightOrWrong'> Wrong answer! <p>");
            showAnswer();
        }
    })
    
    $('#buttonC').on('click',function(){
        stop();
        if(myQuestions[i].correctAnswer === 'c'){
            correctCount++;
            $('#question').html("<p class='rightOrWrong'> Correct! <p>");
            showAnswer();
        } else {
            incorrectCount++;
            $('#question').html("<p class='rightOrWrong'>Wrong answer! <p>");
            showAnswer();
        }
    })

    $('#buttonD').on('click',function(){
        stop();
        if(myQuestions[i].correctAnswer === 'd'){
            correctCount++;
            $('#question').html("<p class='rightOrWrong'> Correct! <p>");
            showAnswer();
        } else {
            incorrectCount++;
            $('#question').html("<p class='rightOrWrong'> Wrong answer! <p>");
            showAnswer();
        }
    })
}

function showAnswer(){
    i=currentQuestion;
    $('#answer1').html("<p class='rightOrWrong'>" + pick.longAnswer + "</p>");
    $('#answer2').html("<p>Number of questions answered correctly: " + correctCount + "</p>");
    $('#answer3').html("<p>Number of questions answered incorrectly: " + incorrectCount + "</p>");
    $('#answer4').html("<p>Number of questions timed out: " + unanswered + "</p>");  
    $('#image-view').html("<img class='picAnswer' src='" + pick.picture + "'>");      
    startTimer2();

}

function startTimer2(){
    setTimeout(threeSeconds,3000);
}

function threeSeconds(){
    currentQuestion = currentQuestion + 1;
    timer =10;
    showQuestion();
}


function showEnd(){
    console.log('Game Ended');
    let percentScore = correctCount / myQuestions.length * 100;
    let score = percentScore.toFixed(0);
    let messages = ['Far out, man!', 'Groovy!', 'Better hit the books!', 'Tune in and turn on, but do not drop out! Time to study some 60s, man!']
    let message;
    if(score > 89){ message = messages[0]} else {
        if(score>79) {message = messages[1]} else {
            if(score>50) {message = messages[2]} else {
                message = messages[3];
            } 
        }

    }

    $('#question').html("<p class='rightOrWrong'> Game Over! <p>");
    $('#answer1').html("<p id='message'>You scored " + score + "%!  " + message + "</p>");
    $('#answer2').html("<p>Number of questions answered correctly: " + correctCount + "</p>");
    $('#answer3').html("<p>Number of questions answered incorrectly: " + incorrectCount + "</p>");
    $('#answer4').html("<p>Number of questions timed out: " + unanswered + "</p>");   
    $('#timer').html("<h4>Time remaining: 0 </h4>")
    $('#image-view').html("<button id='tryAgain' type='button' class='btn btn-danger btn-md btn-primary-spacing'>Try Again</button>");
    $('#tryAgain').on('click', function(){
        resetGame();
    });
}

resetGame();
$('#question').html("<button id='start' type='button' class='btn btn-danger btn-md btn-primary-spacing'>Start</button>");
$('#start').on('click', function(){
    showQuestion();
});


})
