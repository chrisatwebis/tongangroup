module.exports = function (grunt) {
     "use strict";
    grunt.initConfig({
       
        pkg: grunt.file.readJSON('package.json'),

        watch: {         
            css: {
				files: '**/*.scss',
				tasks: ['sass']
			},
            scripts: {
                files: ['./js/includes/*.js'],
                tasks: ['jshint', 'concat:js'],//, 'uglify'],
                options: {
                    nospawn: true,
                    livereload: 45729
                }
        	},     
           options: {
                livereload: true,
            },
        },
        
        sass: {
			dist: {
				files: {
					'css/style.css' : 'css/sass/style.scss'
				}
			}
		},
		//Currently not using Compass
        compass: {
            dev: {
                options: {
                    sassDir: 'css/sass',
                    cssDir: 'css',
                    imagesPath: 'assets/img',
                    noLineComments: false,
                    outputStyle: 'compressed'
                }
            }
        },
        concat: {
            options: {separator: ';'},
            js: {
                src: ['./js/includes/*.js'],
                dest: './js/compiled.js'
            },
        },
        jshint: {
            all: ['js/src/'],
            
            options: { 
	            loopfunc: true
            },
        },
        
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['watch']);
};
