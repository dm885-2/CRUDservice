# Microservice-template
A template for a generic microservice, which already have most stuff setup needed for a generic service.
- DB connection.
- RapidMQ.
- Verify JWT token.
- JEST testing.
- NPM scripts.

## Commands
Start service (Starts `./src/index.js`)
```
npm run start
```


Debug service (Starts `./src/index.js`). It will automaticly restart the node proccess of file changes.
```
npm run debug
```

Run tests
```
npm run test
```

## Enviroment variables
| Name       | Description                    |
|------------|--------------------------------|
| rabbitUser | Contains the RabbitMQ username |
| rabbitPass | Contains the RabbitMQ password |
| rabbitHost | Contains the RabbitMQ hostname |
| rabbitPort | Contains the RabbitMQ port     |
| SECRET     | Contains the JWT secret        |
| mysqlHost  | Contains the MySQL hostname    |
| mysqlDb    | Contains the MySQL db name     |
| mysqlUser  | Contains the MySQL username    |
| mysqlPass  | Contains the MySQL password    |


## Create new microservice repository from this template
Creating a repository for a new microservice starting from this template works as follows.  
First create an empty repository in [our organisation](https://github.com/DM885).  
Then run following commands on your computer.
```sh
# Clone the template
git clone git@github.com:DM885/Microservice-template.git <MyNewService>

# Move into your cloned repository
cd <MyNewService>

# Give the remote a new name, namely Gateway
git remote rename origin template

# Now add the remote of your newly created service repository
git remote add origin git@github.com:DM885/<MyNewService>.git

# Lastly, set the origin remote as the default one
git branch --set-upstream-to origin/main

# Done!
```

To pull new updates from the template repository, you can use
```sh
git pull template
```


