import gulp from 'gulp'

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

})

export var Paths = {
    html: [
        'src/**/*.html'
    ],
    dist: 'dist'
}

export var Tasks = {
    build: 'build',
    clean: 'clean',
    css: 'css',
    html: 'html',
    js: 'js',
    watch: 'watch'
}

var TaskDescriptions = [
    {name: Tasks.build, text: "The BUILD task. This builds everything."},
    {name: Tasks.clean, text: "Removes the `dist` folder entirely."},
    {name: Tasks.css, text: "Builds the CSS from sass sources."},
    {name: Tasks.html, text: "Builds the HTML from sources."},
    {name: Tasks.js, text: "Builds the JS from sources."},
    {name: Tasks.watch, text: "Watches js/css/html files and rebuilds on change."}
]

// ts
export var BuildChain = [Tasks.js, Tasks.css, Tasks.html];

