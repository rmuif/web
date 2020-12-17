const fs = require("fs");
const prettier = require("prettier");

const updateDeps = () => {
  const package = JSON.parse(
    fs.readFileSync("./template/package.json", { encoding: "utf-8" })
  );

  const template = {
    package: {
      dependencies: package.dependencies,
      scripts: {
        start: "react-app-rewired start",
        analyze: "source-map-explorer 'build/static/js/*.js'",
      },
    },
  };

  fs.writeFileSync(
    "./template.json",
    prettier.format(JSON.stringify(template), { parser: "json" })
  );

  console.log("Replaced template packages");
};

const removeDevFiles = () => {
  fs.rmSync("./template/now.json", { force: true });
  fs.rmSync("./template/package.json", { force: true });
  fs.rmSync("./template/yarn.lock", { force: true });
  fs.rmSync("./template/node_modules", { force: true, recursive: true });

  console.log("Removed development files");
};

updateDeps();
removeDevFiles();
