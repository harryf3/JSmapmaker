import { Viewport } from "./Viewport.mjs";
import { MiniMap } from './MiniMap.mjs';


function tileSelector(text,buttonTexture) {
  this.tileSelectorButton = new PIXI.Sprite(buttonTexture);
  this.tileSelectorButton.x = 0;
  this.tileSelectorButton.y = 0;
  this.tileSelectorButton.interactive = true;
  this.tileSelectorButton.buttonMode = true;
  this.tileSelectorButton.on('pointerdown',()=>{
    this.toggle();
  });

  this.selectedTile = 'bt1';
  this.tileSelectorContainer = new PIXI.Container();
  let yLevel = 32;
  let xOn = 32;
  var bg = new PIXI.Graphics().beginFill(0xffffff).drawRect(xOn/2,yLevel/2, Object.keys(text).length*64+xOn, 32+yLevel).endFill();
  this.tileSelectorContainer.addChild(bg);
  this.tilesIn = [];
  for(let key in text) {
    let spr = new PIXI.Sprite(text[key]);
    spr.x = xOn;
    spr.y = yLevel;
    spr.interactive = true;
    spr.buttonMode = true;
    spr.on('pointerdown',()=>{
      this.selectedTile = spr.tileName;
      this.removeSelectors();
      spr.tint = '0xf7df9c';
    })
    spr.tileName = key;
    xOn += 64;
    this.tileSelectorContainer.addChild(spr);
    this.tilesIn.push(spr);
  }
  this.toggle = () => {
    if(this.tileSelectorContainer.visible) {
      this.tileSelectorContainer.visible = false;
    } else {
      this.tileSelectorContainer.visible = true;
    }
  }
  this.removeSelectors = () => {
    this.tilesIn.forEach((tile)=>{
      tile.tint = 0xffffff;
    })
  }
}

function brushSize(brushSizeButtonTextures) {
  this.brushSize = 1
  this.brushSizeButton = new PIXI.Sprite(brushSizeButtonTextures[`bs${this.brushSize-1}`]);
  this.brushSizeButton.x = 32;
  this.brushSizeButton.y = 0;
  this.brushSizeButton.interactive = true;
  this.brushSizeButton.buttonMode = true;
  this.brushSizeButton.on('pointerdown',()=>{
    this.brushSize += 1;
    if(this.brushSize == 5) {
      this.brushSize = 1;
    }
    this.brushSizeButton.texture = brushSizeButtonTextures[`bs${this.brushSize-1}`];
  })
}

function addRoad(roadButtonText) {
  this.roadButton = new PIXI.Sprite(roadButtonText);
  this.roadButton.x=64;
  this.roadButton.interactive = true;
  this.roadButton.buttonMode = true;
  this.roading = false;
  this.roadButton.on('pointerdown',()=>{
    this.roading=!this.roading;
    if(this.roading) {
      this.roadButton.tint = 0xf7df9c;
    } else {
      this.roadButton.tint = 0xffffff;
    }
  })
}

function exportImportMap(assetsLoaded,exportMap,importMap) {
  this.exportImportMapButton = new PIXI.Sprite(assetsLoaded.exportimportbutton.exportimportbutton);
  this.exportImportMapButton.x = window.innerWidth-this.exportImportMapButton.width;
  this.exportImportMapButton.interactive = true;
  this.exportImportMapButton.buttonMode = true;
  this.exportImportMapButton.on('pointerdown',()=>{
    this.choiceContainer.visible = !this.choiceContainer.visible;
  })

  this.choiceContainer = new PIXI.Container();
  this.choiceContainer.visible = false;
  this.exportButton= new PIXI.Sprite(assetsLoaded.export.export1);
  this.exportButton.interactive = true;
  this.exportButton.buttonMode = true;

  this.importButton = new PIXI.Sprite(assetsLoaded.export.export0);
  this.importButton.interactive = true;
  this.importButton.buttonMode = true;
  this.importButton.x = this.exportButton.x+this.exportButton.width+64;
  


  this.choiceContainer.addChild(this.exportButton);
  this.choiceContainer.addChild(this.importButton);
  this.choiceContainer.x = (window.innerWidth -this.choiceContainer.width)/2
  this.choiceContainer.y = (window.innerHeight- this.choiceContainer.height)/2;

  this.exportButton.on('pointerdown',()=>{
    exportMap();
  })

  this.importButton.on('pointerdown',()=>{
    importMap();
  })
}



function tileRoadDecorator(texture) {
  this.sprite = new PIXI.Sprite(texture);
  this.name='road'
  this.xOffset = 0;
  this.yOffset = 0;

}


