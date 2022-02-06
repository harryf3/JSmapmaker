export function MiniMap(map,assetsLoaded,sizeX,sizeY) {
    this.MiniMapContainer = new PIXI.Container();
    this.assetsLoaded = assetsLoaded;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.map=map;
    this.miniMapWidth = this.map.length;
    this.miniMapHeight = this.map[0].length;
    this.spriteArray = [...Array(this.miniMapWidth)].map((e)=>Array(this.miniMapHeight));


    this.border = new PIXI.Graphics();
    this.border.beginFill(0x000000);
    this.border.drawRect(-32,-32,this.miniMapWidth*32+64,this.miniMapHeight*32+64);
    this.border.endFill();
    this.MiniMapContainer.addChild(this.border);

    for(let w=0; w< this.miniMapWidth;w++) {
        for(let h=0; h<this.miniMapHeight;h++) {
            let ps = new PIXI.Sprite();
            ps.x = w*32;
            ps.y = h*32;
            let assetID = map[w][h].id;
            ps.texture = this.assetsLoaded.bt[assetID];
            // if(map[w][h].decorators['road']) {
            //     ps.tint=0x000fff;
            // }
            this.spriteArray[w][h] = ps;
            this.MiniMapContainer.addChild(ps);
        }
    }

    this.MiniMapContainer.width = sizeX;
    this.MiniMapContainer.height = sizeY;


    this.update = () => {
        for(let w=0; w< this.miniMapWidth;w++) {
            for(let h=0; h<this.miniMapHeight;h++) {
                let ps = this.spriteArray[w][h];
                let assetID = this.map[w][h].id;
                ps.texture = this.assetsLoaded.bt[assetID];
                // if(map[w][h].decorators['road']) {
                //     ps.tint=0x000fff;
                // } else {
                //     ps.tint=0xffffff;
                // }
            }
        }
    }
}