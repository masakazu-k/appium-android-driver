"use strict";

const { exec } = require('teen_process');
const system = require('appium-support').system;
const gulp = require('gulp');
const boilerplate = require('appium-gulp-plugins').boilerplate.use(gulp);


const ANT_CMD = system.isWindows() ? 'ant.bat' : 'ant';

gulp.task('ant-clean', function () {
  return exec(ANT_CMD, ['clean'], {cwd: 'bootstrap'});
});

gulp.task('ant-build', function () {
  return exec(ANT_CMD, ['build'], {cwd: 'bootstrap'});
});

gulp.task('ant', gulp.series(['ant-clean', 'ant-build']), function () {});


boilerplate({
  build: 'appium-android-driver',
  extraPrepublishTasks: ['ant'],
  e2eTest: {android: true},
  testTimeout: 40000,
  coverage: {
    files: ['./test/unit/**/*-specs.js', '!./test/functional/**', '!./test/assets'],
    verbose: true
  },
});
