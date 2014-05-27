module.exports = function (grunt) {
    "use strict";

    var sourceFiles = grunt.file.expand("lib/**/*.js");
    var specFiles = grunt.file.expand("spec/**/*Spec.js");
    var helperFiles = grunt.file.expand("spec/**/*Helper.js");

    // Project configuration.
    grunt.initConfig({
        "jasmine" : {
            "src" : sourceFiles,
            "options" : {
                "specs" : specFiles,
                "helpers" : helperFiles
            }
        },

        "jshint" : {
            "options" : {
                "jshintrc" : ".jshintrc"
            },

            "files" : {
                "src" : [ sourceFiles, specFiles, helperFiles, "Gruntfile.js" ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-jshint");

    // Default task.
    grunt.registerTask("default", [ "jshint", "jasmine" ]);
};
