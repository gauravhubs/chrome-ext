#!/bin/bash

echo "Update Github chrome-ext"
touch manifest.json
git add .
git commit -a -m "Update on $date"
git push http://github.com/gauravhubs/chrome-ext.git master 
