import subprocess
import random
import re

# has to turn MEASURE = true in vid.cpp

def main():
    for i in range(4, 33, 4):

        print("String size: " + str(i))
        tmpSum = 0.0

        for idx in range(0, 100):
            randNum = random.randint(0, 1000)
            inputStr = str(randNum)
            for j in range(1, i):
                tmp = random.randint(0, 1000)
                inputStr = inputStr + "," + str(tmp)

            output = subprocess.check_output(['bash', './test.sh', inputStr]).decode('utf-8')
            value = re.findall(r'\d+\.\d+', output)[-1]
            tmpSum += float(value)
        
        print("Average: " + str(tmpSum/100) + " usec")

if __name__ == "__main__":
    main()
