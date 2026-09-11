# s-14-bibliotheque
## logique de la base de données
### diagramme entitées relations.

```mermaid
erDiagram
Auteurs ||--|{ Livre_auteur : "a ecrit"
Livres ||--|{ Livre_auteur : "associé à"

Adherents ||--o{ Emprunts: "emprunte"
Livres ||--o{ Emprunts : "concerne"

Auteurs{
    int id PK
    varchar nom
    varchar nationalité
}
Livres{
    int id PK
    varchar titre
    int annee_publication
    int exemplaires_total
    int exemplaires_disponibles
}
Livre_auteur {
    int livre_id FK
    int auteur_id FK
}
Adherents{
    int id PK
    varchar nom
    varchar prenom
    varchar contact
}
Emprunts {
    int id PK
    int adherent_id FK
    int livre_id FK
    date date_emprunt
    date date_retour_prevue
    date date_retour_effective
}

 
Employes {
    int id PK
    varchar nom
    varchar email
    varchar mot_de_passe_hash
    varchar role
}



