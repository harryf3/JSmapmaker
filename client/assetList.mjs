export let assetList = [
    [{name:'bt2',url:'rsrc/basetiles0/basetile2.png'},{name:'bt3',url:'rsrc/basetiles0/basetile3.png'},{name:'bt1',url:'rsrc/basetiles0/basetile1.png'},
    {name:'bt0',url:'rsrc/basetiles0/basetile0.png'},{name:'bt4',url:'rsrc/basetiles0/basetile4.png'},{name:'bt5',url:'rsrc/basetiles0/basetile5.png'}],
    [{name:'bs2',url:'rsrc/brushsize/brushsize2.png'},{name:'bs3',url:'rsrc/brushsize/brushsize3.png'},{name:'bs1',url:'rsrc/brushsize/brushsize1.png'},{name:'bs0',url:'rsrc/brushsize/brushsize0.png'}],
    [{name:'paintbrush',url:'rsrc/paintbrush.png'}],
    [{name:'roadTile8',url:'rsrc/roadtiles/road8.png'},{name:'roadTile9',url:'rsrc/roadtiles/road9.png'},{name:'roadTile7',url:'rsrc/roadtiles/road7.png'},{name:'roadTile6',url:'rsrc/roadtiles/road6.png'},{name:'roadTile4',url:'rsrc/roadtiles/road4.png'},{name:'roadTile5',url:'rsrc/roadtiles/road5.png'},{name:'roadTile1',url:'rsrc/roadtiles/road1.png'},{name:'roadTile0',url:'rsrc/roadtiles/road0.png'},{name:'roadTile2',url:'rsrc/roadtiles/road2.png'},{name:'roadTile3',url:'rsrc/roadtiles/road3.png'},{name:'roadTile10',url:'rsrc/roadtiles/road10.png'}],
    [{name:'roadbutton',url:'rsrc/roadbutton.png'}],
    [{name:'eraserbutton',url:'rsrc/eraserbutton.png'}],
    [{name:'exportimportbutton',url:'rsrc/exportimportbutton.png'}],
    [{name:'export0',url:'rsrc/export0.png'},{name:'export1',url:'rsrc/export1.png'}]
]
// export let assetsLoaded = new Promise((resolve)=>{
//     let assetsLoaded = {};
//     let loader = new PIXI.Loader()
//         loader.add(assetsToLoad.flat()).load((loader,resources)=>{
//             let keys = Object.keys(resources);
//             keys = keys.map((str)=>{return str.replace(/[0-9]/g, '')});
//             keys = new Set(keys);
//             keys.forEach((e)=>{
//                 assetsLoaded[e] = {};
//             });
//             for(let key in resources) {
//                 keys.forEach((e)=>{
//                     if (key.includes(e)) {
//                         assetsLoaded[e][key] = resources[key].texture;
//                     };
//                 });
//             }
//             resolve(assetsLoaded);
//         })
//     })

// export async function loadAssets(loadCallback) {
//     return await assetsLoaded;
// }