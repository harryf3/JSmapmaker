import { globalMouseDown } from "./Controls.mjs";

export function Viewport(map,mapTextures,tileClickCallback) {
    this.viewportContainer = new PIXI.Container();
    this.viewportSpriteArray = [];
  
    this.viewportSpriteArrayText = [];
  
    this.viewportWidth = 0;
    this.viewportHeight = 0;
    this.xLoc = 0;
    this.yLoc = 0;
    this.map = map;
    this.mapWidth = map.length;
    this.mapHeight = map[0].length;
    this.mapTextures = mapTextures;
    let num = 0;
    this.scaleLevel = 1;
    this.numberedTiles = false;
    this.interactiveTiles = true;
    this.maxScale = 4;
    this.minScale = 0.25;

    //this.decorators = [];
  
    this.reSprite = () => {
      this.viewportContainer.removeChildren();
      this.viewportSpriteArray = [];
      this.viewportSpriteArrayText = [];
      this.viewportWidth = 0;
      this.viewportHeight = 0;
  
      let aw = -32;
      let ah = -32;
  
      for(let w=-32*this.scaleLevel;w<=window.innerWidth+32*this.scaleLevel;w+=32*this.scaleLevel) {
        for(let h=-32*this.scaleLevel;h<=window.innerHeight+32*this.scaleLevel;h+=32*this.scaleLevel) {
          num += 1;
          if(this.viewportWidth == 0) {
            this.viewportHeight += 1;
          }
          let spr = new PIXI.Sprite(this.mapTextures['t0']);
          if(this.numberedTiles) {
            let txt = new PIXI.Text('1',{fontFamily : 'Arial', fontSize: 10, fill : 0xff1010, align : 'center'});
            txt.x = 1;
            txt.y = 14;
            spr.addChild(txt);
            this.viewportSpriteArrayText.push(txt);
          }
          if(this.interactiveTiles) {
            spr.interactive = true;
            spr.mapX = 0;
            spr.mapY = 0;
            //spr.buttonMode = true;
            spr.on('mouseover',()=>{
              if(globalMouseDown) {
                tileClickCallback({x:spr.mapX,y:spr.mapY});
              }
            })
            spr.on('mousedown',()=>{
              tileClickCallback({x:spr.mapX,y:spr.mapY});
            })
          }
          this.viewportContainer.addChild(spr);
          spr.x = aw;
          spr.y = ah;
    
          this.viewportSpriteArray.push(spr); 
          
          ah+=32;
        }
        ah=-32;
        aw += 32;
        this.viewportWidth += 1;
      }
    }
  
    this.reSprite();  
  
    this.reCenter = () => {
      if(Math.abs(this.xLoc) >= this.mapWidth) {
        this.xLoc = 0;
      }
      if(Math.abs(this.yLoc) >= this.mapHeight) {
        this.yLoc = 0;
      }
    }
  
    this.move = (x,y) => {
      this.viewportContainer.x += x;
      this.viewportContainer.y += y;
      let xReCenter = false;
      let yReCenter = false;
      if(Math.abs(this.viewportContainer.x) >= 32*this.scaleLevel) {
        this.xLoc -= Math.sign(this.viewportContainer.x);
        this.viewportContainer.x = Math.sign(this.viewportContainer.x) == -1 ? this.viewportContainer.x + 32 * this.scaleLevel : this.viewportContainer.x - 32* this.scaleLevel;
        this.reCenter();
        xReCenter = true;
      }
      if(Math.abs(this.viewportContainer.y) >= 32*this.scaleLevel) {
        this.yLoc -= Math.sign(this.viewportContainer.y);
        this.viewportContainer.y = Math.sign(this.viewportContainer.y) == -1 ? this.viewportContainer.y + 32 * this.scaleLevel: this.viewportContainer.y - 32* this.scaleLevel;
        this.reCenter();
        yReCenter = true;
      }
      if(xReCenter == true || yReCenter == true) {
        console.log(this.xLoc,this.yLoc);
        this.update();
      }
    }
  
    this.zoom = (scaleAmount) => {
      if(this.minScale > (this.scaleLevel + scaleAmount) || (this.scaleLevel + scaleAmount) > this.maxScale) {
        console.log(this.scaleLevel + scaleAmount);
        return;
      }
      
      this.scaleLevel += scaleAmount;
      this.viewportContainer.scale.set(this.scaleLevel,this.scaleLevel);
      this.reSprite();
      this.update();
    }
  
    this.update = () => {
      let spron = 0;
      for(let w = this.xLoc; w<this.xLoc+this.viewportWidth; w++) {
        for(let h = this.yLoc; h<this.yLoc+this.viewportHeight; h++) {
          
          this.viewportSpriteArray[spron].removeChildren();

          let cw;
          let ch;
  
          if(w>=this.mapWidth) { 
            cw = w%this.mapWidth;
          } else if(w<0) {
            cw = w+this.mapWidth;
          } else {
            cw = w;
          }
  
          if(h>=this.mapHeight) { 
            ch = h%this.mapHeight;
          } else if(h<0) {
            ch = h+this.mapHeight;
          } else {
            ch = h;
          }
          this.viewportSpriteArray[spron].texture = this.mapTextures[this.map[cw][ch].id];
          for(let key in this.map[cw][ch].decorators) {
            this.viewportSpriteArray[spron].addChild(this.map[cw][ch].decorators[key].sprite);
          }
          this.viewportSpriteArray[spron].mapX = cw;
          this.viewportSpriteArray[spron].mapY = ch;
          if(this.numberedTiles) {
            this.viewportSpriteArrayText[spron].text = `${cw} ${ch}`;
          }
          spron += 1;
        }
      }
    }
  }