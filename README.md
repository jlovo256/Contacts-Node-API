# Contacts-api

A simple demostration of a Node API.  <a href="https://github.com/jtdarkly/Contacts-Node-API/blob/master/Contacts-api/README.md">Yeah, but what is it?</a>  <a href="https://jamietudor.me/api-docs/">Swagger UI</a>.

### Important Things to Note
- Only relevant if and only if, you want to load the files using Visual Studio: There is a Visual Studio <a href="https://docs.microsoft.com/en-us/visualstudio/extensibility/internals/solution-dot-sln-file">solution file</a>, but THE SOLUTION FILE did not load when tested in the Mac version or Visual Studio Code.  Loading in another Windows version is untested.  (I am not talking about running the app itself, I ran actually run it in the Visual Studio IDE.  I use npm on the command line in Windows, Mac, and Linux.)
- You need a .env file.  Included in the project is TEMPLATE.env, which has all the variables you need.  .gitignore is already set to ignore .env files.
- Windows loves its own encoding and line-endings.  In theory, the <a href="https://docs.microsoft.com/en-us/visualstudio/ide/create-portable-custom-editor-options">.editorconfig file and extension</a> tells the editor to save the .js and .json files in utf-8, with LF endings.  It works some of the time, but not all of the time.  This may not affect you at all.

## Features

<dl>
  
  <dt>Restful API with CRUD Http Methods</dt>
  <dd>
    Designed with <a href="https://en.wikipedia.org/wiki/Representational_state_transfer">Restful API</a> principles, using <a href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete">CRUD</a> methods: POST, GET, PUT, etc.  Makes logic of requests URL's easy to understand.
  </dd>

  <dt>Express Web Server</dt>
  <dd>
    Uses <a href="https://www.npmjs.com/package/express">Express</a> for requests routing and middlewares.  Scalable and easy to use.
  </dd>
  
  <dt>Support for JSON and XML</dt>
  <dd>
    Uses the popular express middleware, <a href="https://github.com/expressjs/body-parser#readme">Body-Parser</a>, for JSON requests.  Can also send xml repsonses using <a href="https://github.com/oozcitak/xmlbuilder-js">XMLBuilder</a>.
  </dd>

  <dt>Database integration</dt>
  <dd>
    <a href="https://www.npmjs.com/package/sequelize">Sequelize</a>, an ORM for SQL databases, is integrated.
  </dd>

  <dt>Process Manager for Production</dt>
  <dd>
    <a href="https://pm2.io/doc/en/runtime/quick-start/">PM2</a> is a production process manager for Node.js applications, that has a built-in load balancer.  PM2 allows you to keep applications alive forever and reload them without downtime, and will facilitate common system admin tasks.  PM2 also enables you to manage application logging, monitoring, and clustering <a href="https://expressjs.com/en/advanced/pm.html">From Expressjs</a>.
  </dd>

  <dt>Instant Reload for Development</dt>
  <dd>
    Uses <a href="https://www.npmjs.com/package/nodemon">Nodemon</a> to automatically reload the server, after a file change, when in development mode.
  </dd>
  
  <dt>Testing</dt>
  <dd>
    The test suite uses <a href="https://www.npmjs.com/package/mocha">Mocha</a>/<a href="https://www.npmjs.com/package/chai">Chai</a>.
  </dd>
  
  <dt>JSDoc</dt>
  <dd>
    <a href="http://usejsdoc.org/">JSDoc</a> for documentation, in addition to hand-crafted locally-sourced artisanal READMEs.
  </dd>
  
  <dt>EditorConfig</dt>
  <dd>
    <a href="https://editorconfig.org/">Editor Config</a> tells your editor what styles to use.  Works with most IDEs.
  </dd>

  <dt>Visual Studio Solution</dt>
  <dd>
    There is also a solution file, because I have been working in Visual Studio 2017, with a Node extentsion; I do not believe THE SOLUTION FILE will work in Visual Studio Code or the Mac version of Visual Studio (running with npm worked when tested in Windows, Mac, and Linux).  Read more about solution files <a href="https://docs.microsoft.com/en-us/visualstudio/extensibility/internals/solution-dot-sln-file">here</a>.
  </dd>

  <dt>Logging</dt>
  <dd>
    The <a href="https://github.com/winstonjs/winston">Winston</a> logs to the console, an error log, and a combined log.   Through <a href="https://github.com/expressjs/morgan">Morgan</a> middleware, it logs api requests made through http.  It also logs Sequelize requests to database.  Console output is silenced during testing.
  </dd>

  <dt>ESLint</dt>
  <dd>
    <a href="https://eslint.org/">ESLint</a> for code that isn't terrible.  Mostly <a href="https://github.com/airbnb/javascript#table-of-contents">Airbnb</a> style.  
  </dd>

</dl>

## Prerequisites

