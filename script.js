class Livre{
    constructor(titre,auteur,annee,prix){
        this.titre=titre;
        this.auteur=auteur;
        this.anneePublication=annee;
        this.prix=prix;
    }
    Details(){
        return `Titre: ${this.titre}, l'auteur: ${this.auteur}, année de publication: ${this.anneePublication}, prix: ${this.prix}`;
    }
}

    let livres= [];
 // Récupération des données
    let titre = document.getElementById('titre');
    let auteur = document.getElementById('auteur');
    let annee = document.getElementById('anneePublication');
    let prix = document.getElementById('prix');
    let table = document.getElementById('table');
    let tbody=table.getElementsByTagName('tbody')[0];
    
// Initialiser Pickadate sur le champ
$('#anneePublication').pickadate({
    selectYears: true,      // Active le sélecteur d'années
    selectMonths: false,    // Désactive les mois (si vous ne voulez que les années)
    format: 'yyyy',         // Affiche uniquement l'année
    min: new Date(2020, 0), // Année minimum
    max: new Date(2035, 0)  // Année maximum
});


// // Définir la plage d'années
// const anneeMin = 1800;
// const anneeMax = 2024;

// // Remplir la liste des années
// for (let i = anneeMin; i <= anneeMax; i++) {
//     const option = document.createElement("option");
//     option.value = i;
//     option.text = i;
//     annee.appendChild(option);
// }


function  AjouterLivre(){
 // Réinitialiser les messages d'erreur
    MasquerErreurs();
 // Vérification des données
    if(titre.value==""){
        AfficherErreur("titreErreur","Veuillez saisir le titre du livre");
        return;
    }
    if(auteur.value==""){
        AfficherErreur("auteurErreur","Veuillez saisir l'auteur du livre");
        return;
    }
    if(annee.value==""){
        AfficherErreur("anneeErreur","Veuillez saisir l'année de publication du livre");
        return;
    }
    if(prix.value==""){
        AfficherErreur("prixErreur","Veuillez saisir le prix du livre");
        return;
    }
 //  Création d'objet Livre et insertion dans le tableau
    let livre = new Livre(titre.value, auteur.value, annee.value,prix.value);
    livres.push(livre);

 // Actualiser l'affichage
    AfficherLivres();
    
 // Réinitialisation du formulaire après ajout
    document.getElementById('form').reset();

}

function AfficherLivres(){
 // Effacer le contenu précédent
    tbody.innerHTML = '';
 // Création d'une ligne pour chaque livre
    for(let i=0;i<livres.length;i++){
        InsererLignes(i);
    }
    
}


function SupprimerLivre(index){
    livres.splice(index, 1);
// Actualiser l'affichage
    AfficherLivres(); 
}

function ModifierLivre(index){
    document.getElementById("titre").value=livres[index].titre;
    document.getElementById("auteur").value=livres[index].auteur;
    document.getElementById("anneePublication").value=livres[index].anneePublication;
    document.getElementById("prix").value=livres[index].prix;
    document.getElementById("ajout").value="Modifier";
// Utiliser une fonction anonyme pour gérer l'événement
    document.getElementById("ajout").onclick = function() {
        livres[index].titre=titre.value;
        livres[index].auteur=auteur.value;
        livres[index].anneePublication=annee.value;
        livres[index].prix=prix.value;
    // Actualiser l'affichage
        AfficherLivres(); 
    // Réinitialisation du formulaire après la modification
        document.getElementById('form').reset();
        document.getElementById("ajout").value="Ajouter";
        document.getElementById("ajout").onclick = AjouterLivre; 
    };
}

function AfficherErreur(id,message){
    document.getElementById(id).innerHTML=message;
    document.getElementById(id).style.display="block";
}

function MasquerErreurs(){
    const erreurs=["titreErreur","auteurErreur","anneeErreur","prixErreur"];
    for(let id of erreurs ){
        document.getElementById(id).innerHTML = '';
        document.getElementById(id).style.display = "none"; 
        }
}

function ChercherLivres(){
    tbody.innerHTML = '';
    const anneeRechercher = document.getElementById("recherche").value;
    for(let i=0;i<livres.length;i++){
        if(livres[i].anneePublication >= anneeRechercher){
            InsererLignes(i);
        }
    }
}

function InsererLignes(i){
    const nouveauLigne=  tbody.insertRow();
    nouveauLigne.insertCell(0).innerHTML=livres[i].titre;
    nouveauLigne.insertCell(1).innerHTML=livres[i].auteur;
    nouveauLigne.insertCell(2).innerHTML=livres[i].anneePublication;
    nouveauLigne.insertCell(3).innerHTML=livres[i].prix;
    nouveauLigne.insertCell(4).innerHTML=`<img src="images/pencil.png" alt="modifier" onclick="ModifierLivre(${i})">
    <img src="images/remove.png" alt="sipprimer" onclick="SupprimerLivre(${i})">`;
}

