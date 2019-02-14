var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({ 
      stream: true
    }));
})


gulp.task('watch:scss', function() {
  return gulp.watch('app/scss/**/*.scss',
    gulp.series('sass'));
});

gulp.task('watch:html', function() {
  return gulp.watch('app/**/*.html').on('change',
    browserSync.reload
  );
});

gulp.task('watch',
  gulp.parallel('watch:scss', 'watch:html')
)


gulp.task('default',
  gulp.series('sass',
    gulp.parallel('watch', 'browserSync'),
  )
)
