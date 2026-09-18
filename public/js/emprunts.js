async function tousEmprunts() {
    let emprunts = document.getElementById('emp_tbody');
    if (!emprunts) return;
    try {
        const reponse = await fetch('http://localhost:3000/emprunts');
        if(reponse.ok){
            const reponseJson = await reponse.json();
            let empunt = '';
            for(let el of reponseJson){
                const couleurFond = el.statut === 'en retard' ? '#f39585' : el.statut === 'rendu' ? '#F5F5F5' : 'transparent';
                empunt += `<tr style="background-color: ${couleurFond};" >
                    <td> ${el.titre} </td>
                    <td> ${el.nom} </td>
                    <td> ${el.prenom} </td>
                    <td> ${new Date(el.date_emprunt).toLocaleDateString('fr-FR')} </td>
                    <td> ${new Date(el.date_retour_prevue).toLocaleDateString('fr-FR')} </td>
                    <td> ${el.date_retour_effective ? new Date(el.date_retour_effective).toLocaleDateString('fr-FR') : '-'} </td>
                    <td> ${el.statut} </td>
                </tr>`
            }
            emprunts.innerHTML = empunt;
        }else{
            throw new Error('Requete Echouée');
        }
    } catch (error) {
        emprunts.innerHTML = `<tr><td>${error}</td></tr>`;
    }
}
document.addEventListener('DOMContentLoaded', () =>{tousEmprunts(), selectAdherent(), selectLivres()});

async function selectAdherent() {
    const adhr = document.getElementById('adherent_id');
    try {
        const reponse = await fetch('http://localhost:3000/adherents');
        const reponseJson = await reponse.json();
        let options = '';
        for (let el of reponseJson) {
            options += `<option value="${el.id}">${el.nom} ${el.prenom}</option>`;
        }
        adhr.innerHTML = options;
    } catch (error) {
        console.error(error);
    }
}

async function selectLivres() {
    const lvr = document.getElementById('livre_id');
    try {
        const reponse = await fetch('http://localhost:3000/livres');
        const reponseJson = await reponse.json();
        const disponibles = reponseJson.filter(l => l.exemplaires_disponibles > 0);
        let options = '';
        for (let l of disponibles) {
            options += `<option value="${l.id}">${l.titre} (${l.exemplaires_disponibles} dispo.)</option>`;
        }
        lvr.innerHTML = options;
    } catch (error) {
        console.error(error);
    }
}

async function ajouteEmprunt() {
    let formulaire = document.forms['form_emprunt'];
    let adhr_id = parseInt(document.getElementById('adherent_id').value);
    let lvr_id = parseInt(document.getElementById('livre_id').value);
    let date_retour = formulaire['date_retour_prevue'].value;

    if(!date_retour || date_retour.trim() === ""){
        throw new Error("date de retour obligatoire");
    }
    if (!adhr_id || isNaN(adhr_id)) {
        throw new Error("sélectionnez un adhérent");
    }
    if (!lvr_id || isNaN(lvr_id)) {
        throw new Error("sélectionnez un livre");
    }
    try {
        const reponse = await fetch('http://localhost:3000/emprunts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({livre_id: lvr_id, adherent_id: adhr_id, date_retour_prevue: date_retour })
        });
        const result  = await reponse.json();
        if (!reponse.ok) {
            throw new Error(result.error || `Erreur ${reponse.status}`);
        }
        document.getElementById('erreur_emprunt').textContent = '';
        formulaire.reset();
        document.getElementById('erreur_emprunt').textContent = 'emprunt enregistré avec succès';
        document.getElementById('erreur_emprunt').style.color = 'green';
        return result;
    } catch (error) {
        document.getElementById('erreur_emprunt').textContent = error.message;
    }
}
document.getElementById('form_emprunt').addEventListener('submit', (event) => {
    event.preventDefault();
    ajouteEmprunt();
});

