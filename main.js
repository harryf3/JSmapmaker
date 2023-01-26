//import {Viewport} from './Viewport.mjs';
import { assetList } from './assetList.mjs';
import { mapInProgress } from './MapMaker.mjs';
import { textureSplit } from './TextureSplit.mjs';

const app = new PIXI.Application({
  width: 400,
  height: 400,
  //backgroundColor: 0x32a8a0
  backgroundColor: 0xffffff
});

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);

let mainMap = {};
let assetsLoaded = {};

function loadingScreen(callback) {
  this.Container = new PIXI.Container();
  this.visible = this.Container.visible;
  this.loadSprite;

  this.loadingText = new PIXI.Text('Loading',{fontFamily : 'Arial', fontSize: 40, fill : 0x000000, align : 'center'});
  this.Container.addChild(this.loadingText);
  this.loadingText.x = (window.innerWidth/2)-this.loadingText.width/2;
  this.loadingText.y = (window.innerHeight/2)-this.loadingText.height/2+96;


  app.loader.add([{name:'loading0',url:'rsrc/loading/loading0.png'},{name:'loading1',url:'rsrc/loading/loading1.png'},
  {name:'loading2',url:'rsrc/loading/loading2.png'},{name:'loading3',url:'rsrc/loading/loading3.png'},
  {name:'loading4',url:'rsrc/loading/loading4.png'},{name:'loading5',url:'rsrc/loading/loading5.png'},
  {name:'loading6',url:'rsrc/loading/loading6.png'},{name:'loading7',url:'rsrc/loading/loading7.png'},
  {name:'loading8',url:'rsrc/loading/loading8.png'},{name:'loading9',url:'rsrc/loading/loading9.png'}]).load((loader,resources)=>{
    let loadSpriteTexts = []
    for(let key in resources) {
      loadSpriteTexts.push(resources[key].texture)
    }
    this.loadSprite = new PIXI.AnimatedSprite(loadSpriteTexts);
    this.loadSprite.play()
    this.loadSprite.animationSpeed = 0.1;
    this.loadSprite.x = (window.innerWidth/2)-this.loadSprite.width/2;
    this.loadSprite.y = (window.innerHeight/2)-this.loadSprite.height/2;
    this.Container.addChild(this.loadSprite);
    callback();
  }) 
}

let loadScreen = new loadingScreen(load);
app.stage.addChild(loadScreen.Container);

function load() {
  app.loader.add(assetList.flat()).load((loader,resources)=>{
      let keys = Object.keys(resources);
      keys = keys.map((str)=>{return str.replace(/[0-9]/g, '')});
      keys = new Set(keys);
      keys.forEach((e)=>{
          assetsLoaded[e] = {};
      });
      for(let key in resources) {
          keys.forEach((e)=>{
              if (key.includes(e)) {
                  assetsLoaded[e][key] = resources[key].texture;
              };
          });
      }
      postLoad(assetsLoaded)
  })   
}

function postLoad(assetsLoaded) {
  loadScreen.Container.visible = false;
  console.log(assetsLoaded);
  mainMap = new mapInProgress(200,200,assetsLoaded,app.renderer);
  mainMap.mapMakingViewport.update();
  app.stage.addChild(mainMap.mapMakingContainer);
  
  let tstest = textureSplit(assetsLoaded.strut.strut3,32,32,app.renderer)
  let i = 0;
  for(let key in tstest) {
    let ps = new PIXI.Sprite(tstest[key]);
    ps.x = Math.floor(i/3)*32 +32 ;
    ps.y = (i%3)*32 + 32;
    //app.stage.addChild(ps);
    i+=1;
  }
}

let keymap = {};
document.addEventListener('keyup',(e)=>{
  delete keymap[e.key];
})

document.addEventListener('keydown',(e) => {
  keymap[e.key] = e.key;
  keyHandle(keymap);
})

function keyHandle(keymap) {
  //console.log(keymap);
  if(keymap['ArrowRight']) {
    mainMap.move(-8,0);
  }
  if(keymap['ArrowLeft']) {
    mainMap.move(8,0);
  }
  if(keymap['ArrowUp']) {
    mainMap.move(0,8);
  } 
  if(keymap['ArrowDown']) {
    mainMap.move(0,-8);
  }
  if(keymap['=']) {
    mainMap.zoom(0.05);
  }
  if(keymap['-']) {
    mainMap.zoom(-0.05);
  }
}


