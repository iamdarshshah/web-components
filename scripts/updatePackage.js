#!/usr/bin/env node
const path = require('path');
const jsonfile = require('jsonfile');

const repo = process.argv[2] || process.exit(1);

const dir = path.join(process.cwd(), 'packages', repo);
const packageJson = require(path.resolve(dir, 'package.json'));

// Cleanup package.json
delete packageJson.scripts;
delete packageJson.husky;
delete packageJson['lint-staged'];

[
  '@open-wc/rollup-plugin-html',
  '@polymer/iron-component-page',
  '@rollup/plugin-node-resolve',
  '@web/dev-server',
  '@web/test-runner',
  '@web/test-runner-saucelabs',
  'eslint',
  'eslint-config-prettier',
  'eslint-plugin-prettier',
  'hermione',
  'hermione-esm',
  'hermione-sauce',
  'husky',
  'lint-staged',
  'magi-cli',
  'prettier',
  'rimraf',
  'rollup',
  'rollup-plugin-terser',
  'stylelint',
  'stylelint-config-prettier',
  'stylelint-config-vaadin',
  'typescript'
].forEach((dep) => {
  delete packageJson.devDependencies[dep];
});

// TODO: remove after versions are unified.
[
  '@vaadin/vaadin-button',
  '@vaadin/vaadin-confirm-dialog',
  '@vaadin/vaadin-dialog',
  '@vaadin/vaadin-form-layout'
].forEach((dep) => {
  if (packageJson.dependencies[dep]) {
    packageJson.dependencies[dep] = '^3.0.0-alpha1';
  }
  if (packageJson.devDependencies[dep]) {
    packageJson.devDependencies[dep] = '^3.0.0-alpha1';
  }
});

['@vaadin/vaadin-progress-bar', '@vaadin/vaadin-ordered-layout', '@vaadin/vaadin-radio-button'].forEach((dep) => {
  if (packageJson.dependencies[dep]) {
    packageJson.dependencies[dep] = '^2.0.0-alpha1';
  }
  if (packageJson.devDependencies[dep]) {
    packageJson.devDependencies[dep] = '^2.0.0-alpha1';
  }
});

// Format and write changes to package.json
jsonfile.writeFileSync(`packages/${repo}/package.json`, packageJson, { spaces: 2 });
