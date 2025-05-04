
/*

Version première, avant le 12/04/2025 et la relecture par Chat GPT

function toggleBody(element) {
    element.querySelector(".collapsableBody").classList.toggle("collapsed") ;
}


const collapsableHeaderList = document.querySelectorAll('.collapsable') ;

for (let element of collapsableHeaderList) {
    element.addEventListener("click", function() {toggleBody(element)}) ;
    
    body = element.querySelector(".collapsableBody").classList.toggle("collapsed") ;      
}
*/


/*
    Seconde version, après le 12/04/2025 après la relecture par Chat GPT :
*/

const urlParams = new URLSearchParams(window.location.search) ;
const thisIsThePrintableVersion = urlParams.get('isThePrintableVersion') ? true : false ;

console.log(thisIsThePrintableVersion ? "This IS !" : "This isn't ...") ;


if (thisIsThePrintableVersion) {
    document.querySelector('body').classList.add("printable") ;
    document.querySelector('header').classList.add("printable") ;
    document.querySelector('.side').classList.add("printable") ;
    document.querySelector('h1').classList.add("printable") ;
    document.querySelector('h2').classList.add("printable") ;
    document.querySelector('.content').classList.add("printable") ;
}

/* "Va chercher les biens !"
    Récupère les données issues du fichier JSON
*/
fetch('http://127.0.0.1:5500/contentCV.json')

    .then(response => response.json())
    .then(data => {
        const experiences = data.experiences;
        const formations = data.formations;

        const expSection = document.querySelector('#experiences');
        const formSection = document.querySelector('#formations');

        experiences.forEach(exp => {
        expSection.appendChild(createCollapsable(exp.date, exp.place, exp.titre, exp.description));
        });

        formations.forEach(form => {
        formSection.appendChild(createCollapsable(form.date, form.place, form.titre, form.description));
        });
    });


/*
    Création d'un élément collapsable comme suivent les expériences professionnelles et les formations
*/

function createCollapsable(date, place, title, body) {
    // Création du collapasable
    const wrapper = document.createElement('div');
    wrapper.className = 'collapsable';

    // Remplissage avec le template qui va bien
    wrapper.innerHTML = `
        <div class = "collapsableHeader">
            <div class = "collapsableDate">${date}</div>
            <div class = "collapsableTitle"><b>${title}</b> - ${place}</div>
            <div class = "collapsableButton"><img class = "logo" src = "icone fleche.svg"></div>
        </div>
        
        <div class = "collapsableMain">
            <div class = "collapsableBlankLeft"></div>
            <div class = "collapsableBody"><i>${body}</i></div>
            <div class = "collapsableBlankRight"></div>
        </div>
    `;

    const header = wrapper.children[0] ;
    const bouton = header.children[2]
    
    if (!thisIsThePrintableVersion) {


        const main = wrapper.children[1] ;

        // Fermer tous les blocs au chargement
        main.classList.add("collapsed");

        // Ajouter un toggle au clic sur l'en-tête
        header.addEventListener("click", () => {
            main.classList.toggle("collapsed");
            bouton.classList.toggle("collapsed") ;
        }) ;

    }
       
    return wrapper;
}



