async function stats(){
    const stat_liste = document.getElementById('stats');
    try{
        const reponse = await fetch('http://localhost:3000/statistiques');
        if(reponse.ok){
            const responseJson = await reponse.json();
            stat_liste.innerHTML = `
                <ul>
                    <li> <span class="stat_label">Total livres</span><p class="stat_value"> ${responseJson.total_livres} </p></li>
                    <li> <span class="stat_label" >Total d'adherents</span><p class="stat_value"> ${responseJson.total_adherents} </p> </li>
                    <li> <span class="stat_label">Emprunts en cours</span><p class="stat_value"> ${responseJson.emprunts_encours} </p> </li>
                    <li> <span class="stat_label">Emprunts en retard</span><p class="stat_value"> ${responseJson.emprunts_enretard} </p> </li>
                    <li> <span class="stat_label">Livre le plus emprunté</span><p class="stat_desc"> ${responseJson.livre_plusemprunte.titre} (${responseJson.livre_plusemprunte.nbr_emprunts} emprunts) </p> </li>
                    <li> <span class="stat_label">Adherent le plus actif</span><p class="stat_desc"> ${responseJson.adhrent_plusactif.nom} ${responseJson.adhrent_plusactif.prenom} </p> </li>
                </ul>
            `
        }else{
            throw new Error('Requete Echouée');
        }

    }catch(error){
        stat_liste.innerHTML = `<p>${error}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () =>{stats()});