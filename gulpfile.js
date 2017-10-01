const gulp = require('gulp');
var watch = require('gulp-watch'); //Verificar alterações. 
var cssmin = require("gulp-cssmin");//minifica o css
var concat = require("gulp-concat");//agrupa todos os arquivos
var stripCssComments = require('gulp-strip-css-comments');//remove comentarios. 
const sass 		= require("gulp-sass");
const notify 	= require("gulp-notify");

var arquivos = ['./source/scss/style.scss'];
//tarefa para minimizar, agrupar aqrquivos e remover comentarios:


gulp.task("sass", function(){
	return gulp.src(arquivos)
				.pipe(sass())
				.on("error", notify.onError({title:"erro ao compilar", message:"<%= error.message %>"}))
				.pipe(gulp.dest("./dist/css/"))
});


gulp.task('minimizar-css', function() {
	gulp.src(['dist/css/style.css'])
	.pipe(concat('style.min.css')) //Aqui junto todos os arquivos em um novo, no caso, style.min.css
	.pipe(stripCssComments({all: true})) // Tirando Todos os comentarios
	.pipe(cssmin()) // Minimizando
	.pipe(gulp.dest('./dist/css/'));
});

//criando tarefa watch

gulp.task("sass:watch", function(){
	gulp.watch("./source/scss/**/*.scss", ['sass', 'minimizar-css']);
});

gulp.task("default",['sass', 'minimizar-css', 'sass:watch']);