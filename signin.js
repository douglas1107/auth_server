const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter your email address: ', (email) => {
  rl.question('Enter your password: ', (password) => {
    fs.readFile('users.csv', 'utf8', (err, data) => {
      if (err) throw err;
      const users = data.trim().split('\n').map(line => line.split(','));

      const user = users.find(user => user[0] === email && user[1] === password);
      if (user) {
        console.log('Youre logged in!');
      } else {
        console.log('Incorrect email or password please try again!');
      }
      rl.close();
    });
  });
});
