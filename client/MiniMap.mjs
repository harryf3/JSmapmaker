// basetile2.png 0xd7db94
// basetile3.png 0x86c77b
// basetile1.png 0x2478a5
// basetile0.png 0x68b6e1
// basetile4.png 0x758373
// basetile5.png 0x363c35

export function MiniMap(map,assetsLoaded,sizeX,sizeY) {

    this.MiniMapContainer = new PIXI.Container();
    this.mapWidth = map.length;
    this.mapHeight = map[0].length;

    this.border = new PIXI.Graphics();
    this.border.lineStyle(3,0x000000)
    this.border.drawRect(0,0,sizeX,sizeY);
    this.MiniMapContainer.addChild(this.border);

    this.spriteMiniMapArr = [];

    let colorCodes = {
        'bt2':0xd7db94,
        'bt3':0x86c77b,
        'bt1':0x2478a5,
        'bt0':0x68b6e1,
        'bt4':0x758373,
        'bt5':0x363c35,
        'bt6':0xececec
    };

    this.pixelTextArray = [];

    this.generatePixelTextures = (renderer) => {
        for(let key in colorCodes) {
            let pixelGraphic = new PIXI.Graphics();
            pixelGraphic.lineStyle(1,colorCodes[key]);
            pixelGraphic.drawRect(0,0,1,1);
            this.pixelTextArray[key] = renderer.generateTexture(pixelGraphic);
        }
        return this;
    }
   
    

    this.chunkSize = {
        w: Math.ceil(this.mapWidth/sizeX),
        h: Math.ceil(this.mapHeight/sizeY)
    }

    this.averageChunk = (x,y) => {
        let nums = {};
        for(let w=x; w<x+this.chunkSize.w;w++) {
            for(let h=y; h<y+this.chunkSize.h;h++) {
                if(!nums[map[w][h].id]) {
                    nums[map[w][h].id] = 1;
                } else {
                    nums[map[w][h].id]+=1;
                }
            }
        }
        return Object.keys(nums).reduce(function(a, b) { return nums[a] > nums[b] ? a : b });
    }

    //Might have an issue with indexing outside of array
    //May need wrapping function
    this.generateMap = () => {
        this.spriteMiniMapArr = [];
        for(let w=0;w<sizeX;w++) {
            let row = [];
            for(let h=0;h<sizeY;h++) {
                let ps = new PIXI.Sprite();
                ps.x = w;
                ps.y = h;
                this.MiniMapContainer.addChild(ps);
                row.push(ps);
            }
            this.spriteMiniMapArr.push(row);
        }
        this.MiniMapContainer.width = sizeX;
        this.MiniMapContainer.height = sizeY;
    }
    
    this.updateMap = () => {
        let pixelOnLoc = {w:0,h:0};
        for(let wo=0;wo<this.mapWidth;wo+=this.chunkSize.w) {
            for(let ho=0;ho<this.mapHeight;ho+=this.chunkSize.h) {
                this.spriteMiniMapArr[pixelOnLoc.w][pixelOnLoc.h].texture = this.pixelTextArray[this.averageChunk(wo,ho)];
                pixelOnLoc.h += 1;
            }
            pixelOnLoc.h = 0;
            pixelOnLoc.w += 1;
        }
    }

    //Way too expensive
    // for(let w=0; w< this.miniMapWidth;w++) {
    //     for(let h=0; h<this.miniMapHeight;h++) {
    //         let ps = new PIXI.Sprite();
    //         ps.x = w*32;
    //         ps.y = h*32;
    //         let assetID = map[w][h].id;
    //         ps.texture = this.assetsLoaded.bt[assetID];
    //         // if(map[w][h].decorators['road']) {
    //         //     ps.tint=0x000fff;
    //         // }
    //         this.spriteArray[w][h] = ps;
    //         this.MiniMapContainer.addChild(ps);
    //     }
    // }

    // this.MiniMapContainer.width = sizeX;
    // this.MiniMapContainer.height = sizeY;


    // this.update = () => {
    //     for(let w=0; w< this.miniMapWidth;w++) {
    //         for(let h=0; h<this.miniMapHeight;h++) {
    //             let ps = this.spriteArray[w][h];
    //             let assetID = this.map[w][h].id;
    //             ps.texture = this.assetsLoaded.bt[assetID];
    //             // if(map[w][h].decorators['road']) {
    //             //     ps.tint=0x000fff;
    //             // } else {
    //             //     ps.tint=0xffffff;
    //             // }
    //         }
    //     }
    // }
}