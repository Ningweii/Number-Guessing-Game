
//---------------------------რიცხვის გამოცნობის თამაში-------------------

// ეს არის პატარა თამაში სადაც კომპიუტერს ჩაფიქრებული აქვს რიცხვი 1-დან 10-ის ჩათვლით 
// და მომხმარებელმა ეს რიცხვი უნდა გამოიცნოს. მომხმარებელს ამისთვის სულ სამი ცდა აქვს.



// ცვლადი 'correctAnswer' არის კონსტანტა ანუ მუდმივი ტიპის ცვლადი და მას ვანიჭებ 1 - 10  შემთხვევით (რენდომ) მნიშვნელობას.
// ეს არის ის მნიშვნელობა რომელიც იუზერმა უნდა გამოიცნოს. ანუ ეს ცვლადი ინახავს სწორ პასუხს
// და შესაბამისად მას შედარდება იუზერის მიერ არჩეული მნიშვნელობები "გესები" (სიტყვა guess-ს არ აქვს კაი შესატყვისი ქართულში)
const correctAnswer = Math.floor(Math.random() * 10 + 1)

// აქ იუზერის პროგრესს გამოვსახავ
let displayCorrectAnswer = document.getElementById('displayCorrectAnswer')

// რესტარტის ღილაკი (რომელიც მხოლოდ მაშინ გამოჩნდება როდესაც მცდელობები ამოიწურება)
const displayRestartBtn = document.getElementById('displayRestartBtn')

// ქაუნთერები რომლებითაც დავითვლით იუზერის მცდელობების რაოდენობას
let numberOfTriesInt = 0
let numberOfTriesUp = 0
let numberOfTriesDown = 0

// ამ მასივში შევინახავ ყველა მნიშვნელობას რომელიც იუზერმა ერთი სესიის განმავლობაში შემოიყვანა
let userGuessValues = []

// ამ მასივში ვინახავ გამეორებულ მნიშვნელობებს. (იმ შემთხვევისთვის თუ იუზერი ორჯერ ან მეტჯერ 
// შეიყვანს ერთსა და იმავე ციფრს)
let userGuessDuplicateValues = []

let userGuessLabel = document.getElementById('userGuessLabel')
let userGuessObject = document.getElementById('userGuess')
let numberOftriesLeft = document.getElementById('numberOfTriesLeft')


// ეს ფუნქცია შესრულდება როდესაც თამაში დასრულდება. როგორც მოგების ისე წაგების შემთხვევაში
function gameOver() {
    userGuessObject.disabled = true
    submitBtn.disabled = true
    const restartBtn = document.createElement('button')
    restartBtn.type = "button"
    restartBtn.innerText = "თავიდან"
    displayRestartBtn.style.alignSelf = "center"
    displayRestartBtn.appendChild(restartBtn)
    restartBtn.onclick = function(){
        window.location.reload()
    }
}

// საბმითის ღილაკი (რომლის ყოველ დაკლიკებაზეც ჩვენი ქვემოთ გაწერილი ფუნქცია შესრულდება)
const submitBtn = document.getElementById('submitBtn')

