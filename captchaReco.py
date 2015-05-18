from PIL import Image
from operator import add
import sys
import numpy as np

white = 255
black = 0

def get_right_start_point(im):
	global white, black
	start_point = (0,0)
	found = False
	w, h = im.size
	data = list(im.getdata())
	for x in xrange(w):
		for y in xrange(h):
			rx = w-x-1 
			if data[ y*w + rx ] != white:
				found = True
				start_point = (rx,y)
				break

		if found:
			break
	return start_point

def eat_line(im, start_point):
	global white, black
	w, h = im.size
	y = start_point[1]
	lastd = 0
	next = [0,0,0]
	extra = [0,0,0,0]
	data = im.load()
	for x in xrange(start_point[0]):
		rx = w-x-2
		next[0] = white if ((w*(y-1) + rx) >= w*h or (w*(y-1) + rx) <0) else data[rx, y-1]
		next[1] = white if ((w*y + rx) >= w*h or (w*y + rx) <0) else data[rx, y]
		next[2] = white if ((w*(y+1) + rx) >= w*h or (w*(y+1) + rx) <0) else data[rx, y+1]
		extra[0] = white if ((w*(y+2) + rx) >= w*h or (w*(y+2) + rx) <0) else data[rx, y+2]
		extra[1] = white if ((w*(y+3) + rx) >= w*h or (w*(y+3) + rx) <0) else data[rx, y+3]
		extra[2] = white if ((w*(y-2) + rx) >= w*h or (w*(y-2) + rx) <0) else data[rx, y-2]
		extra[3] = white if ((w*(y-3) + rx) >= w*h or (w*(y-3) + rx) <0) else data[rx, y-3]
		if reduce(add, next) + reduce(add, extra) >= white*2:
			data[rx, y]=white
			data[rx, y-1] = white
			data[rx, y+1] = white
		print '|x: ' + str(rx) + '|y: '+ str(y)
		print next
		if next==[black,black,black]:
			lastd = 0
		elif next==[white, white, white]:
			print 'cut'
		elif reduce(add, next) == white*2:
			for i in range(len(next)):
				if next[i] == black:
					lastd=i-1
			y +=lastd
			print 'found | good | ' + str(lastd)
		else:
			if next[0] == black:
				lastd = -1
			else:
				lastd=1
			print 'found | bad | '  + str(lastd)
			y+=lastd
	return 0


im = Image.open(sys.argv[1]).convert('L')

threshold = 200
table = []
for i in range(256):
    if i < threshold:
        table.append(0)
    else:
        table.append(255)

bim = im.point(table, '1')

# bim.show()

start_point =  get_right_start_point(bim)
rst = eat_line(bim, start_point)

print rst

open_cv_image = numpy.array(bim)

# from pytesseract import *

# print image_to_string(bim, config='letters')
# bim.save('out.jpg')