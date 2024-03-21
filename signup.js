const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


function isValidPassword(password) {
  return password.length >= 6;
}

rl.question('Enter your email address: ', (email) => {
   if (!isValidEmail(email)) {
    console.log('Invalid email. Please enter a valid email address.');
    rl.close();
    return;
  }
  
  
  rl.question('Enter your password: ', (password) => {
    if (!isValidPassword(password)) {
      console.log('Password must be at least 6 characters.');
      rl.close();
      return;
    }

    const userData = `${email},${password}\n`;


    fs.appendFile('users.csv', userData, (err) => {
      if (err) throw err;
      console.log('You signed up successfully!');
      rl.close();
    });
  });
});


