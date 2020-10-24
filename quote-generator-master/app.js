let randomButton = document.querySelector('#random');
let backButtton = document.querySelector('#back');
let author = document.querySelector(".author");
let moreQuotes = document.querySelector('.moreQuotes');


//  fetch quote for first time

getRandomQuote();

function getRandomQuote() {
    fetch('https://quote-garden.herokuapp.com/api/v2/quotes/random')
        .then(response => {
            if(response.ok)
                return response.json();
            else
                return Promise.reject(response);            
        })
        .then(data => {
            addQuote(data.quote);

        })
        .catch(err => {
            console.warn('something\'s wrong', err.message);
        });
}

function addQuote(quote) {
    // console.log(quote);
    document.querySelector('blockquote').innerText = quote.quoteText;
    document.getElementById('author').innerText = quote.quoteAuthor;
}

function getAuthor() {
    let name = document.getElementById('author');
    console.log(name.textContent);
    getQuoteByAuthor(name.textContent);
}

function getQuoteByAuthor(author) {
    fetch(`https://quote-garden.herokuapp.com/api/v2/authors/${author}?page=1&limit=10`)
        .then(response => {
            if(response.ok)
                return response.json();
            else
                return Promise.reject(response);
        })
        .then(data => {
            createQuotesByArray(data.quotes);
        })
}

function createQuotesByArray(quotes) {

    quotes.forEach(quote => {
        // console.log(`${quote.quoteText} -> ${quote.quoteAuthor}`);
        bq = document.createElement('blockquote');
        bq.classList.add('other');
        bq.appendChild(document.createTextNode(quote.quoteText))
        moreQuotes.appendChild(bq);
    });

    //  to disable functioning of author button
    author.classList.add('disable');
}



        //  to fetch random qoutes

let randomise = document.getElementById('random');

randomise.onclick = (e) => {
    e.preventDefault();
    getRandomQuote();
}


        // work with author


author.onclick = (e) => {
    backButtton.classList.remove('hidden');
    randomButton.classList.add('hidden');
    getAuthor();
    
};  


//      go back


backButtton.onclick = e => {
    e.preventDefault();
    backButtton.classList.add('hidden');
    randomButton.classList.remove('hidden');
    author.classList.remove('disable');
    // remove all other quotes
    while(moreQuotes.firstChild) {
        moreQuotes.firstChild.remove();
    }
}