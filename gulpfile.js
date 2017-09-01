var gulp = require("gulp");
var rename = require("gulp-rename");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var minify = require("gulp-csso");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var mqpacker = require("css-mqpacker");
var svgstore = require("gulp-svgstore");
var svgmin = require("gulp-svgmin");
var imagemin = require("gulp-imagemin");
var server = require("browser-sync");
var run = require("run-sequence");
var del = require("del");


gulp.task("style", function() {
  gulp.src("dev/sass/style.scss")
  .pipe(plumber())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer({browsers: [
      "last 1 version",
      "last 2 Chrome versions",
      "last 2 Firefox versions",
      "last 2 Opera versions",
      "last 2 Edge versions"
    ]}),
    mqpacker({
      sort: true
    })
  ]))
  .pipe(gulp.dest("dev/css"))
  .pipe(minify())
  .pipe(rename("style-min.css"))
  .pipe(gulp.dest("dev/css"))
  .pipe(server.reload({stream:true}));
});

gulp.task("images", function() {
  return gulp.src("dev/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true})
  ]))
  .pipe(gulp.dest("dist/img"));
});

gulp.task("symbols", function() {
  return gulp.src("dev/img/icons/*.svg")
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("symbols.svg"))
  .pipe(gulp.dest("dist/img"));
});

gulp.task("copy", function() {
  return gulp.src ([
    "dev/fonts/**/*.{woff,woff2}",
    "dev/js/**",
    "dev/css/**",
    "dev/*.html"
  ], {
    base: "dev"
  })
   .pipe(gulp.dest("dist"));
});

gulp.task("clean", function() {
  return del("dist/**/*");
});

gulp.task("serve", ["style"], function() {
  server.init({
    server:"dev"
  });
  gulp.watch("dev/sass/**/*.scss", ["style"]);
  gulp.watch ("dev/*.html")
    .on("change", server.reload);
});

gulp.task("build", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "images",
    "symbols",
    fn
  );
});
