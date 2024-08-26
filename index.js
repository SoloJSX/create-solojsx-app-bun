#!/usr/bin/env bun
import chalk from 'chalk';
import { execSync } from 'child_process';
import { join } from 'path';

const getRepo = (a) => {
    switch (a) {
        case "-m":
            return "SoloJSX-template-ts-minimal";
        case "-js":
            return "SoloJSX-template-js";
    }
    return "SoloJSX-template-ts";
}

const a2 = process.argv[2];
const a3 = process.argv[3];

const dirName = (!a2 || a2.startsWith("-")) ? "." : a2;
const repoName = getRepo((dirName == ".") ? a2 : a3);

const projectPath = join(process.cwd(), dirName);
try {
    if (dirName != ".")
        execSync(`mkdir ${dirName}`);
    process.chdir(projectPath);

    const repo = "https://github.com/SoloJSX/" + repoName + ".git";
    execSync(`git clone --quiet ` + repo);
    execSync(`rsync -av --progress ` + repoName + `/ ${projectPath}/ --exclude '.git' --exclude 'package-lock.json' --exclude 'LICENSE'`);
    execSync(`rm -rf ` + repoName);
    execSync('bun i');
}
catch (err) {
    console.log(chalk.red("Directory", projectPath, "already exists, or something else went wrong. \N Error:", err));
    process.exit(1);
}
console.log(chalk.green("Project", chalk.green.bold(dirName), "created!"));
console.log(chalk.blue("Now run the following command" + ((dirName != ".") ? "s" : "") + ":"));
console.log(((dirName != ".") ? (`cd ${dirName}\n`) : "") + `bun run dev`);