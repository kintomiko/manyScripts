from PIL import Image
from pytesseract import *

im = Image.open('out1.jpg')
image_to_string(im)