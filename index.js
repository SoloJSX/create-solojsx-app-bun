#!/usr/bin/env bun
import chalk from 'chalk';
import { execSync } from 'child_process';
import { join } from 'path';

const a2 = process.argv[2];
const a3 = process.argv[3];

let projectName = ".";
if (a2 != "-m")
    projectName = a2 || ".";

let version = (a2 == "-m" || a3 == "-m") ? "-minimal" : "";
const projectPath = join(process.cwd(), projectName);
try {
    if (projectName != ".")
        execSync(`mkdir ${projectName}`);
    process.chdir(projectPath);

    const repoName = "SoloJSX-template-ts" + version;
    const repo = "https://github.com/SoloJSX/" + repoName + ".git";
    execSync(`git clone ` + repo);
    execSync(`rsync -av --progress ` + repoName + `/ ${projectPath}/ --exclude '.git' --exclude 'package-lock.json' --exclude 'LICENSE'`);
    execSync(`rm -rf ` + repoName);
    execSync('bun i');
}
catch (err) {
    console.log(chalk.red("Directory", projectPath, "already exists, or something else went wrong. \N Error:", err));
    process.exit(1);
}
console.log(chalk.green("Project", chalk.green.bold(projectName), "created!"));
console.log(chalk.blue("Now run the following command" + ((projectName != ".") ? "s" : "") + ":"));
console.log(((projectName != ".") ? (`cd ${projectName}\n`) : "") + `npm run dev`);