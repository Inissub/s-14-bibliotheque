async function tousAuteurs() {
    let auteurs = document.getElementById('auth_tbody');
    if (!auteurs) return;
    try {
        const reponse = await fetch('http://localhost:3000/auteurs');
        if(reponse.ok){
            const reponseJson = await reponse.json();
            let auteur = '';
            for(let el of reponseJson){
                auteur += `<tr>
                    <td> ${el.nom}  </td>
                    <td>  ${el.nationalite} </td>
                    <td><button class="modif" data-id="${el.id}" >modifier</button>  <button class="supp" data-id="${el.id}" >supprimer</button> </td>
                </tr>`
            }
            auteurs.innerHTML = auteur;
        }else{
                throw new Error('Requete Echouée');
        }
    } catch (error) {
            auteurs.innerHTML = `<tr><td>${error}</td></tr>`;
    }
}

document.addEventListener('DOMContentLoaded', () =>{tousAuteurs()});

async function ajoutAuteur() {
    let formulaire = document.forms['form_auteur'];
    let aut_nom = formulaire['nom'].value;
    let aut_nationalite = formulaire['nationalite'].value;

    if(!aut_nom || aut_nom.trim() === "" ){
        throw new Error("Le nom est obligatoire");
    }
    if(!aut_nationalite || aut_nationalite.trim() === ""){
        throw new Error("Entrez sa nationnalité");
    }
    try {
        const reponse = await fetch('http://localhost:3000/auteurs', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({nom: aut_nom, nationalite: aut_nationalite})
        });
        const result = await reponse.json();
        if(!reponse.ok){
            throw new Error(result.error || `Erreur ${reponse.status}`);
        }
        document.getElementById('erreur_auteur').textContent = '';
        formulaire.reset();
        document.getElementById('erreur_auteur').textContent = 'Auteur ajouté avec succès';
        document.getElementById('erreur_auteur').style.color = 'green';
        return result;
    } catch (error) {
        document.getElementById('erreur_auteur').textContent = error.message;
    }
}
document.getElementById('form_auteur')?.addEventListener('submit', (event) => {
    event.preventDefault();
    ajoutAuteur();
});

async function rechercheAuteur(mot_cle) {
    const reponse = await fetch('http://localhost:3000/auteurs');
    const reponseJson = await reponse.json();
    const mini_mot = mot_cle.toLowerCase();
    const resultat = [];
    for(let el of reponseJson){
        let match = false;
        if(el.nom.toLowerCase().includes(mini_mot)){
            match = true;
        }
        if(el.nationalite.toLowerCase().includes(mini_mot)){
            match = true;
        }
        if(match){
            resultat.push(el)
        }
    }
    return resultat;
}
const formulaire= document.getElementById('form_recherche_auteurs')
formulaire.addEventListener('submit', async (event) => {
    event.preventDefault();
    const mot = document.getElementById('champ_recherche_auteurs').value.trim();
    if (mot === '') {
        tousAuteurs()
        return;
    }
    const resultats = await rechercheAuteur(mot);
    let auteurs = document.getElementById('auth_tbody');
    let auteur = '';
    for(let el of resultats){
        auteur += `<tr>
            <td> ${el.nom} </td>
            <td>  ${el.nationalite} </td>
            <td><button class="modif" data-id="${el.id}" >modifier</button>  <button class="supp" data-id="${el.id}" >supprimer</button> </td>
        </tr>`
    }
    auteurs.innerHTML = auteur;
});