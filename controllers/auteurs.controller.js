const pool = require('../config/database')


// recuperer la liste des auteurs
async function tousAuteurs(req, res, next){
    try{
        const result = await pool.query('SELECT * FROM biblio.auteurs ORDER BY id ');
        res.json(result.rows);        
    }catch(error){
        next(error);
    }
}


// ajouter un auteur
async function newAuteur(req, res, next){
    const {nom, nationalite} = req.body;
    if(!nom){
        return res.status(400).json({ error: 'le nom est obligatoire'})
    }
    try{
        const result = await pool.query('INSERT INTO biblio.auteurs (nom, nationalite) VALUES ($1,$2) RETURNING *', 
            [nom, nationalite]
        );
        res.status(201).json({success: 'auteur créé avec succes',  auteur: result.rows[0]})
    }catch(error){
        next(error);
    }
}


// mise a jour d'un auteur
async function updateAuteur(req, res, next) {
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
    } catch (error) {
        next(error);
    }
}


// supression d'un auteur
async function deleteAuteur(req, res, next){
    const {id} = req.params;
    try {
        const result = await pool.query('DELETE FROM biblio.auteurs WHERE id = $1', [id])
        res.status(200).json({success: 'auteur supprimé avec succes'})
    } catch (error) {
        next(error);
    }
}

module.exports = {
    tousAuteurs,
    newAuteur,
    updateAuteur,
    deleteAuteur,
} 