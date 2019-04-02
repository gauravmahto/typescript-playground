/*
 * Copyright 2019 - Author gauravm.git@gmail.com
 */

const gulp = require('gulp');
const { createProject } = require('gulp-typescript');

function buildTS() {

  return gulp.src('src/**/*.ts')
    .pipe(createProject('tsconfig.json', {
      incremental: true,
      tsBuildInfoFile: './test.tsbuildinfo'
    })())
    .pipe(gulp.dest('dist'));

}

module.exports.default = buildTS;
