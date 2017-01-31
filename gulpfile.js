const gulp = require('gulp');
const exec = require('child_process').exec;
const nodemon   = require('gulp-nodemon');

gulp.task('envFile', function() { 
  exec('echo \"DEBUG=True\" > ./.env', function(err,stdout,stderr){
    console.log(stdout);
  });
});
// Run app.js with nodemon
gulp.task('dev', function () {
  nodemon({ script: 'app.js',
    ext: 'js' }).on('restart', () => {
      console.log('restarted!');
  });
});


// setup dev environment
  gulp.task('setup', ['envFile']);

// start dev environment
  gulp.task('start', ['dev']);
