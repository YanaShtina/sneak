const { src, dest } = require("gulp");
//конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")

//плагины
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const sourcemaps = require("gulp-sourcemaps")
const autoprefixer = require("gulp-autoprefixer")
const csso = require("gulp-csso")
const rename = require("gulp-rename");
const size = require("gulp-size") 
const groupCssMedia = require("gulp-group-css-media-queries")
const sass = require("gulp-sass")(require("sass"))
const sassGlob = require("gulp-sass-glob") 
// const imgWebPCss = require("gulp-webp-css")
const gulpIf = require("gulp-if")
const cssimport = require("gulp-cssimport")


//
const scss = ()=> {
   return src(path.scss.src) 
   .pipe(gulpIf(app.isDev, sourcemaps.init() )) // gulpIf() - 1й парамертр условие, 2й параметр - плагин для данного уловия
      .pipe(plumber(
         // {errorHandler: notify.onError(error => ({
         //    title: 'CSS',
         //    message: error.message
         //    }
         // ))
         // }
      ))
   // добавляем в самом начале потока, будет перехватывать все ошибки
   
      .pipe(sassGlob())
      .pipe(sass())
      // .pipe(imgWebPCss())
      .pipe(autoprefixer())
      // .pipe(groupCssMedia())
      // .pipe(size({ title: "До сжатия css" }))
      .pipe(sourcemaps.write() )
       .pipe(cssimport())
     
      .pipe(dest(path.css.dest))
     
   //   .pipe(rename({ suffix: ".min"}))
   //    .pipe(csso())
   //    .pipe(size ({ title: "после сжатия css" }))
      .pipe(sourcemaps.write() )
   .pipe(dest(path.css.dest)) // конечная папка. В самом конце
  
}

module.exports = scss;