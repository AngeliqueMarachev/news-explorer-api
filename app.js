const express = require('express');
const app = express();

// middleware
const { requestLogger, errorLogger } = require('./middleware/logger');

//routes
const users = require('./routes/users')
const articles = require('./routes/articles');

const { PORT = 3000 } = process.env;

app.use(requestLogger);

app.use('/users', users);
app.use('/articles', articles);

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
