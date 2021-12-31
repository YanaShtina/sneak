const isProd = process.argv.includes("--production");
const isDev = !isProd

module.exports = {
   isProd: isProd,
   isDev : isDev ,

      htmlmin: {
         collapseWhitespace: true, // принимает объект с настройками, можно найти на странице плагина
      },
      
      webpack: {
            mode: isProd ? "production" : "development", // еще есть prodaction - код будет минифицирован на проде
   },
   imgMin: {
      verbose: true, // еще есть prodaction - код будет минифицирован на проде
   },
   fonter:{
      formats: ["ttf", "woff", "eot", "svg"]
   }
}