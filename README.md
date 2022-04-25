# Node Boilerplate

- Some included features of this to help me start a node and express backend using a MySQL database.

  - JWT Authentication
  - Basic validation form input validation
  - Authorization with different user groups.
  - Basic error handling.
  - Use of environment variables in an ignored .env (read below for a bit more information).
  - HTTP logging using Morgan
  - General logging using Winston

- Notes:

  - Configuration Related Content

    - For running the application:

      - 1. Make sure to fill out the .env with proper values

    - For the missing .env file

      - I will attach a blank envCopy.txt file which will have the required properties that are all blank. Just create a .env file in the root directory of this project and add the values in.
      - To find a list of the supported drivers if you don't prefer to use MySQL go [here to the sequelize documentation page](https://sequelize.org/v6/manual/getting-started.html#installing)

    - Seeding Data (populating the test database with data):
      - I have a .sequelizerc file but I will not be using that for now and instead will be using the {sync:true} option when creating the application.
      - Instead my approach just to populate the data using a javascript module (bootstrap-data.js).
        - I chose this approach as I had some trouble working with the associations between the user (AppUser) and roles (AppRole) using sequelize-cli. If appropriate and with more time I will come back and explore this further.

  - Other resources

    - For help with keeping your tables in your database updated [view the documentation for an overview](https://sequelize.org/v6/manual/model-basics.html#model-synchronization)
    - Overview for logging with morgan [here](https://expressjs.com/en/resources/middleware/morgan.html)
      - The below listed bullet points are just some examples I found to be useful to look at for logging given certain requirements (development environment, custom logging, etc.)
      - There is an example of the "dev" logging which is most useful for a boilerplate app like this one.
      - There is also an example of a custom format of logging and this can be found with searching for "Using a custom format function" to see an example of it.
    - Winston logging notes:
      - Basic [documentation page](https://github.com/winstonjs/winston)
        - Go to the [usage section](https://github.com/winstonjs/winston#usage) for an example of how to configure logging.

  - Setting up a simple MySQL container
    - This is if you want to use docker to spin up a quick MySQL container.
      - Create a docker container with MySQL
        - docker run --name nodeBptestDB -e MYSQL_ROOT_PASSWORD=1234test -e MYSQL_DATABASE=nodebptestdb -p 3307:3306 -d mysql
      - Command for looking up the ip address of the container
        - docker exec -it nodeBptestDB hostname -i
          - Take the value here and assign it to "DB_TEST_HOST" inside of the .env file.
    - Note: This creates a root user but for production it is recommended to not provide the backend app root level permissions.
