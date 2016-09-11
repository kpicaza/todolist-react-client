# Setting up the Project

First you'll need [Node.js](https://nodejs.org) and the package manager
that comes with it: [npm](https://www.npmjs.com/).

Once you've got that working, head to the command line where we'll set
up our project.

First you need API service up and running. Create your own or user [in-fw Todo list API](https://github.com/kpicaza/todolist)

## Clone the Tutorial

```
git clone git@github.com:kpicaza/todolist-react-client.git
cd todolist-react-client
npm install
npm start
```

Open `app/config/apiRoutes.js` and modify your Rest API URL.

```
import config from 'react-global-configuration';

const apiPath = 'http://api.todolist.com/api/v1';
...
```

Now open up [http://localhost:8080](http://localhost:8080)
