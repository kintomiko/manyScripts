import numpy as np
import cv2
# from matplotlib import pyplot as plt

#get the pictures from the forlder
original = cv2.imread('out.jpg')
drawn = cv2.imread('5.jpg')
# drawn = cv2.resize(drawn, tuple([int(0.3*x) for x in drawn.shape]))

# rows,cols = drawn.shape
# rotate = cv2.getRotationMatrix2D((cols/2,rows/2),90,1)
# drawn = cv2.warpAffine(drawn,rotate,(cols,rows))

# =========================================================================================
# img = original
# img2 = img.copy()
# template = drawn
# w, h = template.shape[::-1]

# # All the 6 methods for comparison in a list
# methods = ['cv2.TM_CCOEFF', 'cv2.TM_CCOEFF_NORMED', 'cv2.TM_CCORR',
#             'cv2.TM_CCORR_NORMED', 'cv2.TM_SQDIFF', 'cv2.TM_SQDIFF_NORMED']

# for meth in methods:
#     print '%%%%%%%%%%%%%%%%%%%%%%%%%%'
#     img = img2.copy()
#     method = eval(meth)

#     # Apply template Matching
#     res = cv2.matchTemplate(img,template,method)
#     min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)

#     # If the method is TM_SQDIFF or TM_SQDIFF_NORMED, take minimum
#     if method in [cv2.TM_SQDIFF, cv2.TM_SQDIFF_NORMED]:
#         top_left = min_loc
#     else:
#         top_left = max_loc
#     bottom_right = (top_left[0] + w, top_left[1] + h)

#     cv2.rectangle(img,top_left, bottom_right, 0, 2)

#     plt.subplot(121),plt.imshow(res,cmap = 'gray')
#     plt.title('Matching Result'), plt.xticks([]), plt.yticks([])
#     plt.subplot(122),plt.imshow(img,cmap = 'gray')
#     plt.title('Detected Point'), plt.xticks([]), plt.yticks([])
#     plt.suptitle(meth)

#     plt.show()

# =========================================================================================

# make them gray    
originalGray = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
drawnGray = cv2.cvtColor(drawn, cv2.COLOR_BGR2GRAY)

# apply erosion
kernel = np.ones((2, 2),np.uint8)
originalErosion = cv2.erode(originalGray, kernel, iterations = 1)
drawnErosion = cv2.erode(drawnGray, kernel, iterations = 1)

#retrieve edges with Canny
thresh = 150
originalEdges = cv2.Canny(originalErosion, thresh, thresh*2)
drawnEdges = cv2.Canny(drawnErosion, thresh, thresh*2)

#extract contours
originalContours, Orighierarchy = cv2.findContours(originalEdges, cv2.cv.CV_RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
drawnContours, Drawnhierarchy = cv2.findContours(drawnEdges, cv2.cv.CV_RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)

max_cur = -1
max_len = 0.0
i1=0
i2=0
i3=0
for i in range(len(originalContours)):
	length = cv2.arcLength(originalContours[i],True)
	area = cv2.contourArea(originalContours[i])
	print '$$$$$$$$$$$$$$$$$$$$$$$$$$$$' + str(area)
	if area < 30:
		print '###############################' + str(length) + '#######' +str(i3) +'****************' + str(max_len)
		print max_len<length
		if max_len<length:
			i3=i
			max_len=length
	for k in range(len(drawnContours)):
		cur = cv2.matchShapes(drawnContours[k],originalContours[i],cv2.cv.CV_CONTOURS_MATCH_I1, 0.0)
		print str(cur) + '| i='+str(i)+' | k='+str(k)
		print '========================' + str(len(drawnContours[k]))
		if cur>max_cur:
			max_cur=cur
			i1=i
			i2=k


print 'i1: '+str(i1)+'| i2: ' +str(i2)+ '| i3: ' + str(i3)
# cv2.drawContours(original,originalContours[i3],-1,(255,255,0),3)
# cv2.imshow("window title 1", original)
# cv2.waitKey(0)

cv2.drawContours(original,originalContours[i1],-1,(255,255,0),3)
cv2.imshow("window title 1", original)
cv2.waitKey(0)

cv2.drawContours(drawn,[drawnContours[i2]],-1,(255,255,0),3)
cv2.imshow("window title 2", drawn)
cv2.waitKey(0)

cv2.destroyAllWindows()

# import matplotlib.pyplot as plt

# plt.imshow(originalContours[i1],aspect="auto")
# plt.show()