const gulp = require('gulp');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const imageResize = require('gulp-image-resize');
const webp = require('gulp-webp');
const gulpAvif = require('gulp-avif');

// 1. Image optimization
gulp.task('imagemin', function() {
  return gulp.src('img-source/*.jpg')
      .pipe(imagemin([
        imagemin.mozjpeg(
          {quality: 85}
        )
      ]))
      .pipe(gulp.dest('img-dist'))
});



// 2. Responsive images
const sizes = [690, 1110, 2220];

gulp.task('images', async function() {
  sizes.forEach((size) => {
    return gulp.src('img-source/*.jpg')
        .pipe(imageResize({ width: size, imageMagick: true }))
        .pipe(
          rename((path) => {
            path.basename += `-${size}`;
          }),
        )
        .pipe(imagemin([
          imagemin.mozjpeg(
            {quality: 85}
          )
        ]))
        .pipe(gulp.dest('img-dist'))
  })
});



// 3. WebP format
gulp.task('webp', function() {
  return gulp.src('img-dist/*.jpg')
      .pipe(webp())
      .pipe(gulp.dest('img-dist'))
});



// 4. AVIF format
gulp.task('avif', ()=>{
  return gulp.src('img-dist/*.jpg')
      .pipe(gulpAvif())
      .pipe(gulp.dest('img-dist'));
});
