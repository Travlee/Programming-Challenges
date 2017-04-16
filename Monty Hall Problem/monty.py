from random import randrange
from time import clock

def rand_door():
	return randrange(0, 3)
def rand_doors():
	doors = ['donkey', 'donkey']
	doors.insert(randrange(0, 3), 'car')
	return doors
def print_results(results):
	rounds = results['rounds']
	correct = results['correct']
	output = "After {0} rounds, {1}({2:.0%}) correct.".format(rounds, correct, (correct/rounds))		
	return output	
def run_test(rounds, control=False):
	correct = 0
	for round in range(rounds):
		doors = rand_doors()
		if control:
			if doors[rand_door()] == 'car':
				correct += 1
				continue
		else:
			remove = rand_door()
			while doors[remove] == 'car':
				remove = rand_door()
			doors.pop(remove)
			
			if doors[randrange(0, 2)] == 'car':
				correct += 1
	return {'rounds':rounds, "correct":correct}
def main():
	start = clock()
	rounds = 1000
	control = run_test(rounds, True)
	results = run_test(rounds)
	print("Control: {0}\nMonty: {1}".format(print_results(control), print_results(results)))
	print("Elapsed: {0:.2}s".format(clock() - start))
main()