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
```
## Tester le projet en local.

1. **clonez le repo git:**
```shell 
git clone https://github.com/Inissub/s-14-bibliotheque.git
```
2. creer une base de donnée sur postgresql `bibliotheque` et y importer le fichier `biblio.sql`. Une fois cela fait, créez le fichier `.env` , à l'image du fichier `.env.example`

3. **installation des packages**
```bash
npm install
```
4. **lancer le serveur**
```bash
npm run dev
```
5. ouvrir l'adresse http://localhost:3000 dans le navigateur


