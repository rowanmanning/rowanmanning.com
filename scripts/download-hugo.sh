#!/bin/bash

curl -L https://github.com/gohugoio/hugo/releases/download/v0.101.0/hugo_extended_0.101.0_macOS-64bit.tar.gz  --output node_modules/.bin/hugo.tar.gz
cd node_modules/.bin
gunzip -c hugo.tar.gz | tar xopf -
rm hugo.tar.gz
cd -
