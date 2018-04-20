const gulp = require('gulp');
const ts = require('gulp-typescript');

gulp.task('tsc', function () {
	const typescriptOpt = {
		sourceMap: false,
		noImplicitAny: false,
		module: "commonjs",
		declaration: false,
		removeComments: true,
		moduleResolution: "node",
		emitDecoratorMetadata: true,
		experimentalDecorators: true,
		target: "es5",
		typeRoots: ["node_modules/@types"],
		lib: ["es2016", "dom"]
	};

	const srcOpt = {
		'base': './'
	};

	return gulp.src(['./services/**/*.ts', '*.ts'], srcOpt)
            .pipe(ts(typescriptOpt))
            .js.pipe(gulp.dest('./'));
});