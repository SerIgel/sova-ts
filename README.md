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
touch config.json
```
Then open `config.json` in any editor and set your config as shown below  
Afterwards run `npm run build`
And now you are ready to run your bot with `npm start`  
### `config.json` structure:
```json
{
  "prefix": "your prefix for bot commands",
  "token": "your bot token",
  "admin": ["id of the man who can add new groups"],
  "group_channel": ["id of channels to get group"]
}
```
