var gulp = require('gulp');
//var git = require('git-rev-sync');
//var ip = require('ip');

__workDir = __dirname;
__devTool = 'cheap-source-map';
//__host = ip.address();
//__host = "127.0.0.1";
//__cache = false;
__port = 8081;
__maxAssetSize = 1000;
//__gitHash = git.short();

__alias = {
    "assets":__workDir + "/src/common/assets/"
};

require('@fabalous/runtime-cli/config/gulp.config')(gulp);

