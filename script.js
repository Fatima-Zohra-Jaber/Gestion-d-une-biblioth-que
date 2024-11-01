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
    
function  AjouterLivre(){

 // Vérification des données
    if(ValiderLivre()){
        //  Création d'objet Livre et insertion dans le tableau
        let livre = new Livre(titre.value, auteur.value, annee.value,prix.value);
        livres.push(livre);

        // Actualiser l'affichage
        AfficherLivres();

        // Réinitialisation du formulaire après l'ajout
        document.getElementById('form').reset();
    }
 

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
// Affecter les valeurs  du livre à modifier dans les input
    document.getElementById("titre").value=livres[index].titre;
    document.getElementById("auteur").value=livres[index].auteur;
    document.getElementById("anneePublication").value=livres[index].anneePublication;
    document.getElementById("prix").value=livres[index].prix;
// Changer 
    document.getElementById("ajout").value="Modifier";
    document.getElementById("form-titre").innerHTML="Modifier un livre";
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
        document.getElementById("form-titre").innerHTML="Ajouter un livre";
        document.getElementById("ajout").onclick = AjouterLivre; 
    };
}

function ValiderLivre(){
    let valide = true;
    if(titre.value==""){
        AfficherErreur("titreErreur","Veuillez saisir le titre du livre");
        valide=false;
    }else{
        MasquerErreurs("titreErreur");
    }
    if(auteur.value==""){
        AfficherErreur("auteurErreur","Veuillez saisir l'auteur du livre");
        valide=false;
    }else{
        MasquerErreurs("auteurErreur");
    }
    if(annee.value==""){
        AfficherErreur("anneeErreur","Veuillez saisir l'année de publication du livre");
        valide=false;
    }else{
        let date=new Date().getFullYear();
        console.log(Number(date));
        if(annee.value < 1500 ||  annee.value > Number(date)){
            AfficherErreur("anneeErreur","Veuillez saisir une  année de publication valide");
            valide=false;
        }else{
            MasquerErreurs("anneeErreur");
        }
    }
    if(prix.value==""){
        AfficherErreur("prixErreur","Veuillez saisir le prix du livre");
        valide=false;
    }else{
        MasquerErreurs("prixErreur");
    }
    return valide
}

function AfficherErreur(id,message){
    document.getElementById(id).innerHTML=message;
    document.getElementById(id).style.display="block";
}

function MasquerErreurs(id){
        document.getElementById(id).innerHTML = "";
        document.getElementById(id).style.display = "none"; 
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