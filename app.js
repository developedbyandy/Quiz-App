'use strict';
//let counter = 0;
/**
 * 
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */
/********** TEMPLATE GENERATION FUNCTIONS **********/
// These functions return HTML templates
function generateHomePageHTML() {
  return `    
      <div class="container">
                <h1>Welcome to the sports quiz!</h1>
                <form id="js-opening-page">
                    <button type="button" id="start-quiz">Start the Quiz!</button>
                </form>
            </div>`;
  console.log('generateHomePageHTML() ran');
}
// this needs to reference our questions in our store object array
function generateQuestionHTML() {
  // store.questions[counter] will give the question at counter value

  let question = store.questions[store.questionNumber];

  return `
  <div class="container">
       <h1>${question.name}</h1>
       <form id="js-question-form">
           <input type="radio" id="male" name="answers" value=${question.answers[0]}>
           <label for="male">${question.answers[0]}</label><br>
           <input type="radio" id="female" name="answers" value=${question.answers[1]}>
           <label for="female">${question.answers[1]}</label><br>
           <input type="radio" id="other" name="answers" value=${question.answers[2]}>
           <label for="other">${question.answers[2]}</label><br>
           <input type="radio" id="other" name="answers" value=${question.answers[3]}>
           <label for="other">${question.answers[3]}</label><br>
           <button type="submit" id="give-answer">Send it!</button>
       </form>
       <quiz-place>Question number: ${store.questionNumber} out of 5</quiz-place><br>
       <score-spot>You have gotten ${store.score} correct</score-spot>
     </div>`;
}
/********** RENDER FUNCTION(S) **********/
// This function conditionally replaces the contents of the <main> tag based on the state of the store
// need to alert when user enters answer right or wrong.
function renderMain() {
  if (store.quizStarted) {
    renderQuestionPage();
  } else {
    renderHomePage();
  }
  //if quiz started true render question page else render home
  // if quiz started true render question
  // as long as questions.length
  //
}






function renderHomePage() {

  let homePage = generateHomePageHTML();
  $('main').html(homePage);

  console.log('renderHomePage() ran');
}


function renderQuestionPage() {
  // How do we keep track of questions and keep going through our array of objects(questions).
  // if Quiz start: true
  let questionHTML = generateQuestionHTML();

  $('main').html(questionHTML);
  console.log('renderQuestionPage() ran');
}

function renderResultsPage() {
  let resultsHTML = generateResultsPageHTML();
  $('main').html(resultsHTML)

}
/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)
// This needs to send us to our question page.

function startPageButton() {
  $('#start-quiz').on('click', event => {
    event.preventDefault();
    renderQuestionPage();

    console.log(store.questionNumber);

  });
  console.log('startPageButton() ran');
}
// submitAnswer needs to send us to our next question page, by adding to the counter value.
// also needs to compare the correct answer
// access correct answer with store.questions[0].correctAnswer
function submitAnswer() {

  $('main').on('submit', '#js-question-form', function (event) {
    event.preventDefault();
    let question = store.questions[store.questionNumber];
    //needs an if statement only increment as long as store.questions.length -1
    // also need


    if (parseInt(event.target.answers.value) === question.correctAnswer) {
      store.score++;
    } else {

      alert(`Sorry, wrong Answer the correct answer was ${question.correctAnswer}`);
    }

    store.questionNumber += 1;
    if (store.questionNumber < 5) {
      renderQuestionPage();
    } else if (store.questionNumber = 5) {
      renderResultsPage();
    } else {
      renderHomePage();
    }


  });
  // needs to match 



}

function collectAnswers() {
  $('input[type=radio').click(function (event) {
    console.log('blah blah', $('input[name=answers]:checked').val());
  })

}

function resultsPageButton() {
  $("return-home").on("click", "js-results-page", function (event) {
    event.preventDefault();
    renderHomePage();

    console.log("blach blh");

  });

}


function generateResultsPageHTML() {
  return `    
  <div class="container">
            <h1>Welcome to the sports quiz!</h1>
            <form id="js-results-page">
                <button type="button" id="return-home">Try Again!</button>
            </form>
            <p>Congrats! You got ${store.score} correct</p>
        </div>`;
  console.log('generateHomePageHTML() ran');

}



function handleQuiz() {
  // needs to render our home page, and activate all of our other functions.
  // console.log(questions.length);
  renderMain();
  generateHomePageHTML();
  //renderHomePage();
  generateQuestionHTML();
  //renderQuestionPage();
  startPageButton();
  submitAnswer();
  collectAnswers();
  resultsPageButton();
  console.log('handleQuiz() ran');
}
$(handleQuiz);