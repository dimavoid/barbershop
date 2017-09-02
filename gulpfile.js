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
  gulp.src("sass/style.scss") // читает контент лежащий в файле style.sass
  .pipe(plumber()) // запрещает ошибкам останавливать ход исполнения команды
  .pipe(sass()) // компиляция в css
  .pipe(postcss([
    autoprefixer({browsers: [ // автопрефиксер
      "last 1 version",
      "last 2 Chrome versions",
      "last 2 Firefox versions",
      "last 2 Opera versions",
      "last 2 Edge versions"
    ]}),
    mqpacker({ // объединение медиавыражений
      sort: true
    })
  ]))
  .pipe(gulp.dest("css"))  // кладет скомпилированный код из sass в папку css
  .pipe(minify()) // минифицируем css
  .pipe(rename("style-min.css")) // переименовываем в style.min.css
  .pipe(gulp.dest("css")) // кладет минифицированный css
  .pipe(server.reload({stream:true}));
});

gulp.task("images", function() {
  return gulp.src("img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}), // выбираем уровень оптимизации png
    imagemin.jpegtran({progressive: true}) // меняем способ загрузки jpg изображений с построчного на попиксельный
  ]))
  .pipe(gulp.dest("dist/img"));
});

gulp.task("symbols", function() {
  return gulp.src("img/icons/*.svg")
  .pipe(svgmin())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename("symbols.svg"))
  .pipe(gulp.dest("dist/img"));
});

gulp.task("copy", function() { // запускаем копирование в продакшен папку
  return gulp.src ([
    "fonts/**/*.{woff,woff2}",
    "js/**",
    "css/**",
    "*.html"
  ], {
    base: "."
  })
   .pipe(gulp.dest("dist"));
});

gulp.task("clean", function() {
  return del("dist/**/*");
});

gulp.task("serve", ["style"], function() { // выводим верстку в браузер, но перед этим запускается [style]
  server.init({
    server:"."
  });
  gulp.watch("sass/**/*.scss", ["style"]); // следит за изменениями во всех файлах *.scss в папке sass
  gulp.watch ("*.html") // следит за изменениями в html
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
