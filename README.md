# Kabalan Construction Portfolio

A full-stack construction portfolio website with an editable content-management
portal. The public one-page site and every section in it are backed by MySQL, so
an administrator can update the site without changing code.

This project was built for the Violet intern assignment.

## What is included

- **Public site:** Home, About, Services, Track Record, Projects, and Contact.
- **Admin portal:** edit all page content, statistics, services, projects,
  navigation, social links, company details, and images.
- **Authentication:** admin login with bcrypt password hashing and a JWT stored
  in an `httpOnly` cookie.
- **Responsive layout:** usable on phones, tablets, and desktops.
- **Seeded demo content:** the original portfolio content and images are loaded
  by the database seeders.

## Tech stack

| Layer    | Technology                                                |
| -------- | --------------------------------------------------------- |
| Client   | React 19, Vite, Bootstrap 5, React-Bootstrap               |
| Server   | Node.js, Express 5, Sequelize, Zod                         |
| Database | MySQL 8                                                   |
| Auth     | bcryptjs, JSON Web Tokens, `httpOnly` cookies              |
| Uploads  | Multer, local `server/uploads` directory                   |

## Reviewer quick start

### 1. Prerequisites

- **Node.js 22 or newer**
- **Docker Desktop** (recommended, for MySQL)
- Git

If you do not use Docker, install MySQL 8 manually and update the database
settings in `server/.env`.

### 2. Clone and install

```bash
git clone https://github.com/MrKabalan04/violetInternProject.git
cd violetInternProject
npm run install:all
```

`install:all` installs the root, client, and server dependencies.

### 3. Start MySQL

```bash
npm run docker:up
docker compose ps
```

Wait until the `mysql` service reports **healthy** (usually 20–30 seconds) before
running the database scripts.

### 4. Create the server environment file

**Windows PowerShell:**

```powershell
Copy-Item server/.env.example server/.env
```

**macOS / Linux:**

```bash
cp server/.env.example server/.env
```

The example file is already configured for the included Docker database, so no
changes are needed for a local review. For a real deployment, change
`JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.

### 5. Create the database and seed demo content

```bash
npm run db:setup
```

This runs the migrations and then the seeders. The seeders create the 16
application tables, load the site content and images, and create the admin
account.

### 6. Run the app

```bash
npm run dev
```

| Service    | URL                           |
| ---------- | ----------------------------- |
| Public site| http://localhost:5173         |
| Admin      | http://localhost:5173/admin   |
| API        | http://localhost:5000/api     |

**Demo admin login:**

```text
Email:    admin@kabalan.com
Password: Admin123!
```

Change the password from **Admin → Account** after signing in.

## Verify the project

With MySQL running and the database seeded:

```bash
npm run verify
```

This runs lint, the API smoke test, and the production client build. The smoke
test uses a temporary admin account, so it does not change your admin password.

You can also run each check separately:

```bash
npm run lint
npm test
npm run build
```

## Available scripts

| Command                    | Description                                       |
| -------------------------- | ------------------------------------------------- |
| `npm run install:all`      | Install root, client, and server dependencies     |
| `npm run dev`              | Start Vite and Express together                   |
| `npm run client`           | Start only the Vite client                        |
| `npm run server`           | Start only the Express API                        |
| `npm run build`            | Build the production client                       |
| `npm start`                | Start Express and serve the built client          |
| `npm run verify`           | Run lint, smoke test, and production build        |
| `npm run docker:up`        | Start the MySQL container                         |
| `npm run docker:down`      | Stop the MySQL container                          |
| `npm run db:setup`         | Run migrations and seeders                        |
| `npm run db:migrate`       | Apply pending migrations                          |
| `npm run db:migrate:undo`  | Revert the latest migration                       |
| `npm run db:seed`          | Run pending seeders                               |
| `npm run db:seed:undo`     | Revert the latest seeder                          |

## Project structure

```text
client/
  src/
    admin/                 Protected admin portal
    components/            Public site sections and layout
    context/               Public content provider
    services/              API client
server/
  src/
    config/                Database and auth configuration
    controllers/           Auth, content, and admin handlers
    db/migrations/         Sequelize schema migrations
    db/seeders/             Content and admin seeders
    middleware/             Auth and upload middleware
    models/                 Sequelize models
    routes/                 API routes
    services/               Content aggregation
    validation/             Zod request schemas
    app.js                  Express application
    server.js               Entry point
  test/smoke.mjs            API smoke test
  uploads/                  Served at /uploads
    seed/                   Images used by the demo content
