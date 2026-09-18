async function tousAuteurs() {
    let auteurs = document.getElementById('auth_tbody');
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
