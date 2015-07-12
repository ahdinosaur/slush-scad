/*
 * slush-scad
 * https://github.com/ahdinosaur/slush-scad
 *
 * Copyright (c) 2015, Michael Williams
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp')
var install = require('gulp-install')
var conflict = require('gulp-conflict')
var template = require('gulp-template')
var rename = require('gulp-rename')
var inquirer = require('inquirer')
var path = require('path')
var licenses = require('osi-licenses')
var userHome = require('user-home')
var userName = require('username')

function format (string) {
    var username = string.toLowerCase();
    return username.replace(/\s/g, '');
}

var defaults = (function () {
    var workingDirName = path.basename(process.cwd())
    var homeDir = userHome || ''
    var osUserName = userName.sync()
    var configFile = path.join(homeDir, '.gitconfig')

    configFile = path.join(homeDir, '.gitconfig');
    var user = {};

    if (require('fs').existsSync(configFile)) {
        user = require('iniparser').parseSync(configFile).user;
    }

    return {
        name: workingDirName,
        author: osUserName || format(user.name || ''),
    }
})()

gulp.task('default', function (done) {
    var prompts = [{
        name: 'name',
        message: 'What is the name of your project?',
        default: defaults.name
    }, {
        name: 'description',
        message: 'What is the description?'
    }, {
        name: 'version',
        message: 'What is the version of your project?',
        default: '1.0.0'
    }, {
        name: 'author',
        message: 'What is your name on GitHub?',
        default: defaults.author
    }, {
        type: 'list',
        name: 'license',
        message: 'Choose a license',
        choices: Object.keys(licenses),
        default: 'ISC'
    }, {
        type: 'confirm',
        name: 'moveon',
        message: 'Continue?'
    }]

    inquirer.prompt(prompts,
      function (answers) {
        if (!answers.moveon) {
            return done()
        }
        gulp.src(__dirname + '/templates/**')
          .pipe(template(answers))
          .pipe(rename(function (file) {
              if (file.basename[0] === '_') {
                  file.basename = '.' + file.basename.slice(1)
              }
          }))
          .pipe(conflict('./'))
          .pipe(gulp.dest('./'))
          .pipe(install())
          .on('end', function () {
              done()
          })
      })
})
