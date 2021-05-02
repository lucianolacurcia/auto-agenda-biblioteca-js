# Auto Agenda Biblioteca

### Why?
Program to automate Universidad de la República's library registration.
I was used to stay studying on the library after class, but due to COVID, now we have to register the day before we want to enter to the library. Is not possible to register the same day you are going so if you forget to register passed midnight you are not able to assist to library next day :(

Few times I forgot to do it and then I decided to automate the tedious process so I dont have to do it every day.

I deployed the program as a linux service on my rapberry pi but you can do it on any linux computer.
### Installation:

1. Clone the repository:
  ```
  git clone https://github.com/lucianolacurcia/auto-agenda-biblioteca-js.git
  ```
2. Install dependencies:
  ```
  npm install
  ```
3. Change name of datos.example.json to datos.json and fulfill the fields with your personal data that will be used to register on the biblioteca's page.
4. Create linux service and enable it so it starts on boot:
  ```
  mkdir -p  ~/.config/systemd/user/
  
  ```

## TODO
