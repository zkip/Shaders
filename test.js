const yargs = require("yargs");

const f = yargs
    .command("new <name>")
    .option("watch", { boolean: true })
    .parse();
console.log(f, "__");