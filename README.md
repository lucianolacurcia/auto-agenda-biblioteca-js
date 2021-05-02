# Auto Agenda Biblioteca
Program to automate Universidad de la República's library registration.

### Why?

I was used to stay studying on the library after class, but due to COVID, now we have to register the day before we want to enter to the library. Is not possible to register the same day you are going so if you forget to register passed midnight you are not able to assist to library next day :(

Few times I forgot to do it and then I decided to automate the tedious process so I dont have to do it every day.

I deployed the program as a linux service on my rapberry pi but you can do it on any linux computer.
### Installation:
0. Be sure to have all the dependencies already installed:
	*	git
	*	nodejs
	*	npm

1. Clone the repository:
  ```
  git clone https://github.com/lucianolacurcia/auto-agenda-biblioteca-js.git
  ```
2. Install dependencies:
  ```
  npm install
  ```
3. Change name of datos.example.json to datos.json and fulfill the fields with your personal data that will be used to register on the biblioteca's page.
4. Add path to the project folder in auto-agenda-biblioteca.service so it ends similar to this:
```
[Unit]
Description=Bot para agendarse automaticamente en la biblioteca de la fing.
Documentation=https://lucianolacurcia.github.io
After=network.target

[Service]
WorkingDirectory=/home/luciano/bin/auto-agenda-biblioteca-js/
ExecStart=node /home/luciano/bin/auto-agenda-biblioteca-js/main.js
Restart=on-failure
Environment=PATH=/bin:/usr/bin:/usr/local/bin
```

5. Create linux service and enable it so it starts on boot:
  ```
  mkdir -p  ~/.config/systemd/user/
  cp <path to the project folder>auto-agenda-biblioteca.service ~/.config/systemd/user/
  systemctl --user daemon-reload
  systemctl --user enable --now auto-agenda-biblioteca.service
  ```
6. You can now check the status of the service by running:
```
systemctl --user status auto-agenda-biblioteca.service
```

### Configuration
The program runs a similar-to-crontab node package that enables you to schedule the recurrent execution of the script.
In order to configure the program to be executed at certain period of time you have to edit the main.js file:
```
const cron = require('node-cron');
const app = require('./app.js');

cron.schedule(' * */4 * * *', function(){ // <--- here you have to use crontab syntax to shedule the execution...
        app();
});
```
You can use [this site](https://crontab.guru/) to help you to create the crontab expression.
