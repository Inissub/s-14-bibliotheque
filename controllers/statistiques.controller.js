const pool = require('../config/database');

async function tousStats(req, res) {
    try {
        const livres_total = await pool.query('SELECT SUM (exemplaires_total) FROM biblio.livres');
        const adherents_total = await pool.query('SELECT COUNT (*) FROM biblio.adherents');
        const emprunts_en_cours = await pool.query('SELECT COUNT (*) FROM biblio.emprunts WHERE date_retour_effective IS NULL');
        const emprunts_en_retard = await pool.query('SELECT COUNT (*) FROM biblio.emprunts WHERE date_retour_prevue < CURRENT_DATE AND date_retour_effective IS NULL ');
        const livre_plus_emprunte = await pool.query('SELECT l.id , l.titre, COUNT(e.id) AS nbr_emprunts FROM biblio.emprunts e JOIN biblio.livres l ON l.id = e.livre_id GROUP BY l.id , l.titre ORDER BY nbr_emprunts DESC LIMIT 1');
        const adherent_plus_actif = await pool.query('SELECT a.nom, a.prenom, COUNT(e.id) AS nbr_emprunts FROM biblio.emprunts e JOIN biblio.adherents a ON a.id = e.adherent_id GROUP BY  a.id, a.nom, a.prenom ORDER BY nbr_emprunts DESC LIMIT 1');

        res.json({
            total_livres : parseInt(livres_total.rows[0].sum),
            total_adherents : parseInt(adherents_total.rows[0].count),
            emprunts_encours: parseInt(emprunts_en_cours.rows[0].count),
            emprunts_enretard: parseInt(emprunts_en_retard.rows[0].count),
            livre_plusemprunte: livre_plus_emprunte.rows[0] || null,
            adhrent_plusactif: adherent_plus_actif.rows[0] || null
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "erreur lors de la recuperation des statistques." });   
    }
}

module.exports = {
    tousStats,
}