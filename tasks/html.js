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
   return src(path.html.src) // обеспечивает поток содержимого файла до конечной папки
      // маски - можем управлять какие файлы брать в обработку, а какие нет. В нашем примере берем все html файлы в директории src

   // плагины
   .pipe(plumber({
      errorHandler: notify.onError(error => (
         {
            title: 'HTML',
            message: error.message
            }
         ))
   })) // добавляем в самом начале потока, будет перехватывать все ошибки
   .pipe(fileInclude()) // просто вызываем. Сначала поток пройдет через все плагины
   .pipe(imgWebPHtml())
   .pipe(size({ title: "До сжатия" }))
   .pipe(htmlmin(gulpIf(app.isProd,app.htmlmin)))
   .pipe(size({ title: "После сжатия" }))
   .pipe(dest(path.html.dest)) // конечная папка. В самом конце
  
}

module.exports = html;