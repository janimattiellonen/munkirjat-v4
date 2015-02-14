#!/bin/bash

REMOTE=jme@176.31.54.203
REMOTE_APP=/var/www/beta.munkirjat.com/

activator clean compile dist || exit 1;

scp target/universal/play-silhouette-seed-1.0.zip $REMOTE:$REMOTE_APP

ssh $REMOTE 'bash -s' < deploy/serverDeploy.sh
