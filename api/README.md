# API Express + TypeScript + Sequelize

API backend pour le projet de gestion des pollutions.

## Technologies

- **Express** - Framework web Node.js
- **TypeScript** - Langage typé
- **Sequelize** - ORM pour MySQL
- **Nodemon** - Hot reload en développement

## Installation

```bash
npm install
```

## Configuration

Créez un fichier `.env` à la racine avec :

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=pollution_db
```

## Scripts disponibles

### Développement (avec hot reload)

```bash
npm run dev
```

Lance le serveur en mode développement avec `nodemon`. Le serveur redémarre automatiquement à chaque modification de fichier `.ts`, `.js` ou `.json`.

Pour redémarrer manuellement : tapez `rs` dans le terminal et appuyez sur Entrée.

### Production

```bash
npm run build    # Compile TypeScript vers JavaScript (dossier dist/)
npm start        # Lance le serveur compilé
```

### Base de données (Sequelize CLI)

```bash
npm run db:migrate          # Exécute les migrations
npm run db:migrate:undo     # Annule la dernière migration
npm run db:seed             # Charge les données de test (seeders)
```

## Structure du projet

```
api/
├── config/           # Configuration Sequelize
├── migrations/       # Migrations de base de données
├── models/           # Modèles Sequelize
├── routes/           # Routes Express
├── seeders/          # Données de test
├── app.ts            # Configuration Express
├── index.ts          # Point d'entrée
└── tsconfig.json     # Configuration TypeScript
```

## Développement

Le serveur écoute par défaut sur le port **3000**.

Testez l'API :

```bash
curl http://localhost:3000/
```

Réponse attendue :

```json
{ "message": "API OK" }
```

## Hot Reload

Nodemon surveille automatiquement :

- Tous les fichiers `.ts` et `.js`
- Les fichiers `.json`
- Le fichier `.env`

Toute modification déclenche un rechargement automatique du serveur.
