const gulp = require("gulp");
const debug = require("gulp-debug");
const concat = require("gulp-concat");
const sass = require("gulp-sass");
const gulpif = require("gulp-if");

const src = require("gulp-bem-src");

const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const browserSync = require("browser-sync").get("server");

const getDecl = require("../helpers/get-decl");

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";

const declConfig = {
  levels: {
    "common.blocks": {
      naming: {
        preset: "legacy"
      }
    }
  }
};

async function bundleStyle() {
  const modules = [autoprefixer()];

  if (isProd) {
    modules.push(cssnano());
  }

  const declaration = await getDecl(declConfig);

  src(
    ["common.blocks"],
    declaration,
    "styles", // wished dependencies technology
    {
      skipResolvingDependencies: false, // false by default, set to true if you dont want to resolve deps
      techMap: {
        // use this to map internal techs to file techs
        styles: ["scss", "css"]
      },
      config: {
        "common.blocks": { scheme: "nested" }
      }
    }
  )
    .pipe(sass().on("error", sass.logError))
    .pipe(concat(`style.css`))
    .pipe(postcss(modules))
    .on("error", console.error)
    .pipe(debug())
    .pipe(gulp.dest(`./${isProd ? "" : "stub/"}build`))
    .pipe(gulpif(isDev, browserSync.stream()));
}

module.exports = bundleStyle;
