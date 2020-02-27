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

program.name("user");
program.version("0.1.0");

// Options
program.option("-e, --email", "use email instead of uid");

// Commands
program
  .command("create")
  .description("creates a user")
  .action(() => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "uid"
        },
        {
          type: "input",
          name: "email"
        },
        {
          type: "confirm",
          name: "emailVerified",
          default: false
        },
        {
          type: "input",
          name: "password"
        },
        {
          type: "input",
          name: "displayName"
        },
        {
          type: "input",
          name: "photoURL"
        },
        {
          type: "confirm",
          name: "disabled",
          default: false
        }
      ])
      .then(value => {
        if (!value) {
          console.log("The user is not valid.");
          process.exit(1);
        }

        const table = new Table();
        const user = value;

        table.push(
          { uid: user.uid || "N/A" },
          { email: user.email || "N/A" },
          { emailVerified: user.emailVerified },
          { password: user.password || "N/A" },
          { displayName: user.displayName || "N/A" },
          { photoURL: user.photoURL || "N/A" },
          { disabled: user.disabled }
        );

        console.log(table.toString());

        inquirer
          .prompt([
            {
              type: "confirm",
              name: "correct"
            }
          ])
          .then(value => {
            if (!value) {
              console.log("The answer is not valid.");
              process.exit(1);
            }

            if (!value.correct) {
              process.exit(1);
            }

            auth
              .createUser({
                uid: user.uid || undefined,
                email: user.email || undefined,
                emailVerified: user.emailVerified,
                password: user.password || undefined,
                displayName: user.displayName || undefined,
                photoURL: user.photoURL || undefined,
                disabled: user.disabled
              })
              .then(() => {
                console.log("Created user");
                process.exit(0);
              })
              .catch(reason => {
                console.log(reason.message);
                process.exit(1);
              });
          });
      });
  });

program
  .command("get <uid>")
  .description("gets data from a user")
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(value => {
          if (!value) {
            console.log("The user doesn’t have any data.");
            process.exit(1);
          }

          const table = new Table();

          table.push(
            { uid: value.uid || "N/A" },
            { email: value.email || "N/A" },
            { emailVerified: value.emailVerified },
            { displayName: value.displayName || "N/A" },
            { photoURL: value.photoURL || "N/A" },
            { disabled: value.disabled }
          );

          console.log(table.toString());
          process.exit(0);
        })
        .catch(reason => {
          console.log(reason.message);
          process.exit(1);
        });

      return;
    }

    auth
      .getUser(uid)
      .then(value => {
        if (!value) {
          console.log("The user doesn’t have any data.");
          process.exit(1);
        }
        const table = new Table();

        table.push(
          { uid: value.uid || "N/A" },
          { email: value.email || "N/A" },
          { emailVerified: value.emailVerified },
          { displayName: value.displayName || "N/A" },
          { photoURL: value.photoURL || "N/A" },
          { disabled: value.disabled }
        );

        console.log(table.toString());
        process.exit(0);
      })
      .catch(reason => {
        console.log(reason.message);
        process.exit(1);
      });
  });

