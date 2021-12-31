const { watch, series, parallel } = require("gulp");
const sync = require("browser-sync").create();
//series, parallel - для работы с очерелью задач

//конфигурация
const path = require("./config/path.js")
const app = require("./config/app.js")

// задачи и их обработка
const html = require('./tasks/html.js')
const clear = require('./tasks/clear.js');
const scss = require('./tasks/scss.js')
const js = require('./tasks/js.js')
const img = require('./tasks/img.js')
const font = require('./tasks/font.js')


// Вочер
// 2 параметра маску файлов, за которыми нужно следить + список задач, за которыми нужно сдедить
// в фононовом режиме следит, как только файлы были изменены с/с запускает задачу
const watcher = () => {
   watch(path.html.watch, html).on('all', sync.reload);
   watch(path.scss.watch, scss).on('all', sync.reload);
   watch(path.js.watch, js).on('all', sync.reload);
   watch(path.img.watch, img).on('all', sync.reload);
   watch(path.font.watch, font).on('all', sync.reload);
}

//сервер
const server = () => {
   sync.init({
      server: {
         baseDir: path.root// директория, где будет запускаться сервер
         // можно менять параметры локального сервера
      }
   })
}

const build = series(
   clear,
   parallel (html, scss, js, img, font),
)

const dev = series(
   build,
   parallel (watcher, server)
)

//задачи, экспортируем наружу
exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.font = font;
exports.watch = watcher; 
exports.clear = clear; 


//порядок задач для всей сборки
//exports.dev = dev; // запускаем сервер + наблюдения
//exports.build = build; // просто собираем файлы

exports.default = app.isProd ? build : dev


