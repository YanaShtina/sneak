const { src, dest } = require("gulp");
//конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")

//плагины
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const imgMin = require("gulp-imagemin")
const imgNewer = require("gulp-newer")
const imgWebP = require("gulp-webp")
const imgWebPHtml = require("gulp-webp-html")
const gulpIf = require("gulp-if")


const img = ()=> {
   return src(path.img.src) 
   .pipe(plumber({
      errorHandler: notify.onError(error => (
         {
            title: 'js',
            message: error.message
            }
         ))
   })) 
      .pipe(imgNewer(path.img.dest)) 
      .pipe(imgWebP())
      .pipe(dest(path.img.dest))
      .pipe(src(path.img.src))
      .pipe(imgNewer(path.img.dest))
   .pipe(imgMin(app.imgMin))
   .pipe(dest(path.img.dest)) 
}

module.exports = img;