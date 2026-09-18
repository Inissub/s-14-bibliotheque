async function stats(){
    const stat_liste = document.getElementById('stats');
    try{
        const reponse = await fetch('http://localhost:3000/statistiques');
        if(reponse.ok){
            const responseJson = await reponse.json();
            stat_liste.innerHTML = `
                <ul>
                    <li> <span>Total livres</span><p> ${responseJson.total_livres} </p></li>
                    <li> <span>Total d'adherents</span><p> ${responseJson.total_adherents} </p> </li>
                    <li> <span>Emprunts en cours</span><p> ${responseJson.emprunts_encours} </p> </li>
                    <li> <span>Emprunts en retard</span><p> ${responseJson.emprunts_enretard} </p> </li>
                    <li> <span>Livre le plus emprunté</span><p> ${responseJson.livre_plusemprunte.titre} (${responseJson.livre_plusemprunte.nbr_emprunts} emprunts) </p> </li>
                    <li> <span>Adherent le plus actif</span><p> ${responseJson.adhrent_plusactif.nom} ${responseJson.adhrent_plusactif.prenom} </p> </li>
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