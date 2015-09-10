#!/bin/bash

cd /var/www/munkirjat.com/

echo "Stopping server.."
test -f play-silhouette-seed-1.0/RUNNING_PID && kill `cat play-silhouette-seed-1.0/RUNNING_PID` && sleep 5 && rm play-silhouette-seed-1.0/RUNNING_PID;
echo "Server stopped"

unzip -o play-silhouette-seed-1.0.zip

echo "Starting server.."
nohup ./play-silhouette-seed-1.0/bin/play-silhouette-seed -Dhttp.port=9092 &
echo "Server started"
