async function touslivres() {
    let livres  = document.getElementById('livres_tbody');
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
document.addEventListener('DOMContentLoaded', () =>{touslivres()})