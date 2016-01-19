#!/bin/bash

echo "Update Github chrome-ext"
touch manifest.json
git add .
d=`date`
git commit -a -m "Update on $d"
git push http://github.com/gauravhubs/chrome-ext.git master 
