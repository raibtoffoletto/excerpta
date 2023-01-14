# Excerpta

> A simple code snippet/notes management app. Built with a simple web interface and a markdown editor/parser with code highlightning.

# Install

The easiest way to run the application is through docker with the use of a docker-compose file and environment variables.

Create a new directory:

```bash
mkdir excerpta
cd excerpta
```

Create a `docker-compose.yml` file with te contents, adapting the forwarded ports as it suits you:

```yaml
version: '3.8'

services:
  neo4j:
    image: neo4j:5.3.0-community
    restart: always
    container_name: excerpta-db
    volumes:
      - ./backups:/backups
      - ./data:/data
      - ./logs:/logs
    environment:
      - NEO4J_AUTH
      - NEO4JLABS_PLUGINS=[\"apoc\"]
      - NEO4J_dbms_security_procedures_allowlist=apoc.*
      - NEO4J_apoc_export_file_enabled=true
      - NEO4J_apoc_import_file_enabled=true
      - NEO4J_apoc_import_file_use__neo4j__config=true
  app:
    image: raibtoffoletto/excerpta:1.0.0
    restart: always
    container_name: excerpta
    ports:
      - 3000:3000
    links:
      - neo4j:neo4j
    depends_on:
      - neo4j
    environment:
      - APP_PASSWORD
      - DB_USER
      - DB_PASSWORD
      - DB_URI
```

Create a `.env` file with the following contents using a strong (minimum 8 characters long) password for the app and the database.

```bash
APP_PASSWORD="PASSWORD"
DB_PASSWORD="PASSWORD"

DB_USER=neo4j
DB_URI=bolt://neo4j:7687
NEO4J_AUTH=${DB_USER}/${DB_PASSWORD}
```

Then, create the containers. The web interface will be available at `http://localhost:3000`.

```bash
docker-compose up -d
```

> <!> If you would like to access it through the internet, a reverse proxy with a valid SSL is strongly adivised.

# Development

## Dependencies

- NodeJS (16+)
- Yarn
- Docker

## Configuration

Clone this repository and enter its directory:

```bash
git clone https://github.com/raibtoffoletto/excerpta.git

cd excerpta
```

A development database is required. You can configure access to one through a `.env` file and override the development defaults, or create/remove one with the help of `yarn`:

```bash
# to create it
yarn dev:db

# to remove it
yarn dev:db-rm
```

Install the dependecies and run the app:

```bash
yarn

yarn dev
```

The development app will be available at `http://localhost:3000`

## Types

If the database schema is modified, new types need to be generated.

```bash
yarn generate
```

## Building

To build and run a local docker image:

```bash
yarn build

docker run -d -e APP_PASSWORD="password" -e DB_PASSWORD="password" -e DB_USER="neo4j" -e DB_URI="bolt://localhost:7687" --network host --name excerpta excerpta
```

## Database management

When dealing with docker containers, the easiest way to manage `neo4j` databases is with the official utility image `neo4j-admin`.

Note that the versions of the database and admin containers should match! When performing a migration, the admin version will match the new desired database version. Also, the container should be down for any operation.

> <!> Example, migrating from version v4 to v5, you should stop the v4 container, use admin v5 to migrate and then start a new v5 container.

```bash
# create a backup
docker run -i -t -v "$PWD/data:/data" -v "$PWD/backups:/backups" -v ${PWD}/logs:/logs --rm neo4j/neo4j-admin:5.3.0-community neo4j-admin dump --to-path="/backups" neo4j

# load a backup
docker run -i -t -v "$PWD/data:/data" -v "$PWD/backups:/backups" -v ${PWD}/logs:/logs --rm neo4j/neo4j-admin:5.3.0-community neo4j-admin database load --from-path="/backups" neo4j

# perform a migration
docker run -i -t -v "$PWD/data:/data" -v "$PWD/backups:/backups" -v ${PWD}/logs:/logs --rm neo4j/neo4j-admin:5.3.0-community neo4j-admin database migrate neo4j
```

# Acknoledgements

Excerpta is built using awesome open source projects! Heartfelt thanks to:

- [MUI](https://mui.com/)
- [neo4j](https://neo4j.com/)
- [Next.js](https://nextjs.org/)
- [next-pwa](https://github.com/shadowwalker/next-pwa)
- [React](https://reactjs.org/)
- [react-markdown](https://github.com/remarkjs/react-markdown)
