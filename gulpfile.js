/*
  first we load in gulp
*/
var gulp = require('gulp');

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var p = require('gulp-load-plugins')();


gulp.task('styles',function() {
  gulp.src('../../developer.redhat.com/stylesheets/app.scss')
    .pipe(p.plumber({errorHandler: p.notify.onError('Error: <%= error.message %>')}))
    .pipe(p.sass())
    .pipe(p.replace(/cdn\(/g, 'url(')) // replace cdn( with url( for local dev
    .pipe(gulp.dest('../_site/stylesheets/'))
    .pipe(reload({stream:true}))
    .pipe(p.notify({
      title : 'Sass Generated',
      sound : false
    }))
});

// Start the server
gulp.task('browser-sync', function() {
    browserSync({
        proxy : 'localhost:4242'
        // rewriteRules: [{
        //     match: /\:4242/g,
        //     fn: function (match, what) {
        //         return ':3000';
        //     }
        // },{
        //     match: /cdn/g,
        //     fn: function (match) {
        //         return 'url';
        //     }
        // }, {
        //   match : /localhost/g,
        //   fn : function(match) {
        //     return "192.168.2.17";
        //   }
        // }
        // ]
    });
});

gulp.task('font',function() {
  gulp.src("./icon-font/*.svg")
  .pipe(p.fontcustom({
    font_name: 'rh-icons'
  }))
  .pipe(gulp.dest("./results"))
});

gulp.task('default', ['browser-sync'] ,function() {
  gulp.watch('../stylesheets/*.scss',['styles']);
});
