// variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array
var newsDataArr = [];

// apis 
const API_KEY = "75d0267b6ac6454687950378a743477f";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function() {
    newsType.innerHTML="<h4>Headlines</h4>";
    fetchHeadlines();
};

generalBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>General news</h4>";
    fetchGeneralNews();
});

businessBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Business</h4>";
    fetchBusinessNews();
});

sportsBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Sports</h4>";
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Technology</h4>";
    fetchTechnologyNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML="<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

function fetchHeadlines(){
    fetch(HEADLINES_NEWS+API_KEY)
    .then(response => response.json())
    .then(data => {
        newsDataArr = data.articles;
        displayNews();
    })
    .catch(error => console.log(error));
}

function fetchGeneralNews(){
    fetch(GENERAL_NEWS+API_KEY)
    .then(response => response.json())
    .then(data => {
        newsDataArr = data.articles;
        displayNews();
    })
    .catch(error => console.log(error));
}

function fetchBusinessNews(){
    fetch(BUSINESS_NEWS+API_KEY)
    .then(response => response.json())
    .then(data => {
        newsDataArr = data.articles;
        displayNews();
    })
    .catch(error => console.log(error));
}

function fetchSportsNews(){
    fetch(SPORTS_NEWS+API_KEY)
    .then(response => response.json())
    .then(data => {
        newsDataArr = data.articles;
        displayNews();
    })
    .catch(error => console.log(error));
}

function fetchEntertainmentNews(){
    fetch(ENTERTAINMENT_NEWS+API_KEY)
    .then(response => response.json())
    .then(data => {
        newsDataArr = data.articles;
        displayNews();
    })
    .catch(error => console.log(error));
}

function fetchTechnologyNews(){
    fetch(TECHNOLOGY_NEWS+API_KEY)
    .then(response => response.json())
    .then(data => {
        newsDataArr = data.articles;
        displayNews();
    })
    .catch(error => console.log(error));
}

function fetchQueryNews(){
    if(newsQuery.value.length==0) return;
    fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY)
    .then(response => response.json())
    .then(data => {
        newsDataArr = data.articles;
        displayNews();
    })
    .catch(error => console.log(error));
}

function displayNews() {
    newsdetails.innerHTML = "";
    newsDataArr.forEach(news => {
        let col = document.createElement('div');
        col.className = 'col-sm-12 col-md-4 col-lg-3 p-2 card';
        let card = document.createElement('div');
        card.className = "p-2";

        let image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage || "default-news-image.jpg"; // Placeholder for missing images

        let cardBody = document.createElement('div');

        let newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        let dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = news.publishedAt.split("T")[0];

        let description = document.createElement('p');
        description.className = "text-muted";
        description.innerHTML = news.description;

        let link = document.createElement('a');
        link.className = "btn btn-warning";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });
}

// Dark mode toggle
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector('.navbar').classList.toggle("dark-mode");
    document.querySelectorAll('.card').forEach(card => {
        card.classList.toggle("dark-mode");
    });
    document.querySelector('footer').classList.toggle("dark-mode");
});

// Handle newsletter form submission
const newsletterForm = document.getElementById("newsletterForm");
newsletterForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("subscriberEmail").value;
    if (email) {
        document.getElementById("successMessage").classList.remove("d-none");
        newsletterForm.reset();
    }
});


