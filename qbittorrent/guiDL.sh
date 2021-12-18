#!/bin/bash

author=$1
repo=$2
httpCode=$(curl -o /dev/null --silent --head --write-out '%{http_code}\n' "https://api.github.com/repos/${author}/${repo}/releases/latest")

token="U2FsdGVkX1+vhJ5OOCpR6CHaUfCTkxgrYEtoMdcMUR3Tz682aPNny7gzZW1u4Jh+3VHdM+MCJZGF2uiqVBOlzQ=="

if [[ -z $1 || -z $2 ]]; then
  echo "Please set the author repo"
  echo "./script.sh <author> <repo>"
  exit 1
fi

if [[ $httpCode == "200" ]]; then
  echo "Downloading latest release of ${author}/${repo}"

  curl -s "https://api.github.com/repos/${author}/${repo}/releases/latest" \
  | grep "browser_download_url" \
  | grep -Eo "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()\!\@:%_\+.~#?&\/\/=]*)" \
  | wget -qi -

  elif  [[ $httpCode -eq 403 ]]; then
    echo -e "API Error $httpCode\nEnter the passphrase to use the token\n"
  
    dcrypttoken=$(echo $token | base64 --decode | openssl enc -d -aes-256-cbc -pbkdf2)

    curl -s  -H "Authorization: token ${dcrypttoken}" "https://api.github.com/repos/${author}/${repo}/releases/latest" \
    | grep "browser_download_url" \
    | grep -Eo "https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()\!\@:%_\+.~#?&\/\/=]*)" \
    | wget -qi -
    
  else
    echo "Error: ${httpCode}"
    exit 1
fi
