#!/bin/bash

filenames=$(find ./dist -type f)

for filename in $filenames; do
  gzip -9 -c $filename > $filename.gz
done
