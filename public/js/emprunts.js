async function tousEmprunts() {
    let emprunts = document.getElementById('emp_tbody');
    try {
        const reponse = await fetch('http://localhost:3000/emprunts');
        if(reponse.ok){
            const reponseJson = await reponse.json();
            let empunt = '';
            for(let el of reponseJson){
                empunt += `<tr>
                    <td> ${el.id} </td>
                    <td> ${el.titre} </td>
                    <td> ${el.nom} </td>
                    <td> ${el.prenom} </td>
                    <td> ${el.date_emprunt} </td>
                    <td> ${el.date_retour_prevue} </td>
                    <td> ${el.date_retour_effective} </td>
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
document.addEventListener('DOMContentLoaded', () =>{tousEmprunts()});