docker-compose.yml          MySQL 8 development container
```

## Environment variables

`server/.env`:

| Variable         | Purpose                                           |
| ---------------- | ------------------------------------------------- |
| `PORT`           | Express port (default `5000`)                     |
| `DB_HOST`        | MySQL host                                        |
| `DB_PORT`        | MySQL port                                        |
| `DB_NAME`        | Database name                                     |
| `DB_USER`        | Database user                                     |
| `DB_PASSWORD`    | Database password                                 |
| `DB_LOGGING`     | Set to `true` to log SQL queries                  |
| `JWT_SECRET`     | Secret used to sign admin tokens                  |
| `JWT_EXPIRES_IN` | Token lifetime (default `8h`)                     |
| `ADMIN_NAME`     | Seeded admin display name                         |
| `ADMIN_EMAIL`    | Seeded admin email                                |
| `ADMIN_PASSWORD` | Seeded admin password                             |
| `CLIENT_ORIGIN`  | Allowed client origin(s), comma-separated         |

`client/.env` is optional. Set `VITE_API_URL` only when the client and API are on
different origins. The default Vite proxy handles local development.

## Database

The schema contains 16 application tables:

| Area           | Tables                                            |
| -------------- | ------------------------------------------------- |
| Administration | `admin_users`                                     |
| Site settings  | `site_settings`                                   |
| Navigation     | `nav_links`                                       |
| Social links   | `social_links`                                    |
| Home           | `home_content`, `home_stats`                      |
| About          | `about_content`, `about_features`                 |
| Services       | `services_content`, `services`                    |
| Track record   | `track_record_content`, `track_stats`             |
| Projects       | `projects_content`, `projects`                    |
| Contact        | `contact_content`, `contact_details`              |

Migration and seeder history is stored in `sequelize_migrations` and
`sequelize_seeders`.

Re-running `npm run db:seed` updates the seeded admin password to the
`ADMIN_PASSWORD` value in `server/.env`.

## API overview

| Method | Endpoint                   | Description                         |
| ------ | -------------------------- | ----------------------------------- |
| GET    | `/api/health`              | Health check and database state     |
| GET    | `/api/content`             | Public site content                 |
| POST   | `/api/auth/login`          | Sign in and set the auth cookie     |
| POST   | `/api/auth/logout`         | Clear the auth cookie               |
| GET    | `/api/auth/me`             | Current authenticated user          |
| PUT    | `/api/auth/password`       | Change the current admin password   |
| GET    | `/api/admin/content`       | All content, including inactive nav |
| PUT    | `/api/admin/content/:key`  | Update one content section          |
| POST   | `/api/admin/uploads`       | Upload an image (`image` field)     |
| GET    | `/api/admin/:resource`     | List a collection                   |
| POST   | `/api/admin/:resource`     | Create an item                      |
| PUT    | `/api/admin/:resource/:id` | Update an item                      |
| DELETE | `/api/admin/:resource/:id` | Delete an item                      |

All `/api/admin/*` routes require the `admin_token` cookie.

Singleton content keys for `PUT /api/admin/content/:key`:

```text
site, home, about, services-content, track-record, projects-content, contact
```

Collection resources for the generic CRUD routes:

```text
home-stats, about-features, services, track-stats, projects,
contact-details, social-links, nav-links
```

## Uploads

Images are written to `server/uploads/` and served from `/uploads`. The seeded
images live in `server/uploads/seed/`. Runtime uploads are ignored by Git.

Upload limits:

- JPG, PNG, WebP, AVIF, or GIF
- 5 MB maximum
- One image per request, using the `image` form field

## Production notes

```bash
npm run build
npm start
```

In production:

- Set `NODE_ENV=production` in `server/.env` or your hosting environment.
- Set a strong, unique `JWT_SECRET`.
- Change `ADMIN_PASSWORD` before seeding, or change it from the admin account.
- Set `CLIENT_ORIGIN` to the deployed site origin.
- Serve the app over HTTPS. The auth cookie is marked `secure` when
  `NODE_ENV=production`, so login will fail over plain HTTP.
- Store uploads on persistent storage or replace the local upload directory
  with an object-storage provider.

## Troubleshooting

**MySQL does not become healthy**

```bash
docker compose logs mysql
```

If port `3306` is already in use, stop the other MySQL instance or change the
published port in `docker-compose.yml`.

**Database connection fails after cloning**

Make sure `server/.env` exists and its `DB_*` values match the Docker database.

**Reset the local database**

This deletes the local Docker database volume:

```bash
docker compose down -v
npm run docker:up
npm run db:setup
```

**Admin login fails**

Use the credentials from `server/.env`, or re-run `npm run db:seed` to reset the
seeded admin password.

**Port already in use**

Stop the process using port `3306`, `5000`, or `5173`, then restart.

## Known limitations

- The contact form keeps its original client-side behavior; messages are not
  stored or emailed.
- `Team` and `Pages` remain non-functional placeholders to preserve the original
  site structure.
- Uploaded images are stored on the local filesystem.
- The original demo MongoDB/Mongoose setup and `/api/items` endpoints were
  removed; all portfolio content now lives in MySQL.
