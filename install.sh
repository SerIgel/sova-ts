#!/bin/bash
if which node > /dev/null
then
    echo "Node is instaled, proceeding..."
    else
    echo "You need to install node v12 or newer"
    exit
fi
echo "Cloning from github"
git clone https://github.com/SerIgel/sova-ts.git
cd sova-ts
touch ./config.json
read -p "Input command prefix: " prefix
read -p "Input your bot token: " token
read -p "Specify admin by Discord ID: " admin
read -p "Input channel to take group roles in: " ch
echo "You can also specify admin roles in config.json"
cat << EOF > ./config.json
{ 
    "prefix": "${prefix}", 
    "token": "${token}",
    "admin": ["${admin}"],
    "groupChannel": ["${ch}"]
}
EOF
echo "Installing dependencies..."
npm install
npm run build
echo "cd to ./sova-ts then \"$ npm start\" to start a bot"