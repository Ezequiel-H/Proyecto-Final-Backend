import app from './app.js';

try {
  app.listen(8081);
  console.log('Listening on port 8081');
} catch (error) {
  console.log(error);
}
