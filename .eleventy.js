export default function(config){
 config.addPassthroughCopy({'src/assets':'assets'});
 config.addPassthroughCopy({'src/lib':'lib'});
 config.addPassthroughCopy({'node_modules/temporal-polyfill/global.js':'vendor/temporal-polyfill/global.js','node_modules/temporal-polyfill/LICENSE':'vendor/temporal-polyfill/LICENSE'});
 return {dir:{input:'src',output:'_site'},templateFormats:['11ty.js']};
}
