const program = require("commander");
const admin = require("firebase-admin");
const inquirer = require("inquirer");
const Table = require("cli-table");

require("dotenv").config();

const package = require("../package");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: package.config.firebase.databaseUrl
});

const auth = admin.auth();

program.name("users");

listAllUsers = nextPageToken => {
  auth
    .listUsers(1000, nextPageToken)
    .then(value => {
      if (!value) {
        console.log("No value.");
        process.exit(0);
      }

      const users = value.users;

      if (!users || !users.length) {
        console.log("No users.");
        process.exit(0);
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
        if (!user) {
          console.log("No user.");

          return;
        }

        const uid = user.uid || "";
        const email = user.email || "";
        const emailVerified = user.emailVerified;
        const displayName = user.displayName || "";
        const photoURL = user.photoURL || "";
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

      if (value.nextPageToken) {
        listAllUsers(value.nextPageToken);

        return;
      }

      process.exit(0);
    })
    .catch(reason => {
      console.log(reason.message);
      process.exit(1);
    });
};

deleteAllUsers = nextPageToken => {
  auth
    .listUsers(1000, nextPageToken)
    .then(value => {
      if (!value) {
        console.log("No value.");
        process.exit(0);
      }

      const users = value.users;

      if (!users || !users.length) {
        console.log("No users.");
        process.exit(0);
      }

      users.forEach(user => {
        if (!user) {
          console.log("No user.");

          return;
        }

        const uid = user.uid;

        if (!uid) {
          console.log("No user ID.");

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
        setTimeout(deleteAllUsers, 2000, value.nextPageToken);
      }
    })
    .catch(reason => {
      console.log(reason.message);
      process.exit(1);
    });
};

program
  .command("list")
  .alias("get")
  .description("lists all users")
  .action(() => {
    listAllUsers();
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
          console.log("No value.");
          process.exit(1);
        }

        if (!value.delete) {
          process.exit(0);
        }

        deleteAllUsers();
      });
  });

program.parse(process.argv);
