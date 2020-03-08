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

program.name("user");

program.option(
  "-e, --email",
  "uses an e-mail address instead of a uid, i.e. replaces <uid> with <email>"
);

program
  .command("create")
  .alias("add")
  .description("prompts a wizard to create a user")
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
          console.log("No value.");
          process.exit(1);
        }

        const table = new Table();
        const user = value;

        table.push(
          { uid: user.uid || "" },
          { email: user.email || "" },
          { emailVerified: user.emailVerified },
          { password: user.password || "" },
          { displayName: user.displayName || "" },
          { photoURL: user.photoURL || "" },
          { disabled: user.disabled }
        );

        console.log(table.toString());

        inquirer
          .prompt([
            {
              type: "confirm",
              name: "create"
            }
          ])
          .then(value => {
            if (!value) {
              console.log("No value.");
              process.exit(1);
            }

            if (!value.create) {
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
  .alias("read")
  .description(
    "retreives data from a user, e.g. their e-mail address and display name"
  )
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(value => {
          if (!value) {
            console.log("No value.");
            process.exit(1);
          }

          const table = new Table();

          table.push(
            { uid: value.uid || "" },
            { email: value.email || "" },
            { emailVerified: value.emailVerified },
            { displayName: value.displayName || "" },
            { photoURL: value.photoURL || "" },
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
          console.log("No value.");
          process.exit(1);
        }

        const table = new Table();

        table.push(
          { uid: value.uid || "" },
          { email: value.email || "" },
          { emailVerified: value.emailVerified },
          { displayName: value.displayName || "" },
          { photoURL: value.photoURL || "" },
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
  .alias("change")
  .description("runs a wizard to update an existing user")
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(currentUser => {
          if (!currentUser) {
            console.log("No value.");
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
                console.log("No value.");
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
                process.exit(1);
              }

              const table = new Table({
                head: ["Key", "Current Value", "New Value"]
              });

              table.push(
                ["email", currentUser.email || "", email || ""],
                ["emailVerified", currentUser.emailVerified, emailVerified],
                [
                  "displayName",
                  currentUser.displayName || "",
                  displayName || ""
                ],
                ["photoURL", currentUser.photoURL || "", photoURL || ""],
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
                    console.log("No value.");
                    process.exit(1);
                  }

                  if (!value.update) {
                    process.exit(0);
                  }

                  auth
                    .updateUser(currentUser.uid, {
                      email: email,
                      emailVerified: emailVerified,
                      displayName: displayName,
                      photoURL: photoURL,
                      disabled: disabled
                    })
                    .then(() => {
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

      return;
    }

    auth
      .getUser(uid)
      .then(currentUser => {
        if (!currentUser) {
          console.log("No value.");
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
              console.log("No value.");
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
              process.exit(0);
            }

            const table = new Table({
              head: ["Key", "Current Value", "New Value"]
            });

            table.push(
              ["email", currentUser.email || "", email || ""],
              ["emailVerified", currentUser.emailVerified, emailVerified],
              ["displayName", currentUser.displayName || "", displayName || ""],
              ["photoURL", currentUser.photoURL || "", photoURL || ""],
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
                  console.log("No value.");
                  process.exit(1);
                }

                if (!value.update) {
                  process.exit(0);
                }

                auth
                  .updateUser(currentUser.uid, {
                    email: email,
                    emailVerified: emailVerified,
                    displayName: displayName,
                    photoURL: photoURL,
                    disabled: disabled
                  })
                  .then(() => {
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
  .alias("enable")
  .description("unbans a user, allowing them access to the app")
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(value => {
          if (!value) {
            console.log("No value.");
            process.exit(1);
          }

          const uid = value.uid;

          if (!uid) {
            console.log("No user ID.");
            process.exit(1);
          }

          auth
            .updateUser(uid, { disabled: false })
            .then(() => {
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
        process.exit(0);
      })
      .catch(reason => {
        console.log(reason.message);
        process.exit(1);
      });
  });

program
  .command("ban <uid>")
  .alias("disable")
  .description("bans a user, restricts their access to the app")
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(value => {
          if (!value) {
            console.log("No value.");
            process.exit(1);
          }

          const uid = value.uid;

          if (!uid) {
            console.log("No user ID.");
            process.exit(1);
          }

          auth
            .updateUser(uid, { disabled: true })
            .then(() => {
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
        process.exit(0);
      })
      .catch(reason => {
        console.log(reason.message);
        process.exit(1);
      });
  });

program
  .command("delete <uid>")
  .alias("remove")
  .description("deletes a user, this command is irreversible")
  .action(uid => {
    if (program.email) {
      const email = uid;

      auth
        .getUserByEmail(email)
        .then(value => {
          if (!value) {
            console.log("No value.");
            process.exit(1);
          }

          const uid = value.uid;

          if (!uid) {
            console.log("No user ID.");
            process.exit(1);
          }

          auth
            .deleteUser(uid)
            .then(() => {
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
        process.exit(0);
      })
      .catch(reason => {
        console.log(reason.message);
        process.exit(1);
      });
  });

program.parse(process.argv);
