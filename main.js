const searchForm = document.querySelector("#search-form");
const movie = document.querySelector("#movies")
const  urlPoster = 'https://image.tmdb.org/t/p/w500';


function apiSearch(e) {
    e.preventDefault();
    const searchText = document.querySelector(".form-control").value;
    const server = "https://api.themoviedb.org/3/search/multi?api_key=d86ca64010d84d9a3269a45fbe212bc5&language=ru&query=" + searchText;
    movie.innerHTML = "Загрузка"

    fetch(server)
    .then((value) => {
        if(value.status !== 200){
            return Promise.reject(new Error(value.status))
        }
        return value.json()
    })
    .then((output) => {
        let inner = '';
            output.results.forEach((item) => {
                let nameItem = item.name || item.title;
                function urlNoPoster() {
                    if (item.poster_path == null){
                      return  'https://tdkelle.ru/image/noimage.jpg'
                    } else {
                        return (urlPoster + item.poster_path)
                    }  
                }
                inner += `
                <div class='col-12 col-md-4 col-xl-3 item'>
                    <img src="${urlNoPoster()}" alt="${nameItem}">
                    <h5>${nameItem}</h5> 
                 </div>
                `
            })
            movie.innerHTML = inner;
    })
    .catch((reason) => {
        movie.innerHTML = "Упс, что-то пошло не так";
        console.log('error: ' + reason.status)        
    }) 
}

searchForm.addEventListener('submit', apiSearch);


