class Livre{
    constructor(titre,auteur,annee,prix){
        this.titre = titre;
        this.auteur = auteur;
        this.anneePublication=annee;
        this.prix = prix;
    }

    Details(){
        return  `<td>${this.titre}</td>
        <td>${this.auteur}</td>
        <td>${this.anneePublication}</td>
        <td>${this.prix}</td>
        <td><img src="images/pencil.png" alt="">
        <img src="images/remove.png" alt=""></td>`;
    }
    
}

let livres=[];
let titre=document.getElementById("titre");
let auteur=document.getElementById("auteur");
let annee=document.getElementById("anneePublication");
let prix=document.getElementById("prix");
let table=document.getElementById("table");
let tbody=document.getElementsByTagName("tbody")[0];

function AjouterLivre(){
    let livre = new Livre(titre.value,auteur.value,annee.value,prix.value);
    livres.push(livre);
    AfficherLivres();
    document.getElementById("form").reset();
}

function AfficherLivres(){
    tbody.innerHTML='';
    for(let i=0;i<livres.length;i++){
        insertLivre(i);
    }
}

function insertLivre(i){
        let newLigne=tbody.insertRow();
        newLigne.insertCell(0).innerHTML=livres[i].titre;
        newLigne.insertCell(1).innerHTML=livres[i].auteur;
        newLigne.insertCell(2).innerHTML=livres[i].anneePublication;
        newLigne.insertCell(3).innerHTML=livres[i].prix;
        newLigne.insertCell(4).innerHTML=`<img src="images/pencil.png" alt="" onclick="modifierLivre(${i})" >
        <img src="images/remove.png" alt="" onclick="supprimerLivre(${i})">`;
}


function supprimerLivre(index){
    livres.splice(index,1);
    AfficherLivres();
}
function modifierLivre(index){
    titre.value=livres[index].titre;
    auteur.value=livres[index].auteur;
    annee.value=livres[index].anneePublication;
    prix.value=livres[index].prix;
    document.getElementById("ajout").value="Modifier";
    document.getElementById("ajout").onclick = function() {
    livres[index].titre=titre.value;
    livres[index].auteur=auteur.value;
    livres[index].anneePublication=anneePublication.value;
    livres[index].prix=prix.value;
    AfficherLivres();
    document.getElementById("ajout").value="Ajouter";
    document.getElementById("ajout").onclick = AjouterLivre;
    document.getElementById("form").reset();
}
}

function ChercherLivres(){
    let anneeRecherche = document.getElementById("recherche").value;
    tbody.innerHTML='';
    for(i=0;  i<livres.length; i++){
        if(livres[i].anneePublication >= anneeRecherche){
            insertLivre(i);
        }
}
}