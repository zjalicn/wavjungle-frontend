let users = JSON.parse(localStorage.getItem("users")) || [];

export function fetcher() {
  let realFetch = window.fetch;
  window.fetch = function(url, opts) {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(() => {
          this.console.log('ghfd');
        //AUTHENTICATE
        if (url.endsWith("/users/authenticate") && opts.method === "POST") {
          let params = JSON.parse(opts.body); // get parameters from post request
          let filteredUsers = users.filter(user => {  // check if any users match creds
            return (
              user.username === params.username &&
              user.password === params.password
            );
          });
          if (filteredUsers.length) { //true if not 0
            // if login details are valid return user details and fake JSON Web Token
            let user = filteredUsers[0];
            let responseJson = {
              id: user.id,
              username: user.username,
              token: "fake-jwt-token"
            };
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(responseJson))
            });
          } else {
            reject("Username or password is incorrect");
          }
          return;
        }

        //GET USER BY ID
        if (url.match(/\/users\/\d+$/) && opts.method === "GET") {
          // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
          if (
            opts.headers &&
            opts.headers.Authorization === "fake-jwt-token"
          ) {
            // find user by id in users array
            let urlParts = url.split("/");
            let id = parseInt(urlParts[urlParts.length - 1]);
            let matchedUsers = users.filter(user => {
              return user.id === id;
            });
            let user = matchedUsers.length ? matchedUsers[0] : null;

            // respond 200 OK with user
            resolve({ ok: true, text: () => JSON.stringify(user) });
          } else {
            // return 401 not authorised if token is null or invalid
            reject("Unauthorised");
          }

          return;
        }

        //REGISTER USER
        if (url.endsWith("/users/register") && opts.method === "POST") {
          // get new user object from post body
          let newUser = JSON.parse(opts.body);

          // validation
          let checkUserExists = users.filter(user => {
            return user.username === newUser.username;
          }).length;
          if (checkUserExists) {
            reject('Username "' + newUser.username + '" is already taken');
            return;
          }

          // save new user
          newUser.id = users.length
            ? Math.max(...users.map(user => user.id)) + 1 //find the highest id and add
            : 1;
          users.push(newUser);
          localStorage.setItem("users", JSON.stringify(users));

          // respond 200 OK
          resolve({ ok: true, text: () => Promise.resolve() });

          return;
        }

        // pass through any requests not handled above
        realFetch(url, opts).then(response => resolve(response));
      }, 500);
    });
  };
}
