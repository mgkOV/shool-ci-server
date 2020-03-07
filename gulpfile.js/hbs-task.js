const gulp = require("gulp");
const hb = require("gulp-hb");
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");

const isProd = process.env.NODE_ENV === "production";
// const isDev = process.env.NODE_ENV === "development";

function hbs() {
  return gulp
    .src("./pages-tmpl/*.hbs")
    .pipe(
      hb()
        .partials("./common.blocks/**/*.hbs")
        .data("./common.blocks/**/*.json")
    )
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(
      rename(function(path) {
        path.extname = ".html";
      })
    )
    .pipe(gulp.dest(`./${isProd ? "" : "stub/"}build`));
}

module.exports = hbs;
