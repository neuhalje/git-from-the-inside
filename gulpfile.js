 /*!
  * This file is automatically generated by tangling doc/BUILD.org
  *
  * git-from-the-inside 0.0.1
  *
  * https://github.com/neuhalje/git-from-the-inside
  * Licensed under CC-BY-SA-4.0
  *
  * Copyright (C) 2020 Jens Neuhalfen, https://neuhalfen.name/
 */

const pkg = require('./package.json')

const { series, parallel } = require('gulp')
const { src, dest } = require('gulp')
const { watch } = require('gulp');
const gulp = require('gulp');

const { rollup } = require('rollup')
const { terser } = require('rollup-plugin-terser')

const Vinyl = require('vinyl')

const path = require('path')
const { Readable, Writable } = require('stream');

const $ = {
    if : require('gulp-if'),
    newer : require('gulp-newer'),
    filter : require('gulp-filter'),
    rename : require('gulp-rename'),

    path : require('path'),
    glob : require('glob'),
    yargs : require('yargs'),
    colors : require('colors'),

    // Testing
    qunit : require('node-qunit-puppeteer'),

    babel : require('@rollup/plugin-babel').default,
    commonjs : require('@rollup/plugin-commonjs'),
    resolve : require('@rollup/plugin-node-resolve').default,

    tap : require('gulp-tap'),
    zip : require('gulp-zip'),
    sass : require('gulp-sass'),
    header : require('gulp-header'),
    eslint : require('gulp-eslint'),
    minify : require('gulp-clean-css'),
    connect : require('gulp-connect'),
    autoprefixer : require('gulp-autoprefixer'),
    merge : require('merge-stream'),
    child_process : require('child_process').exec,
    fs   : require('fs'),
    log   : require('fancy-log'),
    sourcemaps   : require('gulp-sourcemaps'),
    del : require('del'),
    favicons : require('favicons').stream
}

const banner = `/*!
 * ${pkg.name}  ${pkg.version}
 * ${pkg.homepage}
 * ${pkg.license}
 *
 * ${pkg.copyright} ${pkg.author.name}, ${pkg.author.web}
*/
`

process.setMaxListeners(20)

/*
 * Create a stream useable in =src=. The stream contains
 * one file named =filename= with the content =content=.
 */
function string_src(filename, content) {
  return new Readable({
    objectMode: true,
    read() {
        this.push(new Vinyl({
        cwd: '',
        base: null,
        path: filename,
        contents: Buffer.from(content)
        }))
        this.push(null)
    }
  })
}

/*
 * Scripts to get things from node_modules to build.
 */

function node_modules_reveal_js_to_build() {
  const dst = pkg.cfg.paths.build.js + 'reveal.js'
  $.log(`-> Copy reveal.js to ${dst}`)

  return src(["node_modules/reveal.js/**/*"])
        .pipe(dest(dst))

}

node_modules_reveal_js_to_build.displayName = "Reveal.js to build"
node_modules_reveal_js_to_build.description = `Copy reveal.js from node_modules to ${pkg.cfg.paths.build.base}.`

function node_modules_hpcc_js_to_build() {
  const dst = pkg.cfg.paths.build.js + '@hpcc-js/wasm/dist'
  $.log(`-> Copy @hpcc-js/wasm to ${dst}`)

  return src(["node_modules/@hpcc-js/wasm/dist/**/*"])
        .pipe(dest(dst))
}

node_modules_hpcc_js_to_build.displayName = "@hpcc-js/wasm to build"
node_modules_hpcc_js_to_build.description = "Copy @hpcc-js/wasm to build."

function node_modules_d3_to_build() {
  const dst = pkg.cfg.paths.build.js
  $.log(`-> Copy d3 to ${dst}`)

  return src(["node_modules/d3/dist/d3.min.js"])
        .pipe(dest(dst))
}
node_modules_d3_to_build.displayName = "d3 to build"
node_modules_d3_to_build.description = "Copy d3to build."

function node_modules_d3_graphviz_to_build() {
  const dst = pkg.cfg.paths.build.js
  $.log(`-> Copy d3-graphviz to ${dst}`)

  return src(["node_modules/d3-graphviz/build/d3-graphviz.js"])
        .pipe(dest(dst))
}
node_modules_d3_graphviz_to_build.displayName = "d3-graphviz to build"
node_modules_d3_graphviz_to_build.description = "Copy d3-graphviz to build."