program
  .command("update <uid>")
  .description("updates a user")
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(value => {
          if (!value) {
            console.log("The user doesn’t have any data.");
            process.exit(1);
          }

          const table = new Table();

          table.push(
            { uid: value.uid || "N/A" },
            { email: value.email || "N/A" },
            { emailVerified: value.emailVerified },
            { displayName: value.displayName || "N/A" },
            { photoURL: value.photoURL || "N/A" },
            { disabled: value.disabled }
          );

          console.log(table.toString());
          process.exit(0);
        })
        .catch(reason => {
          console.log(reason.message);
          process.exit(1);
        });

      return;
    }

    auth
      .getUser(uid)
      .then(currentUser => {
        if (!currentUser) {
          console.log("The user doesn’t have any data.");
          process.exit(1);
        }

        inquirer
          .prompt([
            {
              type: "input",
              name: "email",
              default: currentUser.email
            },
            {
              type: "confirm",
              name: "emailVerified",
              default: currentUser.emailVerified
            },
            {
              type: "input",
              name: "displayName",
              default: currentUser.displayName
            },
            {
              type: "input",
              name: "photoURL",
              default: currentUser.photoURL
            },
            {
              type: "confirm",
              name: "disabled",
              default: currentUser.disabled
            }
          ])
          .then(newUser => {
            if (!newUser) {
              console.log("The user is not valid.");
              process.exit(1);
            }

            const email = newUser.email || undefined;
            const emailVerified = newUser.emailVerified;
            const displayName = newUser.displayName || undefined;
            const photoURL = newUser.photoURL || undefined;
            const disabled = newUser.disabled;

            if (
              currentUser.email === email &&
              currentUser.emailVerified === emailVerified &&
              currentUser.displayName === displayName &&
              currentUser.photoURL === photoURL &&
              currentUser.disabled === disabled
            ) {
              console.log("Nothing changed.");
              process.exit(1);
            }

            const table = new Table({
              head: ["Key", "Current Value", "New Value"]
            });

            table.push(
              ["email", currentUser.email || "N/A", email || "N/A"],
              ["emailVerified", currentUser.emailVerified, emailVerified],
              [
                "displayName",
                currentUser.displayName || "N/A",
                displayName || "N/A"
              ],
              ["photoURL", currentUser.photoURL || "N/A", photoURL || "N/A"],
              ["disabled", currentUser.disabled, disabled]
            );

            console.log(table.toString());

            inquirer
              .prompt([
                {
                  type: "confirm",
                  name: "update"
                }
              ])
              .then(value => {
                if (!value) {
                  console.log("The answer is not valid.");
                  process.exit(1);
                }

                if (!value.update) {
                  process.exit(1);
                }

                auth
                  .updateUser(uid, {
                    email: email,
                    emailVerified: emailVerified,
                    displayName: displayName,
                    photoURL: photoURL,
                    disabled: disabled
                  })
                  .then(() => {
                    console.log("Updated user");
                    process.exit(0);
                  })
                  .catch(reason => {
                    console.log(reason.message);
                    process.exit(1);
                  });
              });
          });
      })
      .catch(reason => {
        console.log(reason.message);
        process.exit(1);
      });
  });

program
  .command("unban <uid>")
  .description("unbans a user")
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(value => {
          if (!value) {
            console.log("The user doesn’t have any data.");
            process.exit(1);
          }

          const uid = value.uid;

          if (!uid) {
            console.log("The user doesn’t have a UID.");
            process.exit(1);
          }

          auth
            .updateUser(uid, { disabled: false })
            .then(() => {
              console.log("Unbanned user");
              process.exit(0);
            })
            .catch(reason => {
              console.log(reason.message);
              process.exit(1);
            });
        })
        .catch(reason => {
          console.log(reason.message);
          process.exit(1);
        });

      return;
    }

    auth
      .updateUser(uid, { disabled: false })
      .then(() => {
        console.log("Unbanned user");
        process.exit(0);
      })
      .catch(reason => {
        console.log(reason.message);
        process.exit(1);
      });
  });

program
  .command("ban <uid>")
  .description("bans a user")
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(value => {
          if (!value) {
            console.log("The user doesn’t have any data.");
            process.exit(1);
          }

          const uid = value.uid;

          if (!uid) {
            console.log("The user doesn’t have a UID.");
            process.exit(1);
          }

          auth
            .updateUser(uid, { disabled: true })
            .then(() => {
              console.log("Banned user");
              process.exit(0);
            })
            .catch(reason => {
              console.log(reason.message);
              process.exit(1);
            });
        })
        .catch(reason => {
          console.log(reason.message);
          process.exit(1);
        });

      return;
    }

    auth
      .updateUser(uid, { disabled: true })
      .then(() => {
        console.log("Banned user");
        process.exit(0);
      })
      .catch(reason => {
        console.log(reason.message);
        process.exit(1);
      });
  });

program
  .command("delete <uid>")
  .description("deletes a user")
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(value => {
          if (!value) {
            console.log("The user doesn’t have any data.");
            process.exit(1);
          }

          const uid = value.uid;

          if (!uid) {
            console.log("The user doesn’t have a UID.");
            process.exit(1);
          }

          auth
            .deleteUser(uid)
            .then(() => {
              console.log("Deleted user");
              process.exit(0);
            })
            .catch(reason => {
              console.log(reason.message);
              process.exit(1);
            });
        })
        .catch(reason => {
          console.log(reason.message);
          process.exit(1);
        });

      return;
    }

    auth
      .deleteUser(uid)
      .then(() => {
        console.log("Deleted user");
        process.exit(0);
      })
      .catch(reason => {
        console.log(reason.message);
        process.exit(1);
      });
  });

program.parse(process.argv);
