f = open("wordlist.txt", "r")
temp = f.read()
wordlist = temp.split()
f.close()

f = open('scrambledwords.txt', 'r')
temp = f.read()
scrambled = temp.split()
f.close()

unscrambled_list = []

def compare(x, y):
	if len(x) != len(y):
		return False
	x = list(x)
	y = list(y)
	x.sort()
	y.sort()

	for index in range(len(x)):
		if x[index] != y[index]:
			return False
	return True 

for x in scrambled:
	for y in wordlist:
		if compare(x, y):
			unscrambled_list.append(y)
print (', '.join(unscrambled_list))