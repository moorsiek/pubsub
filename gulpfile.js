var g = gulp = require('gulp'),
	wrap = require('gulp-wrap-js'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	ghelp = require('gulp-showhelp'),
	del = require('del');

g.task('help', function(){
	ghelp.show();
}).help = 'show this help message';

g.task('default', ['build'])
	.help =  'Builds plugin from source';

g.task('clean', function(cb){
	del([
		'dist'
	], cb);
})
	.help = 'Removes built files';

g.task('build', ['clean'], function(){
	return g.src('src/*')
		.pipe(wrap('var pubsub = function(){%= body %}();'))
		.pipe(g.dest('dist'));
})
	.help =  'Builds plugin from source';

g.task('compress', ['build'], function(){
	return g.src('dist/pubsub.js')
		.pipe(uglify())
		.pipe(rename('pubsub.min.js'))
		.pipe(g.dest('dist'));
})
	.help =  'Builds plugin from and minimizes it with uglifyJS';
