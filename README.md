# sova_bot
## Setup (node v12.0.0 or newer required):
### Automatic:
```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/serigel/sova-ts/master/install.sh)"
```
### Manual:
```bash
git clone https://github.com/SerIgel/sova-ts.git
cd sova_bot
npm install
npm run build
touch config.json
```
Then open `config.json` in any editor and set your config as shown below    
And now you are ready to run your bot with `npm start`  
### `config.json` structure:
```json
{
  "prefix": "your prefix for bot commands",
  "token": "your bot token",
  "admin": ["id of users who can use sudo commands"],
  "groupChannel": ["id of channels to get group in"]
}
```
If you don't know how to create your bot, you can check out [this link](https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/) and make steps from 2 to 4.  
Also you must make your bot administrtor (you can do this because you must be admin to add bots to server)
## SU commands:
Commands with `sudo: true` flag in it can only be executed by server admin or the man you specified in `config.json`
