const pool = require('../config/database')

async function tousLivres(req, res){
    try {
        const result = await pool.query(
            `SELECT 
                l.id,
                l.titre,
                l.annee_publication,
                l.exemplaires_total,
                l.exemplaires_disponibles,
                CASE WHEN l.exemplaires_disponibles > 0 THEN 'disponible' ELSE 'emprunté' END AS statut,
                array_agg(a.nom) AS auteurs
            FROM biblio.livres l
            JOIN biblio.livre_auteur la ON la.livre_id = l.id
            JOIN biblio.auteurs a ON a.id = la.auteur_id
            GROUP BY l.id`
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error: "erreur lors de la recuperation des auteurs"});
    }
}

async function creerLivre(req, res) {
    const { titre, annee_publication, exemplaires_total, auteurs } = req.body;

    if (!titre || !exemplaires_total) {
        return res.status(400).json({ error: 'titre et exemplaires_total sont obligatoires' });
    }
    if (!Array.isArray(auteurs) || auteurs.length === 0) {
        return res.status(400).json({ error: 'au moins un auteur est obligatoire' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const livreResult = await client.query(
            `INSERT INTO biblio.livres (titre, annee_publication, exemplaires_total, exemplaires_disponibles)
             VALUES ($1, $2, $3, $3) RETURNING *`,
            [titre, annee_publication, exemplaires_total]
        );
        const livre = livreResult.rows[0];

        for (const auteurId of auteurs) {
            await client.query(
                'INSERT INTO biblio.livre_auteur (livre_id, auteur_id) VALUES ($1, $2)',
                [livre.id, auteurId]
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ success: 'livre créé avec succès', livre });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: 'erreur lors de la création du livre' });
    } finally {
        client.release();
    }
}

async function updateLivre(req, res) {
    const { id } = req.params;
    const { titre, annee_publication, exemplaires_total, auteurs } = req.body;

    if (!titre || !exemplaires_total) {
        return res.status(400).json({ error: 'titre et exemplaires_total sont obligatoires' });
    }
    if (!Array.isArray(auteurs) || auteurs.length === 0) {
        return res.status(400).json({ error: 'au moins un auteur est obligatoire' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const livreResult = await client.query(
            `UPDATE biblio.livres 
            SET titre = $1, annee_publication = $2, exemplaires_total = $3
             WHERE id = $4 RETURNING *`,
            [titre, annee_publication, exemplaires_total, id]
        );

        if (livreResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'livre introuvable' });
        }

        await client.query('DELETE FROM biblio.livre_auteur WHERE livre_id = $1', [id]);

        for (const auteurId of auteurs) {
            await client.query(
                'INSERT INTO biblio.livre_auteur (livre_id, auteur_id) VALUES ($1, $2)',
                [id, auteurId]
            );
        }

        await client.query('COMMIT');
        res.status(200).json({ success: 'livre mis à jour avec succès', livre: livreResult.rows[0] });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: 'erreur lors de la mise à jour du livre' });
    } finally {
        client.release();
    }
}

async function updateLivre(req, res) {
    const { id } = req.params;
    const { titre, annee_publication, exemplaires_total, auteurs } = req.body;

    if (!titre || !exemplaires_total) {
        return res.status(400).json({ error: 'titre et exemplaires_total sont obligatoires' });
    }
    if (!Array.isArray(auteurs) || auteurs.length === 0) {
        return res.status(400).json({ error: 'au moins un auteur est obligatoire' });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const livreResult = await client.query(
            `UPDATE biblio.livres 
            SET titre = $1, annee_publication = $2, exemplaires_total = $3
             WHERE id = $4 RETURNING *`,
            [titre, annee_publication, exemplaires_total, id]
        );

        if (livreResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: 'livre introuvable' });
        }

        await client.query('DELETE FROM biblio.livre_auteur WHERE livre_id = $1', [id]);

        for (const auteurId of auteurs) {
            await client.query(
                'INSERT INTO biblio.livre_auteur (livre_id, auteur_id) VALUES ($1, $2)',
                [id, auteurId]
            );
        }

        await client.query('COMMIT');
        res.status(200).json({ success: 'livre mis à jour avec succès', livre: livreResult.rows[0] });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ error: 'erreur lors de la mise à jour du livre' });
    } finally {
        client.release();
    }
}

async function deleteLivre(req, res) {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM biblio.livres WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'livre introuvable' });
        }

        res.status(200).json({ success: 'livre supprimé avec succès', livre: result.rows[0] });

    } catch (error) {
        if (error.code === '23503') {
            return res.status(409).json({ error: 'impossible de supprimer ce livre : il a des emprunts associés (passés ou en cours)' });
        }
        console.error(error);
        res.status(500).json({ error: 'erreur lors de la suppression du livre' });
    }
}

module.exports = {
    tousLivres,
    creerLivre,
    updateLivre
}