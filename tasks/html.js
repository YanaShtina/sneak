const { src, dest } = require("gulp");
//конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")

//плагины
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const fileInclude = require("gulp-file-include")
const htmlmin = require("gulp-htmlmin")
const size = require("gulp-size")
const imgWebPHtml = require("gulp-webp-html")
const gulpIf = require("gulp-if")

const html = ()=> {
   return src(path.html.src) 
   .pipe(plumber({
      errorHandler: notify.onError(error => (
         {
            title: 'HTML',
            message: error.message
            }
         ))
   })) 
   .pipe(fileInclude()) 
   .pipe(imgWebPHtml())
   .pipe(size({ title: "До сжатия" }))
   .pipe(htmlmin(gulpIf(app.isProd,app.htmlmin)))
   .pipe(size({ title: "После сжатия" }))
   .pipe(dest(path.html.dest)) 
  
}

module.exports = html;