const { src, dest } = require("gulp");
//конфигурация
const path = require("../config/path.js")
const app = require("../config/app.js")

const data = () => { 
   return src('./src/data/**')
   .pipe(dest('./public/data/'))
}

module.exports = data;