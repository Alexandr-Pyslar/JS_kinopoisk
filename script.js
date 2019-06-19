//XMLHttpRequest
const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies")

function apiSearch(e) {
    e.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    const server = "https://api.themoviedb.org/3/search/multi?api_key=d86ca64010d84d9a3269a45fbe212bc5&language=ru&query=" + searchText;
    
    
    
    requestApi(server)
        .then(function (result) {
            const output = JSON.parse(result)
            let inner = '';
            output.results.forEach(function (item, i, array) {
                let nameItem = item.name || item.title;
                let firstDate = item.first_air_date || item.release_date;
                inner = `${inner} <div class='col-12'> ${nameItem} / <i><span  style="color: tomato;">Дата выхода: </span>${firstDate}</i></div>`
            })
            movie.innerHTML = inner;
        })
        .catch(function (reason){
            movie.innerHTML = "Упс, что-то пошло не так";
            console.log('error: ' + reason.status)
        });
}

searchForm.addEventListener('submit', apiSearch);

function requestApi(url) {
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open('GET', url);

        request.addEventListener('load', function () {
            if (request.status !== 200) {
                reject({
                    status: request.status
                });
                return;
            }

            resolve(request.response);

        });
        request.addEventListener('error', function () {
            reject({
                status: request.status
            })
        })
        request.send();
    })
}

