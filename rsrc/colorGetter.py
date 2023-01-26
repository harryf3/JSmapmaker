from importlib.metadata import files
from PIL import Image
import os 

inp = ''
pathCur = os.getcwd()

while inp!='a':
    pathoptions = os.listdir(pathCur)
    for i,path in enumerate(pathoptions):
        print(f'{path} - {i}')
    inp = input('Choose Directory or a to get pixels : ')
    if(inp != 'a'):
        pathCur += f'/{pathoptions[int(inp)]}'
filesIn = os.listdir(pathCur)
pixels = []

for img in filesIn:
    imgFile = Image.open(pathCur +'/' +img)
    pixels.append((img,imgFile.getpixel((0,0))))

for pixel in pixels:
    p = pixel[1][0:3]
    print(pixel[0],'0x%02x%02x%02x' % p)