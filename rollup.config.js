/**
 * Created by Joshua Wright on 11/3/2017
 */

export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ngx-autosize-input.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.ngx-autosize-input',
    globals: {
        '@angular/core': 'ng.core',
    }
}