// ონქლიქ ფუნქცია რომელიც უნდა შესრულდეს როცა მომხმარებელი 'წავიდა' ღილაკს დააწვება.
// ქვემოთ რა კოდიც წერია ყველაფერი ამ ფუნქციის შიგნით სრულდება
submitBtn.onclick = function(){
    numberOfTriesInt += 1
    userGuessObject.focus()

    let numberOfTriesString = ''
    
    // ეს სვიჩ კოდი უბრალოდ იმისთვისაა რომ როდესაც იუზერი სწორ პასუხს გამოიცნობს 
    // მცდელობების რაოდენობა დაიბეჭდოს როგორ სიტყვა და არა როგორც რიცხვი
    switch (numberOfTriesInt){
        case 2 : numberOfTriesString = 'ორი'; break
        case 3 : numberOfTriesString = 'სამი'; break
        case 4 : numberOfTriesString = 'ოთხი'; break
        case 5 : numberOfTriesString = 'ხუთი'; break
        case 6 : numberOfTriesString = 'ექვსი'; break
        case 7 : numberOfTriesString = 'შვიდი'; break
        case 8 : numberOfTriesString = 'რვა'; break
        case 9 : numberOfTriesString = 'ცხრა'; break
        case 10 : numberOfTriesString = 'ათი'; break
        default : numberOfTriesString = 'ამოუცნობი რაოდენობის'
    }

    let userGuessValue = document.getElementById('userGuess').value

    // ამ კოდით ვამოწმებ რომ იუზერმა ერთზე მეტჯერ არ შემოიყვანოს ერთი და იგივე მნიშვნელობა
    if(userGuessValue != '') userGuessValues.push(userGuessValue)
    for(let i = 0; i < userGuessValues.length; i++){
        for(let j = i + 1; j < userGuessValues.length; j++){
            if(userGuessValues[i] == userGuessValues[j]){
                userGuessDuplicateValues.push(userGuessValues[i])
                userGuessValues.pop()
                
            }
        }
    }

    displayCorrectAnswer.style.fontWeight = "bold"

    if (userGuessValue == ''){
        displayCorrectAnswer.innerText = 'რიცხვი უნდა აირჩიო. ისე არ გამოვა...'
        numberOfTriesInt -= 1
    }   
    
    else if(userGuessDuplicateValues.includes(userGuessValue)){
        displayCorrectAnswer.innerText = (`რიცხვი ${userGuessValue} უკვე აირჩე. სხვა რიცხვი შეარჩიე`)
        numberOfTriesInt -= 1
    }

    else if(userGuessValue > 10){
        displayCorrectAnswer.innerText = 'ათზე მაღალი რიცხვის არჩევა არ შეიძლება'
        numberOfTriesInt -= 1
    } 
    else if(userGuessValue < 1 || userGuessValue == 0){
        displayCorrectAnswer.innerText = 'ერთზე დაბალი რიცხვის არჩევა არ შეიძლება'
        numberOfTriesInt -= 1
    }
    else if(correctAnswer == userGuessValue && numberOfTriesInt == 1) {
        userGuessLabel.style.fontWeight = "bold"
        userGuessLabel.innerText = 'შეუდარებელია!'
        displayCorrectAnswer.innerText = (`ვაააუ!!! პირელივე ცდაზე გამოიცანი! სწორი პასუხი იყო ${correctAnswer}!`)
        gameOver()
    }
    else if(correctAnswer == userGuessValue){
        userGuessLabel.style.fontWeight = "bold"
        userGuessLabel.innerText = 'ყოჩაღ!'
        displayCorrectAnswer.innerText = (`გამოიცანი! სულ ${numberOfTriesString} ცდა დაგჭირდა! სწორი პასუხი იყო ${correctAnswer}`)
        gameOver()
    }
    
    else if(numberOfTriesInt == 3) {
        userGuessLabel.style.fontWeight = "bold"
        userGuessLabel.innerText = (`თამაში დასრულდა.. მცდელობები აღარ დაგრჩა`)
        displayCorrectAnswer.innerText = (`დამარცხდი :( სწორი პასუხი იყო ${correctAnswer}`)
        gameOver()
    }
    
    // ეს კოდი გვჭირდება მაშინ როდესაც იუზერმა სწორ პასუხზე დაბალი მნიშვნელობა აირჩია. 
    // და ჩვენ მას ვეუბნებით რომ ცოტა ზემოთ წავიდეს
    else if(userGuessValue < correctAnswer && userGuessValue > 0){
        numberOfTriesUp += 1 
        if (userGuessValue < correctAnswer && numberOfTriesUp == 1){
            displayCorrectAnswer.innerText = (`ცოტა ზემოთ`)
        }                                                                             
        else if(userGuessValue < userGuessValues[userGuessValues.length - 2]){
            displayCorrectAnswer.innerText = 'ზემოთ თქო...'
            numberOfTriesInt -= 1
        }
        else if(userGuessValue < correctAnswer && numberOfTriesUp == 2){
            displayCorrectAnswer.innerText = (`ცოტა კიდე უფრო ზემოთ`)
        }

        // ეს userGuessObject ატრიბუტი მაინც გავწერე რადგან იუზერი დაბლა არ წავიდეს როდესაც
        // ვეუბნები რომ უფრო მაღალი მნიშვნელობაა სწორი პასუხი ვიდრე მან აირჩია.
        // !მხოლოდ მაშინ მუშაობს თუ იუზერს ისრების დახმარებით შეჰყავს მნიშვნელობები!
        userGuessObject.setAttribute('min', userGuessValue)
        
    }

    // ეს კოდი გვჭირდება მაშინ როდესაც იუზერმა სწორ პასუხზე მაღალი მნიშვნელობა აირჩია. 
    // და ჩვენ მას ვეუბნებით რომ ცოტა ქვემოთ წავიდეს
    else if(userGuessValue > correctAnswer && userGuessValue < 11){
        numberOfTriesDown += 1
        if(userGuessValue > correctAnswer && numberOfTriesDown == 1){
            displayCorrectAnswer.innerText = ('ცოტა ქვემოთ')
        }
        else if(userGuessValue > userGuessValues[userGuessValues.length - 2]){
            displayCorrectAnswer.innerText = 'ქვემოთ თქო...'
            numberOfTriesInt -= 1
        }
        else if(userGuessValue > correctAnswer && numberOfTriesDown == 2){
            displayCorrectAnswer.innerText = ('ცოტა კიდევ უფრო ქვემოთ')
        }

        // userGuessObject ატრიბუტზე აქაც იგივე ხდება რაც ზემოთ დავწერე. 
        // იუზერს ვაიძულებთ რომ ქვემოთ წავიდეს. თუმცა თუ ხელით შეჰყავს იუზერს მნიშვნელობა 
        // და არა ისრებით ეს კოდი არ მუშაობს
        userGuessObject.setAttribute('max', userGuessValue)

    }

    numberOftriesLeft.innerText = (`დარჩენილი მცდელობების რაოდენობა: ${3 - numberOfTriesInt}`)

    
    

    
    //                       Only For Devs
    // ამ ხაზის ქვემოთ კოდი წერია დეველოპერებისთვის და მხოლოდ კონსოლში ჩანს
    console.log(`number of tries ${numberOfTriesInt}`)

    console.log('history of user guess values: '+userGuessValues)

    console.log(`-------------------------------------------------------------------------------------------`)

}


console.log('Correct answer is '+correctAnswer)


// საბოლოოდ იმას დავამატებ რომ აპლიკაციას გამოსწორება სჭირდება რადგან ზოგიერთი სცენარის დროს
// ცოტას ურევს. მაგალითად როდესაც იუზერს გამიზნულად შემოჰყავს მნიშვნელობები არალოგიკური
// თანმიმდევრობით. თუმცა მთლიანობაში აპი ნორმალურად მუშაობს. 







