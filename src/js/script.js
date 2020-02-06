getResource = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
    }
    return await res.json();
};

let cards = document.querySelector('.cards');
createEl = async () => {
    const res = await getResource(`https://swapi.co/api/films/`);
    res.results.forEach(function (item) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
         <h1 class="title">${item.title}</h1>
         <p class="about">
            ${item.opening_crawl}
         </p>
     `;
        cards.insertBefore(card, null)
    })
    one(res);

};
createEl();

let search = document.querySelector('.search');

search.addEventListener('input', async (event) => {
    let target = event.target;
    const res = await getResource(`https://swapi.co/api/films/`);
    console.log(res);
    let allTitles = [];
    res.results.forEach(function (item) {
        allTitles.push(item)
    });
    let p = [];
    for (let i = 0; i < allTitles.length; i++) {
        let re = new RegExp(target.value, 'i');
        if (allTitles[i].title.search(re) == 0) {
            p.push(allTitles[i]);
        }
    }
    let cards = document.querySelector('.cards');
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    for (let i = 0; i < p.length; i++) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
         <h1 class="title">${p[i].title}</h1>
         <p class="about">
         ${p[i].opening_crawl}
         </p>
     `;
        cards.insertBefore(card, null)
    }
    one(res)
});



// testing
let one = async (res) => {
    let card = document.querySelector('.cards');
    let allTitles = [];

    card.addEventListener('click', function (event) {
        let target = event.target;
        for (let i = 0; i < res.length; i++) {
            let re = new RegExp(target.closest('.card').children[0].innerText, 'i');
            if (allTitles[i].title.search(re) == 0) {
                p.push(allTitles[i]);
            }
        }
        console.dir(target.closest('.card').children[0].innerText);
    });

};
// allFilms = async () => {
//     let allTitles = [];
//
//     const res = await getResource(`https://swapi.co/api/films/`)
//     res.results.forEach(function (item) {
//         allTitles.push(item)
//     });
// return allTitles
// };
// allFilms();