- [Node](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [PM2](https://pm2.io/doc/en/runtime/overview/)

## Installing

The easiest way to get started is to clone the repository:

```sh
# Get the latest snapshot
git clone https://github.com/jtdarkly/Contacts-api.git

# Change directory
cd Contacts-api/Contacts-api

# Install NPM dependencies
npm install
```
You will need to create an .env file in the project directory, and a schema in a sql database.  Put access info about the database in the .env file.

NOTE: Your HOST needs to include the right protocol. (ex: HOST=http://localhost)
```dosini
NODE_ENV=yourvalue
HOST=yourvalue
PORT=yourvalue

DB_USERNAME=yourvalue
DB_PASSWORD=yourvalue
DB_DATABASE=yourvalue
DB_HOST=yourvalue
DB_PORT=yourvalue
DB_DIALECT=yourvalue

DB_USERNAME_TEST=yourvalue
DB_PASSWORD_TEST=yourvalue
DB_DATABASE_TEST=yourvalue
DB_HOST_TEST=yourvalue
DB_PORT_TEST=yourvalue
DB_DIALECT_TEST=yourvalue
```
To use the PM2-cli and autocompletion, install the PM2 globally.  However, PM2 is really not required for this app.  You can easily change the start script in package.json to bypass cluster.js and go straight to index.js. <a href="https://pm2.io/doc/en/runtime/quick-start/">More information.</a>
```sh
# Install process manager
npm install pm2 -g
# Complete your installation with the CLI autocompletion
pm2 completion install
```
You will need to run migrations, using <a href="https://github.com/sequelize/cli">Sequelize-cli</a>
```sh
# Install sequelize-cli globally to use sequelize binary on cmd (optional)
npm install -g sequelize-cli

# Run migrations
sequelize db:migrate
```
<span style="color:red">KNOWN BUG</span>: Hacky fix for sequelize difficulties with composite keys, combined with known MySQL issues (<a href="https://bugs.mysql.com/bug.php?id=20356">ref 1<a/> and <a href="https://bugs.mysql.com/bug.php?id=55669">ref 2</a>), can create issues.  Big surprise!  If you run into migration errors, try changing the capitialization of the table names in the entryFix and defaultTimes migration files.

Optional: You can seed your database with the provided Futurama seeder.  
```sh
# To add data to your database, run seeders
sequelize db:seed:all

```
If you have separate databases for development, testing, or production, change the NODE_ENV to seed that database (this is how sequelizer-cli works).  See the <a href="http://docs.sequelizejs.com/manual/tutorial/migrations.html#the-cli">sequelize documentation</a> for more information on migrations and seeding.
```sh
# Migrate your test db
npm run sequelize db:migrate -- --env=test

# Seed your test db
npm run sequelize db:seed:all -- --env=test

```

## Usage

```sh

# Start the API server using node (will start pm2)
npm start

# Stop after npm start
pm2 stop index

# Start in development mode
npm run dev

# Test it
npm test

# Just feature (api) test
npm run test:feature

# Just unit test
npm run test:unit

```
## More Info About the App Itself

The features and functionality are unexciting.  This is meant to be a demonstration of a REST Api, not a revolutionary feature.  <a href="https://github.com/jtdarkly/Contacts-Node-API/blob/master/Contacts-api/README.md">But read more about it here.</a>

## Dependencies
- [app-root-path](https://github.com/inxilpro/node-app-root-path)
- [bluebird](https://github.com/petkaantonov/bluebird)
- [body-parser](https://github.com/expressjs/body-parser)
- [chai](https://github.com/chaijs/chai)
- [chai-http](https://github.com/chaijs/chai-http)
- [chai-things](https://github.com/chaijs/chai-things)
- [cross-env](https://github.com/kentcdodds/cross-env)
- [dotenv](https://github.com/motdotla/dotenv)
- [express](https://expressjs.com/)
- [express-validator](https://github.com/express-validator/express-validator)
- [factory-girl](https://github.com/aexmachina/factory-girl)
- [helmet](https://github.com/helmetjs/helmet)
- [lodash](https://github.com/lodash/lodash)
- [morgan](https://github.com/expressjs/morgan)
- [mysql2](https://github.com/sidorares/node-mysql2)
- [pm2](https://github.com/Unitech/pm2)
- [sequelize](https://github.com/sequelize/sequelize)
- [sequelize-cli](https://github.com/sequelize/cli)
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)
- [winston](https://github.com/winstonjs/winston)
- [xmlbuilder](https://github.com/oozcitak/xmlbuilder-js)
- [yamljs](https://github.com/jeremyfa/yaml.js)
### Dev

- [eslint](https://github.com/eslint/eslint)
- [eslint-config-airbnb-base](https://github.com/airbnb/javascript)
- [eslint-config-standard](https://github.com/standard/eslint-config-standard)
- [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
- [eslint-plugin-mocha](https://github.com/lo1tuma/eslint-plugin-mocha)
- [eslint-plugin-node](https://github.com/mysticatea/eslint-plugin-node#readme)
- [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise)
- [eslint-plugin-standard](https://github.com/standard/eslint-plugin-standard)
- [jsdoc](https://github.com/jsdoc3/jsdoc)
- [mocha](https://github.com/mochajs/mocha)
- [nodemon](https://github.com/remy/nodemon)

## Thanks

In addition to the sources linked to in the Readme, thanks to <a href="https://github.com/biscuitehh">Biscuit</a> for giving me good feature suggestions, and <a href="https://github.com/talyssonoc">Talyssonoc</a> for ideas from his <a href="https://github.com/talyssonoc/node-api-boilerplate">node-api-boilerplate</a>.
