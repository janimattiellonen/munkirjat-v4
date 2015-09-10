#!/bin/bash

REMOTE=jme@51.254.35.83
REMOTE_APP=/var/www/munkirjat.com/

activator clean compile dist || exit 1;

scp target/universal/play-silhouette-seed-1.0.zip $REMOTE:$REMOTE_APP

ssh $REMOTE 'bash -s' < deploy/serverDeploy.sh
