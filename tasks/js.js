const { src, dest } = require("gulp");
//конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")

//плагины
const plumber = require("gulp-plumber")
const notify = require("gulp-notify")
const sourcemaps = require("gulp-sourcemaps")
const babel = require("gulp-babel")
// const uglify = require("gulp-uglify")  не нужен при использовании вебпака
const webpack = require("webpack-stream")

const js = ()=> {
   return src(path.js.src) 
   .pipe(sourcemaps.init())
   .pipe(plumber({
      errorHandler: notify.onError(error => (
         {
            title: 'js',
            message: error.message
            }
         ))
   })) // добавляем в самом начале потока, будет перехватывать все ошибки
      .pipe(babel())  
      .pipe(webpack( app.webpack))// сюда же можно передавать полную конфигурацию вебпака
      .pipe(sourcemaps.write())
      // .pipe(uglify()) - не нужен при использовании вебпака
   .pipe(dest(path.js.dest)) // конечная папка. В самом конце
  
}

module.exports = js;