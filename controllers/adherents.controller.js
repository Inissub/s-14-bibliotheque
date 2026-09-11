const pool = require('../config/database')

async function tousAdherents(req, res){
    try {
        const result = await pool.query('SELECT * FROM biblio.adherents ORDER BY id');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: "erreur lors de la recuperation des adherents"});
    }
}

async function newAdherent(req, res) {
    const {nom, prenom, contact} = req.body;
    if(!nom || !prenom || !contact){
        return res.status(400).json({error: 'repmlissez tous les champs'})
    }
    try {
        const result = await pool.query('INSERT INTO  biblio.adherents(nom, prenom, contact) VALUES ($1,$2,$3) RETURNING *', [nom, prenom, contact]);
        res.status(200).json({success: 'adherent enregistré avec succes', adherent: result.rows[0]});
    } catch (error) {
        res.status(500).json({error: "erreur lors de l'insertion de cet adherent"});
    }
}

async function updateAdhrent(req, res){
    const {id} = req.params;
    const {nom, prenom, contact} = req.body;
    if(!nom || !prenom || !contact){
        return res.status(400).json({error: 'les champs vides ne sont pas autorisés'})
    }
    try {
        const result = await pool.query('UPDATE biblio.adherents SET nom = $1, prenom = $2, contact = $3 WHERE id = $4 RETURNING *', [nom, prenom, contact, id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'adherent introuvable' });
        }
        res.status(200).json({
            success: 'adherent mis à jour avec success',
            adherent:result.rows[0]
        })
    } catch (error) {
        res.status(500).json({error: "erreur lors de la mise à jour de cet adherent"});
        
    }
}

async function deleteAdherent(req, res) {
    const {id} = req.params;
    try {
        const result = await pool.query('DELETE FROM biblio.adherents WHERE id = $1', [id])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'adherent introuvable' });
        }
        res.status(200).json({success: 'auteur supprimé avec succes'})        
    } catch (error) {
        res.status(500).json({error: "erreur lors de la supression de cet adherent"});
    }
}
module.exports = {
    tousAdherents,
    newAdherent,
    updateAdhrent,
    deleteAdherent,
}