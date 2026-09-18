async function touslivres() {
    let livres  = document.getElementById('livres_tbody');
    if (!livres) return;
    try {
        const reponse = await fetch('http://localhost:3000/livres');
        if(reponse.ok){
            const reponsJson = await reponse.json();
            let livre = '';
            for(let el of reponsJson){
                livre += `<tr>
                    <td> ${el.titre} </td>
                    <td>${el.annee_publication}</td>
                    <td>${el.auteurs.join(', ')}</td>
                    <td>${el.statut}</td>
                    <td>${el.exemplaires_disponibles} / ${el.exemplaires_total}</td>
                    <td><button class="modif" data-id="${el.id}" >modifier</button>  <button class="supp" data-id="${el.id}" >supprimer</button> </td>
                </tr>`
            }
            livres.innerHTML = livre;
        }else{
            throw new Error('Requete Echouée');
        }
    } catch (error) {
        livres.innerHTML = `<tr><td>${error}</td></tr>`;
    }
}
document.addEventListener('DOMContentLoaded', () =>{touslivres(), selectAuteurs()})

async function selectAuteurs() {
    const select = document.getElementById('auteurs');
    try {
        const reponse = await fetch('http://localhost:3000/auteurs');
        const reponseJson = await reponse.json();
        let options = '';
        for (let el of reponseJson) {
            options += `<option value="${el.id}">${el.nom}</option>`;
        }
        select.innerHTML = options;
    } catch (error) {
        console.error(error);
    }
}

async function ajouteLivre() {
    let l_formulaire = document.forms['form_livre'];
    let l_titre = l_formulaire['titre'].value;
    let l_anne = l_formulaire['annee_publication'].value;
    let l_e_total = l_formulaire['exemplaires_total'].value;
    const auteurs = document.getElementById('auteurs');
    let aut_choisi = [];
    for(let el of auteurs.selectedOptions){
        aut_choisi.push(parseInt(el.value));
    }
    if(!l_titre || l_titre.trim() === "" ){
        throw new Error("le titre est obligatoire");
    }
    if(!l_anne || l_anne.trim() === ""){
        throw new Error("l'année est obligatoire");
    }
    if(!l_e_total || l_e_total.trim() === ""){
        throw new Error("ce nombre est obligatoire");
    }
    if (aut_choisi.length === 0) {
        throw new Error("sélectionnez au moins un auteur");
    }
    try {
        const reponse = await fetch('http://localhost:3000/livres', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({titre: l_titre, annee_publication: l_anne, exemplaires_total: l_e_total, auteurs: aut_choisi})
        });
        const result = await reponse.json();
        if (!reponse.ok) {
            throw new Error(result.error || `Erreur ${reponse.status}`);
        }
        document.getElementById('erreur_livre').textContent = '';
        l_formulaire.reset();
        document.getElementById('erreur_livre').textContent = 'Livre ajouté avec succès';
        document.getElementById('erreur_livre').style.color = 'green';
        return result;
    } catch (error) {
        document.getElementById('erreur_livre').textContent = error.message;
    }

}
document.getElementById('form_livre')?.addEventListener('submit', (event) => {
    event.preventDefault();
    ajouteLivre()
});

async function rechercheLivre(mot_cle) {
    const reponse = await fetch('http://localhost:3000/livres');
    const reponseJson = await reponse.json();
    const mini_mot = mot_cle.toLowerCase();
    const resultat = [];
    for(let el of reponseJson){
        let match = false;
        if(el.titre.toLowerCase().includes(mini_mot)){
            match = true;
        }
        for (let a of el.auteurs) {
            if (a.toLowerCase().includes(mini_mot)) {
                match = true;
            }
        }
        if(match){
            resultat.push(el)
        }
    }
    return resultat;
}

const re_formulaire= document.getElementById('form_recherche')
re_formulaire.addEventListener('submit', async (event) => {
    event.preventDefault();
    const mot = document.getElementById('champ_recherche').value.trim();
    if (mot === '') {
        touslivres();
        return;
    }
    const resultats = await rechercheLivre(mot);
    let livres  = document.getElementById('livres_tbody');
    let livre = '';
    for(let el of resultats){
        livre += `<tr>
            <td> ${el.titre} </td>
            <td>${el.annee_publication}</td>
            <td>${el.auteurs.join(', ')}</td>
            <td>${el.statut}</td>
            <td>${el.exemplaires_disponibles} / ${el.exemplaires_total}</td>
            <td><button class="modif" data-id="${el.id}" >modifier</button>  <button class="supp" data-id="${el.id}" >supprimer</button> </td>
        </tr>`
    }
    livres.innerHTML = livre;
});