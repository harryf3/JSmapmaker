import os
import json

def mysplit(s):
    s = s.split('.')[0]
    tail = s[len(s.rstrip('0123456789')):]
    return tail

inp = ''
pathCur = os.getcwd()

while inp!='a':
    pathoptions = os.listdir(pathCur)
    for i,path in enumerate(pathoptions):
        print(f'{path} - {i}')
    inp = input('Choose Directory or a to start array creation - ')
    if(inp != 'a'):
        pathCur += f'/{pathoptions[int(inp)]}'
name = input('Naming convention - ')
filesIn = os.listdir(pathCur)
aPath = '/'.join(pathCur.split('/')[pathCur.split('/').index('rsrc'):])
names = [name + mysplit(a) for a in filesIn]
paths = [f'{aPath}/{a}' for a in filesIn]

names = sorted(names)
paths = sorted(paths)

strf = '['
for i,n in enumerate(names):
    strf+=f"{{name:'{n}',url:'{paths[i]}'}},"
strf += ']'

with open(f'array{name}.json','w+') as f:
    f.write(strf)