function node_modules_d3_to_build_compose() {
  return parallel(node_modules_hpcc_js_to_build,
                  node_modules_d3_to_build,
                  node_modules_d3_graphviz_to_build)
}
node_modules_d3_to_build_compose.displayName = "d3 & tools to build"
node_modules_d3_to_build_compose.description = "Copy d3 & tools from node_modules to build."

function node_modules_mathjax_to_build() {
  $.log("-> Copy mathjaxto build.")

  return src(["node_modules/mathjax/es5/tex-chtml.js"])
        .pipe(dest(pkg.cfg.paths.build.js))
}
node_modules_mathjax_to_build.displayName = "mathjax to build"
node_modules_mathjax_to_build.description = "Copy mathjax from node_modules to build."

function node_modules_to_build_compose() {
  return parallel(node_modules_reveal_js_to_build,
                  node_modules_d3_to_build_compose(),
                  node_modules_mathjax_to_build)
}
node_modules_to_build_compose.displayName = "node_modules to build"
node_modules_to_build_compose.description = "Copy all libraries from node_modules to build."
// Enable for debugging: exports.node_modules_to_build = node_modules_to_build_compose()

/*
 * Scripts to get things from src to build.
 */

function src_root_to_build() {
  $.log(`-> Copy all files from ${pkg.cfg.paths.src.base} to ${pkg.cfg.paths.build.base}`)

  return src(pkg.cfg.paths.src.base + '*', { nodir: true }) // .cfg.paths.src.base := "./src/"
    .pipe(dest(pkg.cfg.paths.build.base))  // .cfg.paths.build.base := "./build/"
}
src_root_to_build.displayName = "Shallow copy base to build"
src_root_to_build.description = `Shallow copy  ${pkg.cfg.paths.src.base} to build.`

function src_img_to_build() {
  $.log(`-> Copy img from ${pkg.cfg.paths.src.img} to ${pkg.cfg.paths.build.img}`)

  return src(pkg.cfg.paths.src.img + '**/*.{png,jpg,jpeg,gif,svg}') // .cfg.paths.src.img := "./src/img/"
    .pipe(dest(pkg.cfg.paths.build.img))                            // .cfg.paths.build.img := "./build/img/"
}
src_img_to_build.displayName = "img to build"
src_img_to_build.description = `Copy ${pkg.cfg.paths.src.img} to build.`

function src_lint_js() {
  $.log(`-> Linting ${[pkg.cfg.paths.src.js + '**/*.js', 'gulpfile.js']}`)

  return src([pkg.cfg.paths.src.js + '**/*.js', 'gulpfile.js']) // .cfg.paths.src.js := "./src/js/"
        .pipe($.eslint())
        .pipe($.eslint.format())
}
src_lint_js.displayName = "Lint my JS"
src_lint_js.description = `Lint ${pkg.cfg.paths.src.js}.`

// Use a lambda bc. otherwise gulp would use the functions display name with spaces as target
exports.lint = () => src_lint_js()
exports.lint.description = src_lint_js.description


function src_copy_js_to_build() {
  return src(pkg.cfg.paths.src.js + '**/*.js') // .cfg.paths.src.js := "./src/js/"
    .pipe($.header(banner))
    .pipe(dest(pkg.cfg.paths.build.js))        // .cfg.paths.build.js := "./build/js/"
}
src_copy_js_to_build.displayName = "Copy JS to build"
src_copy_js_to_build.description = `Copy ${pkg.cfg.paths.src.js} to build and add banner.`

function src_js_to_build_compose() {
  return series(src_lint_js, src_copy_js_to_build)
}
src_js_to_build_compose.description = `Lint, copy and banner JS from ${pkg.cfg.paths.src.js} to build.`

function src_css_to_build() {
  return src(pkg.cfg.paths.src.css + '**/*.css') // .cfg.paths.src.css := "./src/css/"
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.autoprefixer())
        .pipe($.sourcemaps.write("./"))
        .pipe(dest(pkg.cfg.paths.build.css))     // .cfg.paths.build.css := "./build/css/"
}
src_css_to_build.displayName = "Transform css to build"
src_css_to_build.description = `Copy ${pkg.cfg.paths.src.css} to build, create sourcemaps and autoprefix.`

