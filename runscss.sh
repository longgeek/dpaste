#!/usr/bin/env bash

SRC="dpaste/client/scss/base.scss"
DEST="dpaste/templates/dpaste/theme.css"

if [ "$1" == "watch" ]
then
    WATCH="--watch"
    echo "Watching for file changes..."
fi

sassc $WATCH --output-style=compressed $SRC $DEST && echo "Compiled scss files to $DEST"
