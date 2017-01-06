var gulp = require('gulp');

__workDir = __dirname;
__devTool = 'source-map';

require('@fabalous/runtime-node/config/gulp/RuntimeNode.config')(gulp);
require('@fabalous/runtime-web/config/gulp/RuntimeWeb.config')(gulp);

gulp.task('build', ['backend-build', 'runtime-web-build'], function() {
    process.exit(0);
});