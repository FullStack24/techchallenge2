#!/bin/sh
set -e

until pg_isready -h db -p 5432 -U educablog; do
  echo "Waiting for database to be ready..."
  sleep 5
done

echo "Database is ready!"
