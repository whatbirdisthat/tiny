import gulp from 'gulp'

export var Paths = {
    json: [
        'src/**/*.json',
        // 'src/test/**/*.json'
    ],
    js: [
        'src/systemjs.config.js'
    ],
    html: [
        'src/**/*.html'
    ],
    jsLibs: [
        './node_modules/tether/dist/js/tether.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './node_modules/three/build/three.js'
    ],
    tsLibs: [
        'reflect-metadata/Reflect.js',
        'zone.js/dist/**/*.js'
    ],
    dist: 'dist'
};

export var Tasks = {
    build: 'build',
    clean: 'clean',
    css: 'css',
    html: 'html',
    js: 'js',
    json: 'json',
    svg: 'svg',
    ts: 'ts',
    watch: 'watch'
};

var TaskDescriptions = [
    {name: Tasks.build, text: "The BUILD task. This builds everything."},
    {name: Tasks.clean, text: "Removes the `dist` folder entirely."},
    {name: Tasks.css, text: "Builds the CSS from sass sources."},
    {name: Tasks.html, text: "Builds the HTML from sources."},
    {name: Tasks.js, text: "Builds the JS from sources."},
    {name: Tasks.json, text: "Deploys static reference data JSON from sources."},
    {name: Tasks.svg, text: "Builds the SVG from sources."},
    {name: Tasks.ts, text: "Builds the TS from sources."},
    {name: Tasks.watch, text: "Watches js/css/html files and rebuilds on change."}
];

export var BuildChain = [Tasks.ts, Tasks.js, Tasks.svg, Tasks.css, Tasks.html, Tasks.json];

gulp.task('show-help', function () {

    console.log(
        '\n',
        String.fromCharCode(0x1B) + "[4mPipeline tasks for the *tiny* project.",
        String.fromCharCode(0x1B) + "[0m",
        '\n'
    );

    for (var eachTask in Tasks) {
        var description = TaskDescriptions.find(function (it) {
            return it.name == eachTask
        });
        console.log(
            String.fromCharCode(0x1B) + "[33m  "
            +
            eachTask
            + String.fromCharCode(0x1B) + "[0m\n"
            + ' '
            + String.fromCharCode(0x1B) + "[34m    "
            + description.text
            + String.fromCharCode(0x1B) + "[0m"
        );
    }
    console.log('\n');

});

export function handleError(theError) {
    // gutil.log(theError);
    console.log(theError.message);
    this.emit('end');
}

