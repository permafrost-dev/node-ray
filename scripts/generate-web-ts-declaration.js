const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
//const pkg = require(`${basePath}/package.json`);

const pkg = () => require(`${basePath}/package.json`);
// ---
const basePath = `${__dirname}/..`;
const moduleName = 'web';
const npmDtsCommand = 'build:dts:web:gen';
const relativeTargetFile = `dist/${moduleName}.d.ts`;
const packageName = pkg().name;
// ---

function runScript() {
    const targetFile = `${basePath}/${relativeTargetFile}`;
    const fullModuleName = `${packageName}/${moduleName}`;

    execSync(`npm run ${npmDtsCommand}`, { cwd: basePath, encoding: 'utf-8', stdio: 'inherit' });

    const contents = readFileSync(targetFile, { encoding: 'utf-8' });
    const newContents = `declare module '${fullModuleName}' {\n${contents}\n}`;

    writeFileSync(targetFile, newContents, { encoding: 'utf-8' });
    
    console.log(`Generated typescript declaration for module '${fullModuleName}' in '${relativeTargetFile}'.`);
}

runScript();
