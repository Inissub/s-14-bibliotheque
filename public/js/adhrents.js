async function tousAdherents() {

    let adherents = document.getElementById('adh_tbody');
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
