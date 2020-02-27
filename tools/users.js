const program = require("commander");
const admin = require("firebase-admin");
const inquirer = require("inquirer");
const Table = require("cli-table");

const package = require("../package");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: package.config.firebase.databaseUrl
});

const auth = admin.auth();

program.name("users");

deleteAllUsers = (initial, nextPageToken) => {
  if (initial) {
    console.log("Starting user deletion process, this could take a while.");
  }

  if (nextPageToken) {
    console.log(`Processing batch ${nextPageToken}`);
  }

  auth
    .listUsers(1000, nextPageToken)
    .then(value => {
      if (!value) {
        console.log("The list value is not valid.");
        process.exit(1);
      }

      const users = value.users;

      if (!users || !users.length) {
        console.log("There are no users.");
        process.exit(1);
      }

      users.forEach(user => {
        if (!user) {
          console.log("The user is invalid.");

          return;
        }

        const uid = user.uid;

        if (!uid) {
          console.log("The user doesn’t have a UID.");

          return;
        }

        auth
          .deleteUser(uid)
          .then(() => {
            console.log(`Deleted user ${uid}`);
          })
          .catch(reason => {
            console.log(reason.message);
          });
      });

      if (value.nextPageToken) {
        setTimeout(deleteAllUsers, 2000, false, nextPageToken);
      } else if (!initial) {
        console.log("Deleted all users");
        process.exit(0);
      }
    })
    .catch(reason => {
      console.log(reason.message);
      process.exit(1);
    });
};

program
  .command("list [max-results] [next-page-token]")
  .alias("get")
  .description("lists users in a range")
  .action((maxResults, nextPageToken) => {
    if (maxResults) {
      maxResults = parseInt(maxResults);
    }

    auth
      .listUsers(maxResults, nextPageToken)
      .then(value => {
        if (!value) {
          console.log("The list value is not valid.");
          process.exit(1);
        }

        const users = value.users;

        if (!users || !users.length) {
          console.log("There are no users.");
          process.exit(1);
        }

        const table = new Table({
          head: [
            "uid",
            "email",
            "emailVerified",
            "displayName",
            "photoURL",
            "disabled"
          ]
        });

        users.forEach(user => {
          const uid = user.uid || "N/A";
          const email = user.email || "N/A";
          const emailVerified = user.emailVerified;
          const displayName = user.displayName || "N/A";
          const photoURL = user.photoURL || "N/A";
          const disabled = user.disabled;

          table.push([
            uid,
            email,
            emailVerified,
            displayName,
            photoURL,
            disabled
          ]);
        });

        console.log(table.toString());
        process.exit(0);
      })
      .catch(reason => {
        console.log(reason.message);
        process.exit(1);
      });
  });

program
  .command("delete")
  .alias("purge")
  .description(
    "deletes all users, this action is irreversible, it will delete all users"
  )
  .action(() => {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "delete",
          message: "Delete all users?",
          default: false
        }
      ])
      .then(value => {
        if (!value) {
          console.log("The answer is not valid.");
          process.exit(1);
        }

        if (!value.delete) {
          process.exit(1);
        }

        deleteAllUsers(true);
      });
  });

program.parse(process.argv);
