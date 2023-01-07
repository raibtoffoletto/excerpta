# Excerpta API

A simple code snippet/notes repository. Built with a simple interface, and markdown editor/parser with code highlightning.

# Install

```yml
version: '3.8'
services:
  neo4j:
    image: neo4j
    restart: always
    container_name: excerpta-neo4j
    volumes:
      - ./data:/data
      - ./logs:/logs
    environment:
      - NEO4J_AUTH
      - NEO4JLABS_PLUGINS
      - NEO4J_dbms_security_procedures_whitelist
      - NEO4J_dbms_security_procedures_unrestricted
  server:
    image: excerpta-server
    restart: always
    container_name: excerpta-server
    links:
      - neo4j:neo4j
    depends_on:
      - neo4j
    environment:
      - DB_USER
      - DB_PASSWORD
      - DB_URI
  web:
    image: excerpta-app
    restart: always
    container_name: excerpta-app
    ports:
      - 3000:3000
    links:
      - server:server
    depends_on:
      - server
    environment:
      - APP_PASSWORD
      - API_URI
```

# Development

## Dependencies

## Configuration

## Running

## Acknoledgements
