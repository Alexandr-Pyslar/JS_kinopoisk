const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies")
function apiSearch(e) {
    e.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    const server = "https://api.themoviedb.org/3/search/multi?api_key=d86ca64010d84d9a3269a45fbe212bc5&language=ru&query=" + searchText;
    requestApi(server);
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url){
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status !== 200) {
            console.log('error: ' + request.status);
            return;
        }

        const output = JSON.parse(request.responseText)

        let inner = '';
        console.log( output.results) 
        output.results.forEach(function (item, i, array) {
            let nameItem = item.name || item.title;
            let firstDate = item.first_air_date || item.release_date;
            inner = `${inner} <div class='col-12'> ${nameItem} / <i>Дата выхода: ${firstDate}</i></div>`
        })
        movie.innerHTML = inner;
    });
}
// test