function src_scss_to_build() {
  return src(pkg.cfg.paths.src.scss + '**/*.scss') // .cfg.paths.src.scss := "./src/scss/"
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.sass({includePaths: pkg.cfg.paths.include.scssIncludePaths /* .cfg.paths.include.scssIncludePaths := [] */
            })
            .on("error", $.sass.logError))
        .pipe($.autoprefixer())
        .pipe($.sourcemaps.write("./"))
        .pipe(dest(pkg.cfg.paths.build.css))       // .cfg.paths.build.css := "./build/css/"
}
src_scss_to_build.displayName = "Transform scss to build"
src_scss_to_build.description = `Compile ${pkg.cfg.paths.src.scss} to build, create sourcemaps and autoprefix.`

exports.scss =() => src_scss_to_build()
exports.scss.description = src_scss_to_build.description

function src_to_build_compose() {
  return parallel(src_root_to_build,
                      src_img_to_build,
                      src_js_to_build_compose(),
                      src_css_to_build,
                      src_scss_to_build)
}
// exports.src_to_build = src_to_build_compose()
// exports.src_to_build.description = "Transform src to build"

function build_prepare_build_compose() {
    return parallel(node_modules_to_build_compose(),
                    src_to_build_compose())
}
exports.prepare_build = build_prepare_build_compose()
exports.prepare_build.description = `Prepare ${pkg.cfg.paths.build.base} with node_modules and  ${pkg.cfg.paths.src.base}.`

/*
 * Scripts to build things in build.
 */

function build_org_file_with_docker()
{
    const docker_image = pkg.cfg.vars.build_org_docker_local
    const build_dir = path.join(__dirname, pkg.cfg.paths.build.base)

    $.log(`-> Configured docker container: ${docker_image}. Sources from ${build_dir}`)
    const docker_cmd = `docker run --rm -v "${build_dir}":/tmp/build  "${docker_image}"  /root/convert-to-html.sh /tmp/build`

    $.log(docker_cmd)
    var exec = require('child_process').exec;

    return exec(docker_cmd, (err, stdout, stderr) =>
        {
            if (err) {
              $.log.error(stderr)
              throw new Error('kaboom: ' + err)
            }
        })
}
exports.build_org_file_with_docker = build_org_file_with_docker
exports.build_org_file_with_docker.displayName = "Transform index.org via Docker"
exports.build_org_file_with_docker.description = `Build index.org with "${pkg.cfg.vars.build_org_docker_local}" docker container.`

function build_gather_node_modules_licenses(cb) {
    const dst = pkg.cfg.paths.build.base
    const filename = pkg.cfg.vars.licenses
    $.log(`-> Gathering all (potentially distributed) licenes from node_modules to ${dst}${filename}`)

    const checker = require('license-checker')
    const treeify = require('treeify')

    checker.init({
        start: '.',
        production: true,
        development: false
    }, function(err, packages) {
        if (err) {
            cb(new Error('kaboom: ' + err));
        } else {
            string_src(filename,  treeify.asTree(packages, true))
                .pipe(dest(dst))
            cb()
        }
    })
}
// exports.node_licenses = build_gather_node_modules_licenses
build_gather_node_modules_licenses.displayName = "Gather licenses from node_modules"
build_gather_node_modules_licenses.description = `Gathering all (potentially distributed) licenes from node_modules to ${pkg.cfg.vars.licenses}`

function build_favicons() {
    const source = pkg.cfg.favicon.src

    const configuration = {
        appName: pkg.name,                            // Your application's name. `string`
        appShortName: null,                       // Your application's short_name. `string`. Optional. If not set, appName will be used
        appDescription: pkg.description,                     // Your application's description. `string`
        developerName: pkg.author.name,                      // Your (or your developer's) name. `string`
        developerURL: pkg.homepage,                       // Your (or your developer's) URL. `string`
        background: pkg.cfg.favicon.background,
        path: pkg.cfg.favicon.path,
        url: pkg.homepage,
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        version: 1.0,
        logging: false,
        html: "index.html",
        pipeHTML: false,
        replace: true,
        icons: {
            android: false,              // Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            appleIcon: false,            // Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            appleStartup: false,         // Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            coast: false,                // Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            favicons: true,             // Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            firefox: false,              // Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            windows: false,              // Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
            yandex: false                // Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources
        }
    }

  return src(source)
        .pipe($.favicons(configuration))
        .on("error", $.log)
        .pipe(dest(pkg.cfg.favicon.dest))
}

