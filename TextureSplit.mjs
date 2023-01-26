//A function to split a texture into smaller pieces so the decorator system can be used to display bigger sprites
export function textureSplit(textToSplit,rw,rh,passedRenderer) {
    let spts = new PIXI.Sprite(textToSplit);
    let splitTexts = {};
    let splitTextOn = 0;
    for(let x=0;x<textToSplit.width;x+=rw) {
        for(let y=0;y<textToSplit.height;y+=rh) {
            splitTexts[splitTextOn] = passedRenderer.generateTexture(spts,0,0, new PIXI.Rectangle(x,y,32,32));

            splitTextOn += 1;
        }
    }
    return splitTexts;
}