const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const gulpif = require("gulp-if");
const concat = require("gulp-concat");
const src = require("gulp-bem-src");
const debug = require("gulp-debug");
const wrap = require("gulp-wrap");

const getDecl = require("../helpers/get-decl");

const isProd = process.env.NODE_ENV === "production";

const declConfig = {
  levels: {
    "common.blocks": {
      naming: {
        preset: "legacy"
      }
    }
  }
};

async function js() {
  const declaration = await getDecl(declConfig);

  src(
    ["common.blocks"],
    declaration,
    "js", // wished dependencies technology
    {
      skipResolvingDependencies: false, // false by default, set to true if you dont want to resolve deps
      techMap: {
        // use this to map internal techs to file techs
        js: ["js"]
      },
      config: {
        "common.blocks": { scheme: "nested" }
      }
    }
  )
    .pipe(concat("script.js"))
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(wrap("(function(){<%= contents %>})();"))
    .pipe(gulpif(isProd, uglify()))
    .on("error", console.error)
    .pipe(debug())
    .pipe(gulp.dest(`${isProd ? "./build" : "./hw-ci-server"}`));
}

module.exports = js;
