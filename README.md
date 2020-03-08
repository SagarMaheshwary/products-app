# React/Redux and Laravel Products App

### Running this app
- Make sure you have [xampp](https://www.apachefriends.org/index.html) installed which is a package for PHP, MySQL, and Apache. it's available for all platforms such as windows, mac, and linux.

- Clone this repo to your machine or just download the zip file.

- Install [Composer](https://getcomposer.org) first, then run this command in your command-line (you should be inside your project directory).

- Install [Nodejs](https://nodejs.org) for npm, then run the below command:
```bash
    npm install
```
- Note: Above step is only needed if you make changes to the reactjs files.

- Rename .env.example to .env and add you database credentials.

- Generate application key:
```bash
    php artisan key:generate
```
- create tables from migrations:
```bash
    php artisan migrate
```

- Create a symbolic link of storage folder in public directory:
```bash
    php artisan storage:link
```

- you can create a virtual host from apache or just run this command to start the default php server:
```bash
    php artisan serve
```