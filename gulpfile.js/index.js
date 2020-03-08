const gulp = require("gulp");
const browserSync = require("browser-sync").create("server");

const style = require("./style-task");
const hbs = require("./hbs-task");
const js = require("./js-task");

function watch() {
  browserSync.init({
    server: {
      baseDir: "./hw-ci-server"
    },
    port: 5000
  });

  gulp.watch("./common.blocks/**/*.scss", { ignoreInitial: false }, style);

  gulp
    .watch(
      ["./common.blocks/**/*.hbs", "./pages-tmpl/**/*.hbs", "./common.blocks/**/*.json"],
      { ignoreInitial: false },
      hbs
    )
    .on("change", browserSync.reload);

  gulp
    .watch(["./common.blocks/**/*.js"], { ignoreInitial: false }, js)
    .on("change", browserSync.reload);
}

module.exports = {
  build: gulp.series(style, js, hbs),
  watch
};
