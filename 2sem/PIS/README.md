# PIS

## Setup
- open pis_webapp in IntelliJ IDEA
  - we are using jdk 11 (11.0.4)
- in Maven tab click "Toggle 'skip tests' mode"
- install plugin File Watchers
- create scss file watcher
  - Program : scss (we are using ruby sass)
  - Arguments : --no-cache --update $FileName$:../$FileNameWithoutExtension$.css
  - Output paths to refresh : ../$FileNameWithoutExtension$.css:$FileNameWithoutExtension$.css.map
- in Maven tab run "package" build
- start docker
- all set !

## How to start docker
- docker-compose up -d
  - creates and starts three docker containers (app, db, adminer)
  - app = springboot app
  - db = postgresql database
  - adminer = adminer tool


## Useful links :)
- http://localhost - landing page
- http://localhost/api - Spring REST API
- http://localhost:8080 - adminer

## What next ?
- somehow deploy war file to docker container after every package to keep app up-to-date automatically