function eraseDecorators(texture) {
  this.eraserButton = new PIXI.Sprite(texture);
  this.eraserButton.x = 96;
  this.eraserButton.interactive = true;
  this.eraserButton.buttonMode = true;
  this.erasing = false;
  this.eraserButton.on('pointerdown',()=>{
    this.erasing = !this.erasing;
    if(this.erasing) {
      this.eraserButton.tint = 0xf7df9c;
    } else {
      this.eraserButton.tint = 0xffffff;
    }
  })
}

function getText(onEnter) {
  let it = document.getElementById('inputtext');
  let nb = document.getElementById('namebox');
  nb.style.visibility = "visible";
  it.addEventListener('keydown',(e)=>{
    if(e.key == 'Enter') {
      if(it.value!='') {
        onEnter(it.value);
        nb.style.visibility = "hidden";
      } else {
        it.placeholder = 'enter a name';
      }
    }
  })
}

function downloadObjectAsJson(exportObj, exportName){
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  let downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function mapInProgress(w,h,assetsLoaded) {
  this.mapName = 'Unnamed_map'
  getText((value)=>{this.mapName = value});

  this.mapWidth = w;
  this.mapHeight = h;

  let tileText = assetsLoaded.bt;
  this.mapMakingContainer = new PIXI.Container();

  //Button constructors
  this.tileSelector = new tileSelector(tileText,assetsLoaded.paintbrush.paintbrush);
  this.brushSize = new brushSize(assetsLoaded.bs)
  this.addRoad = new addRoad(assetsLoaded.roadbutton.roadbutton);
  this.eraseDecorators = new eraseDecorators(assetsLoaded.eraserbutton.eraserbutton);

  //Function to pack all sprites within a tile into a pure text object
  //Which can be exported and then recreated with importMap;
  this.exportMap = ()=>{

    function downloadObjectAsJson(exportObj, exportName){
      let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      let downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
    

    function exportDecorators(decorators) {
      let convertedVals = {}
      for(let key in decorators) {
        convertedVals[key] = {name:decorators[key].name,text:decorators[key].sprite.texture.textureCacheIds[0]}
      }
      return convertedVals;
    }

    let exportMapArr = [];
    for(let w=0;w<this.map.length;w++) {
      let row = [];
      for(let h=0;h<this.map[0].length;h++) {
        row.push({
          id:this.map[w][h].id,
          num:this.map[w][h].num,
          hasRoad:this.map[w][h].hasRoad,
          decorators: exportDecorators(this.map[w][h].decorators)
        });
      }
      exportMapArr.push(row);
      
    }
    //download logic
    let choice = confirm('Export as json');
    console.log(choice);
    if(choice == true){
      downloadObjectAsJson(exportMapArr,this.mapName);
    }
  }

  //From export map return creates map
  this.importMap = () => {

  }


  this.exportImportMap = new exportImportMap(assetsLoaded,this.exportMap,this.importMap);

  this.map = [];
  let num = 0;
  for(let x=0;x<w;x++) {
      let row = [];
      for(let y=0;y<h;y++) {
          row.push({
            id:'bt1',
            num:num,
            hasRoad:false,
            decorators:{}
          });
          num+=1;
      }
      this.map.push(row);
  }
  this.mapMakingViewport = new Viewport(this.map,tileText,(posObj) => {
    this.change(this.tileSelector.selectedTile,posObj.x,posObj.y);
  })

  //Mini map
  //Has to be after map is defined
  // this.MiniMap = new MiniMap(this.map,assetsLoaded,200,100);
  // this.MiniMap.MiniMapContainer.x = window.innerWidth-this.MiniMap.MiniMapContainer.width;
  // this.MiniMap.MiniMapContainer.y = window.innerHeight-this.MiniMap.MiniMapContainer.height;


  //Add buttons to map making container
  this.mapMakingContainer.addChild(this.mapMakingViewport.viewportContainer);
  //this.mapMakingContainer.addChild(this.MiniMap.MiniMapContainer);
  this.mapMakingContainer.addChild(this.tileSelector.tileSelectorButton);
  this.mapMakingContainer.addChild(this.brushSize.brushSizeButton);
  this.mapMakingContainer.addChild(this.addRoad.roadButton);
  this.mapMakingContainer.addChild(this.eraseDecorators.eraserButton);
  this.mapMakingContainer.addChild(this.exportImportMap.exportImportMapButton);
  this.mapMakingContainer.addChild(this.exportImportMap.choiceContainer);
  this.mapMakingContainer.addChild(this.tileSelector.tileSelectorContainer);


  //Wrap cords function
  this.mapCordOverflowHandler = (x,y) => {
    let cw;
    let ch;

    if(x>=this.mapWidth) { 
      cw = x%this.mapWidth;
    } else if(x<0) {
      cw = x+this.mapWidth;
    } else {
      cw = x;
    }

    if(y>=this.mapHeight) { 
      ch = y%this.mapHeight;
    } else if(y<0) {
      ch = y+this.mapHeight;
    } else {
      ch = y;
    }
    return {rx:cw,ry:ch};
  }

  //Locate decorators(roads) around a tile
  //Should be repurposable
  this.roadTypeFinder = (map,x,y) => {
    let rc = this.mapCordOverflowHandler(x,y-1); //Above
    let rc1 = this.mapCordOverflowHandler(x,y+1); //Below
    let rc2 = this.mapCordOverflowHandler(x-1,y); //Left
    let rc3 = this.mapCordOverflowHandler(x+1,y); //Right

    let above = map[rc.rx][rc.ry].hasRoad;
    let below = map[rc1.rx][rc1.ry].hasRoad;
    let left = map[rc2.rx][rc2.ry].hasRoad;
    let right = map[rc3.rx][rc3.ry].hasRoad;

    
    if(above && below && right && left){
      return 10;
    } else if(above && right && below) {
      return 9;
    } else if(left && right && below) {
      return 8;
    } else if(left && below && above) {
      return 7;
    } else if(left && right && above) {
      return 6;
    } else if(right && above) {
      return 5;
    } else if(right && below) {
      return 4;
    } else if(left && below) {
      return 3;
    } else if(left && above) {
      return 2;
    } else if(left || right) {
      return 0;
    } else if(above || below) {
      return 1;
    } else {
      return 0;
    }
  }

  //Changes road at tile based on other roads around
  this.updateNearbyRoad = (map,x,y) => {
    let rc = this.mapCordOverflowHandler(x,y-1); //Above
    let rc1 = this.mapCordOverflowHandler(x,y+1); //Below
    let rc2 = this.mapCordOverflowHandler(x-1,y); //Left
    let rc3 = this.mapCordOverflowHandler(x+1,y); //Right


    //Temp solution
    if(this.map[rc.rx][rc.ry].hasRoad) this.map[rc.rx][rc.ry].decorators['road'].sprite.texture = assetsLoaded.roadTile[`roadTile${this.roadTypeFinder(map,rc.rx,rc.ry)}`];
    if(this.map[rc1.rx][rc1.ry].hasRoad) this.map[rc1.rx][rc1.ry].decorators['road'].sprite.texture = assetsLoaded.roadTile[`roadTile${this.roadTypeFinder(map,rc1.rx,rc1.ry)}`];
    if(this.map[rc2.rx][rc2.ry].hasRoad) this.map[rc2.rx][rc2.ry].decorators['road'].sprite.texture = assetsLoaded.roadTile[`roadTile${this.roadTypeFinder(map,rc2.rx,rc2.ry)}`];
    if(this.map[rc3.rx][rc3.ry].hasRoad) this.map[rc3.rx][rc3.ry].decorators['road'].sprite.texture = assetsLoaded.roadTile[`roadTile${this.roadTypeFinder(map,rc3.rx,rc3.ry)}`];

  }

  this.change = (n,x,y) => {
    if(!this.addRoad.roading && !this.eraseDecorators.erasing) {
      for(let ix=x;ix<x+this.brushSize.brushSize;ix++) {
        for(let iy=y;iy<y+this.brushSize.brushSize;iy++) {
          let {rx,ry} = this.mapCordOverflowHandler(ix,iy);
          this.map[rx][ry].id = n;
        }
      }
    } else if(this.addRoad.roading) {
      if(!this.map[x][y].hasRoad) {
        let roadType = this.roadTypeFinder(this.map,x,y);
        let trd = new tileRoadDecorator(assetsLoaded.roadTile[`roadTile${roadType}`]);
        trd.type = roadType;
        this.map[x][y].decorators['road'] = trd;
        this.map[x][y].hasRoad = true;

        //update nearby tiles
        this.updateNearbyRoad(this.map,x,y);
      }
    } else if(this.eraseDecorators.erasing) {
      this.map[x][y].decorators = {};
      this.map[x][y].hasRoad = false;
    }
    this.mapMakingViewport.update();
    // if(this.brushSize.brushSize == 1) {
    //   this.map[x][y].id = n;
    //   
    // }
    
  }

  this.move = (x,y) => {
    this.mapMakingViewport.move(x,y);
  }
  this.zoom = (s) => {
    this.mapMakingViewport.zoom(s);
  }

}


