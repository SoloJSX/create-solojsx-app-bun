#!/usr/bin/env bun
import chalk from 'chalk';
import { execSync } from 'child_process';
import { join } from 'path';

const projectName = process.argv[2] || ".";
const projectPath = join(process.cwd(), projectName);
try {
    execSync(`git clone https://github.com/eekelof/SoloJSX-template-ts.git`);
    execSync(`rsync -av --progress SoloJSX-template-ts/ ${projectPath}/ --exclude '.git' --exclude 'package-lock.json' --exclude 'LICENSE'`);
    execSync(`rm -rf SoloJSX-template-ts`);
    process.chdir(projectPath);
    execSync('bun i');
}
catch (err) {
    console.log(chalk.red("Directory", projectPath, "already exists, or something else went wrong. \N Error:", err));
    process.exit(1);
}

console.log(chalk.green("Project", chalk.green.bold(projectName), "created!"));
console.log(chalk.blue("Now run the following command" + ((projectName != ".") ? "s" : "") + ":"));
console.log(((projectName != ".") ? (`cd ${projectName}\n`) : "") + `bun run dev`);