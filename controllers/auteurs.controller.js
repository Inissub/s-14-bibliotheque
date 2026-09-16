const pool = require('../config/database')

async function tousAuteurs(req, res){
    try{
        const result = await pool.query('SELECT * FROM biblio.auteurs ORDER BY id ');
        res.json(result.rows);        
    }catch(err){
        res.status(500).json({error: "erreur lors de la recuperation des auteurs"});
    }
}

async function newAuteur(req, res){
    const {nom, nationalite} = req.body;
    if(!nom){
        return res.status(400).json({ error: 'le nom est obligatoire'})
    }
    try{
        const result = await pool.query('INSERT INTO biblio.auteurs (nom, nationalite) VALUES ($1,$2) RETURNING *', 
            [nom, nationalite]
        );
        res.status(201).json({success: 'auteur créé avec succes',  auteur: result.rows[0]})
    }catch(err){
        res.status(500).json({error: "erreur lors de l'insertion de cet auteur"});
    }
}

async function updateAuteur(req, res) {
    const {id} = req.params;
    const {nom, nationalite} = req.body;
    if(!nom){
        return res.status(400).json({ error: 'le nom est obligatoire'})
    }
    try {
        const result = await pool.query('UPDATE biblio.auteurs SET nom = $1, nationalite = $2 WHERE id = $3 RETURNING *', [nom, nationalite, id]);
        res.status(201).json({
            success: 'auteur mis à jour avec succes',
            auteur: result.rows[0]
        })
    } catch (err) {
        res.status(500).json({error: "erreur lors de la mise à jour de cet auteur"});
    }
}

async function deleteAuteur(req, res){
    const {id} = req.params;
    try {
        const result = await pool.query('DELETE FROM biblio.auteurs WHERE id = $1', [id])
        res.status(200).json({success: 'auteur supprimé avec succes'})
    } catch (err) {
        res.status(500).json({error: "erreur lors de la supression de cet auteur"});
    }
}

module.exports = {
    tousAuteurs,
    newAuteur,
    updateAuteur,
    deleteAuteur,
} 