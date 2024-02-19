#!/usr/bin/env bun
import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import { join } from 'path';

let projectName = process.argv[2];
projectName ??= ".";

const projectPath = join(process.cwd(), projectName);
try {
    execSync(`git clone https://github.com/eekelof/SoloJSX-template-ts.git ${projectPath}`);
    process.chdir(projectPath);

    const gitPath = join(projectPath, '.git');
    if (fs.existsSync(gitPath)) {
        fs.rmdirSync(gitPath, { recursive: true });
    }
    const packageLockPath = join(projectPath, 'package-lock.json');
    if (fs.existsSync(packageLockPath)) {
        fs.unlinkSync(packageLockPath);
    }

    execSync('bun i');
}
catch (err) {
    console.log(chalk.red("Directory", projectPath, "already exists, or something else went wrong.", err));
    process.exit(1);
}

console.log(chalk.green("Project", chalk.green.bold(projectName), "created!"));
console.log(chalk.blue("Now run the following command" + ((projectName != ".") ? "s" : "") + ":"));
if (projectName != ".")
    console.log(`cd ${projectName}`);
console.log(`bun dev`);
