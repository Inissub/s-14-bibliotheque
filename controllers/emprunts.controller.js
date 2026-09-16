const pool = require('../config/database');

async function creerEmprunt(req, res) {
    const {adherent_id, livre_id, date_retour_prevue} = req.body;

    if(!adherent_id || !livre_id || !date_retour_prevue){
        return res.status(400).json({error: "entrez tous les champs obligatoires"});
    }
    const client = await pool.connect()
    try {
        await client.query('BEGIN');
        const result1 = await client.query('SELECT exemplaires_disponibles FROM biblio.livres WHERE id = $1 FOR UPDATE',[livre_id]);
        if(result1.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(404).json({error: 'livre introvable'});
        }
        if(result1.rows[0].exemplaires_disponibles <= 0){
            await client.query('ROLLBACK');
            return res.status(409).json({error: 'Plus aucun emprunt possible pour ce livre'});
        }
        const result2 = await client.query('SELECT COUNT (*) FROM biblio.emprunts WHERE adherent_id=$1 AND date_retour_effective IS NULL', [adherent_id]);
        if(parseInt(result2.rows[0].count >= 2)){
            await client.query('ROLLBACK');
            return res.status(409).json({error: "Cet adherent a deja atteint son maximum d'emprunts(2 emprunts maximum)"});           
        }

        const result3 = await client.query('INSERT INTO biblio.emprunts (adherent_id,livre_id, date_retour_prevue) VALUES ($1,$2,$3) RETURNING *', [adherent_id,livre_id, date_retour_prevue]);
        const result4 = await client.query('UPDATE biblio.livres SET  exemplaires_disponibles =  exemplaires_disponibles -1 WHERE id = $1', [livre_id]);
        await client.query('COMMIT');
        res.status(201).json({ success: 'emprunt enregistré avec succès', emprunt: result3.rows[0] });
    } catch (error) {
        await client.query('ROLLBACK');
        if(error.code === '23505'){
            return res.status(409).json({ error: 'cet adherent a deja un emprunt actif sur ce livre' });
        }
        res.status(500).json({ error: "erreur lors de la création de l'emprunt" });
    }finally{
        client.release();
    }
}

async function updateEmprunt(req, res) {
    const {id} = req.params;
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const result1 = await client.query('SELECT * FROM biblio.emprunts WHERE id=$1 FOR UPDATE', [id]);
        if(result1.rows.length === 0){
            await client.query('ROLLBACK');
            return res.status(500).json({error: 'Emprunt introuvable'})
        }
        if(result1.rows[0].date_retour_effective !== null){
            await client.query('ROLLBACK');
            return res.status(409).json({error: 'Celivre a dejà été rendu'})
        }
        const reslut2 = await client.query('UPDATE biblio.emprunts SET date_retour_effective = CURRENT_DATE WHERE id=$1', [id]);
        await client.query('UPDATE biblio.livres SET exemplaires_disponibles = exemplaires_disponibles + 1 WHERE id = $1', [result1.rows[0].livre_id] );
        await client.query('COMMIT');
        res.status(200).json({ success: 'retour enregistré avec succès', emprunt: reslut2.rows[0] });
    } catch (error) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: "erreur lors de l'enregistrement du retour" });
    }finally{
        client.release();
    }
}
module.exports = {
    creerEmprunt,
    updateEmprunt,
}