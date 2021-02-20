#!/bin/sh

set -e

printf "\033[0;32mDeploying updates to GitHub...\033[0m\n"

hugo 

git checkout gh-pages

cp -r public/* .
rm -r public

git add .

msg="rebuilding site $(date)"

if [ -n "$*" ]; then
	msg="$*"
fi

git commit -m "$msg"

git push 

git checkout master
