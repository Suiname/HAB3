#! /bin/bash
docker run -d -p 8080:8080 \
  -e HASURA_GRAPHQL_DATABASE_URL=postgres://$DB_USER:$DB_PASS@localhost.docker.internal:$DB_PORT/$DB_NAME \
  -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
  hasura/graphql-engine:latest