build_favicons.displayName = "Build favicons"
build_favicons.description = `Derive favicons from ${pkg.cfg.favicon.src}.`
//exports.favicons = build_favicons

exports.finish_build = parallel(build_gather_node_modules_licenses,
                                build_favicons,
                                series(build_prepare_build_compose(),
                                       build_org_file_with_docker))
exports.finish_build.displayName = "build"
exports.finish_build.description = `Populate and build ${pkg.cfg.paths.build.base}.`

/*
 * Scripts to get things from build to public.
 */

function public_copy_from_build() {
  return src(pkg.cfg.paths.build.base + "**/*")
        .pipe($.filter(pkg.cfg.filter.publishThese))
        .pipe(dest(pkg.cfg.paths.dist.base))
}
public_copy_from_build.displayName = "Copy to build"
public_copy_from_build.description = `Copy files matching ${pkg.cfg.filter.publishThese} from ${pkg.cfg.paths.build.base} to ${pkg.cfg.paths.dist.base}.`


exports.publish = series(exports.finish_build,
                         public_copy_from_build)

exports.publish.description = `Build the project and publish to ${pkg.cfg.paths.dist.base}.`

/*
 * Utility functions
 */

const root = $.yargs.argv.root || pkg.cfg.paths.dist.base // .cfg.paths.dist.base := "./public/"
const port = $.yargs.argv.port || 8000
const host = $.yargs.argv.bind || '127.0.0.1'

async function reload() {
    // FIXME: not working
    $.connect.reload()
}

function serve_watch_org() {
    $.log(`Watching ${pkg.cfg.paths.src.base + '*.org'} ...`)
    return watch(pkg.cfg.paths.src.base + '*.org',
            series(src_root_to_build,
                   build_org_file_with_docker,
                   public_copy_from_build,
                   reload
                  ))
}
serve_watch_org.displayName = `Watch ${pkg.cfg.paths.src.base + '*.org'}`
serve_watch_org.description = `Watchi ${pkg.cfg.paths.src.base + '*.org'} and rebuild on change.`

function serve_watch_scss() {
    $.log(`Watching ${pkg.cfg.paths.src.scss + '**/*.scss'} ...`)
    return watch(pkg.cfg.paths.src.scss + '**/*.scss',
            series(src_scss_to_build,
                   public_copy_from_build,
                   reload
                  ))
}
serve_watch_scss.displayName = `Watch ${pkg.cfg.paths.src.scss + '**/*.scss'}`
serve_watch_scss.description = `Watchi ${pkg.cfg.paths.src.scss + '**/*.scss'} and rebuild on change.`



function serve_webserver() {
    $.connect.server({
        root: root,
        port: port,
        host: host,
        livereload: true
    })
}
serve_webserver.displayName =  `Serve ${root} as http://${host}:${port}/.`
serve_webserver.description =  `Serve ${root} as http://${host}:${port}/. Override with --{host,port,root}.`

exports.serve = parallel(serve_webserver, serve_watch_org, serve_watch_scss)
exports.serve.description = `Serve ${root} as http://${host}:${port}/. Override with --{host,port,root}.`

function clean() {

  const to_be_deleted = [
      pkg.cfg.paths.build.base,
      pkg.cfg.paths.dist.base
  ]

  for (let candidate of to_be_deleted) {
      if (! candidate.startsWith("./")) {
          const msg=`Will not delete "${candidate}": Configure path in package.json to start with './'`
          $.log.error(msg)
          throw new Error('kaboom: ' + msg)
      }
  }
  return $.del(to_be_deleted)
}

clean.description = `Delete all build outputs (${pkg.cfg.paths.build.base}, ${pkg.cfg.paths.dist.base}).`
exports.clean = clean

function package_public() {
   return src(pkg.cfg.paths.dist.base + "**/*")
                                 .pipe($.zip(pkg.cfg.vars.distZip))
                                 .pipe(dest('./'))
}
package_public.displayName = `Create ${pkg.cfg.vars.distZip}`
package_public.description = `Create ${pkg.cfg.vars.distZip}.`

exports.package = series(exports.clean, exports.publish, package_public)
exports.package.displayName = "package"
exports.package.description = `Build & create ${pkg.cfg.vars.distZip}.`

exports.default = exports.publish
