var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var connect = require("gulp-connect");

//convert sass to css
gulp.task("sass", function() {
  return gulp
    .src("./css/index.scss")
    .pipe(sass())
    .pipe(gulp.dest("./css"))
    .pipe(connect.reload());
});

// Watch
gulp.task("watch", function() {
  // Watch .scss files
  return gulp.watch("./css/index.scss", ["sass"]);
});

gulp.task("default", function() {
  gulp.start("sass", "watch");
});
