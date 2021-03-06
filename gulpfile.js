'use strict'

const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpTs = require('gulp-typescript');
const gulpTslint = require('gulp-tslint');
const sourcemaps = require('gulp-sourcemaps');
const tslint = require('tslint');
const del = require('del');
const path = require('path');
const merge = require('merge2');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const nodeExternals = require('webpack-node-externals');

const appProject = gulpTs.createProject('tsconfig.json');
const typeCheck = tslint.Linter.createProgram('tsconfig.json');

gulp.task('lint', () => {
	return gulp.src(['./src/**/*.ts', './app/**/*.ts'])
		.pipe(gulpTslint({
			configuration: 'tslint.json',
			formatter: 'prose',
			program: typeCheck
		}))
		.pipe(gulpTslint.report());
})

gulp.task('build', () => {
	del.sync(['./build/**/*.*']);
	gulp.src('./src/**/*.js')
		.pipe(gulp.dest('build/'));
	gulp.src('./src/**/*.json')
		.pipe(gulp.dest('build/'));
	gulp.src('./src/**/*.png')
		.pipe(gulp.dest('build/'));
	gulp.src('./src/**/*.ttf')
		.pipe(gulp.dest('build/'));
	gulp.src(['./app/**/*.*', '!./app/**/*.ts'])
		.pipe(gulp.dest('build/app/'));
	
	const appCompile = gulp.src('./src/**/*.ts')
		.pipe(sourcemaps.init())
		.pipe(appProject());

	const externals = [];
	if (!gutil.env.web) {
		externals.push(nodeExternals());
	}
	
	const renderCompile = gulp.src('./app/index.ts')
    	.pipe(gulpWebpack({
			mode: 'development',
			module: {
				rules: [
					{
						loader: 'ts-loader',
						exclude: [/node_modules/, /src/]
					},
				]
			},
			resolve: {
				modules: ['node_modules', 'app'],
				extensions: ['.tsx', '.ts', '.js']
			},
			output: {
				filename: 'app.js'
			},
			externals: externals,
			target: gutil.env.web ? 'web' : 'electron-renderer',
			devtool: 'inline-source-map'
		}, webpack))

	return merge([
		appCompile.js
			.pipe(sourcemaps.write({
				sourceRoot: file => {
					return path.relative(path.join(file.cwd, file.path), file.base);
				}
			}))
			.pipe(gulp.dest('build/')),
		renderCompile
			.pipe(gulp.dest('build/app/'))
	]);
});