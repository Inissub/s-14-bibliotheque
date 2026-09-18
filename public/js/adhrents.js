async function tousAdherents() {

    let adherents = document.getElementById('adh_tbody');
    if (!adherents) return;
    try {
        const reponse = await fetch('http://localhost:3000/adherents');
        if(reponse.ok){
            const reponseJson = await reponse.json();
            let adherent = ''
            for(let el of reponseJson){
                adherent += `<tr>
                    <td> ${el.nom} </td>
                    <td> ${el.prenom} </td>
                    <td> ${el.contact} </td>
                    <td><button class="modif" data-id="${el.id}" >modifier</button>  <button class="supp" data-id="${el.id}" >supprimer</button> </td>
                </tr>`
            }
            adherents.innerHTML = adherent;
        }else{
            throw new Error('Requete Echouée');
        }
    } catch (error) {
        adherents.innerHTML = `<tr><td>${error}</td></tr>`;
    }
}
document.addEventListener('DOMContentLoaded', () =>{tousAdherents()})

async function ajouteAdherent() {
    let adh_formuliare = document.forms['form_adherent'];
    const adh_nom = adh_formuliare['nom'].value;
    const adh_prenom = adh_formuliare['prenom'].value;
    const adh_contact = adh_formuliare['contact'].value;
    if(!adh_nom || adh_nom.trim() === ""){
        throw new Error("le nom est obligatoire");
    }
    if (!adh_prenom || adh_prenom.trim() === "") {
        throw new Error("le prenom est oblgatoire");
    }
    if (!adh_contact || adh_contact.trim() === "") {
        throw new Error("le contact es obligatoire");
    }else {
        const chiffres = adh_contact.replace(/\D/g, "");
        if (chiffres.length < 9) {
            throw new Error("Le téléphone doit contenir au moins 9 chiffres.");
        }
    }
    try {
        const reponse = await fetch('http://localhost:3000/adherents/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({nom: adh_nom, prenom: adh_prenom, contact: adh_contact})
        });
        const result = await reponse.json();
        if(!reponse.ok){
            throw new Error(result.error || `Erreur ${reponse.status}`);
        }
        document.getElementById('erreur_adherent').textContent = '';
        adh_formuliare.reset();
        document.getElementById('erreur_adherent').textContent = 'Adherent ajouté avec succès';
        document.getElementById('erreur_adherent').style.color = 'green';
        return result;
    } catch (error) {
        document.getElementById('erreur_adherent').textContent = error.message;
    }
}
const adherent = document.getElementById('form_adherent')
if(adherent){
    adherent.addEventListener('submit', (event) => {
    event.preventDefault();
    ajouteAdherent();
});
}

async function rechercheAdherents(mot_cle) {
    const reponse = await fetch('http://localhost:3000/adherents');
    const reponseJson = await reponse.json();
    const mini_mot = mot_cle.toLowerCase();
    const resultat = [];
    for(let el of reponseJson){
        let match = false;
        if(el.nom.toLowerCase().includes(mini_mot)){
            match = true;
        }
        if(el.prenom.toLowerCase().includes(mini_mot)){
            match = true;
        }
        if(match){
            resultat.push(el)
        }
    }
    return resultat;
}

const a_formulaire= document.getElementById('form_recherche_adherents')
a_formulaire.addEventListener('submit', async (event) => {
    event.preventDefault();
    const mot = document.getElementById('champ_recherche_adherents').value.trim();
    if (mot === '') {
        tousAdherents()
        return;
    }
    const resultats = await rechercheAdherents(mot);
    let adherents = document.getElementById('adh_tbody');
    let adherent = ''
    for(let el of resultats){
        adherent += `<tr>
            <td> ${el.nom} </td>
            <td> ${el.prenom} </td>
            <td> ${el.contact} </td>
            <td><button class="modif" data-id="${el.id}" >modifier</button>  <button class="supp" data-id="${el.id}" >supprimer</button> </td>
        </tr>`
    }
    adherents.innerHTML = adherent;
});
