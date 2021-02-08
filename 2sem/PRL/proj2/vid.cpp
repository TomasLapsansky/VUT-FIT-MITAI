/*
 * Brno University of Technology, FIT
 * 
 * Visibility (PRL project 2)
 * Author: Tomas Lapsansky (xlapsa00)
 * 2019/2020
 * 
 **/

#include <mpi.h>
#include <string>
#include <vector>
#include <iostream>
#include <cmath>
#include <float.h>
#include <chrono>

#define TAG 0
#define DEFVALUE -1
#define DEFINACTIVEVALUE -10
/* MEASURE = true if want to measure time */
#define MEASURE false

using namespace std;
using namespace std::chrono;

high_resolution_clock::time_point measureStart, measureEnd;

double calculateAngle(int input, int baseValue, int distance) {
    if(input == DEFVALUE) {
        return -DBL_MAX;
    } else {
        return atan(((double)input - (double)baseValue)/(double)distance);
    }
}

double max(double num1, double num2) {
    return num1 > num2 ? num1 : num2;
}

void upSweep(double *angle1, double *angle2, int processId, int totalProc, int activeProc, MPI_Status *stat) {

    bool isActive = (2 * processId + 1) % (totalProc/activeProc) == (totalProc/activeProc) - 1;

    if(totalProc == activeProc) { /* First iteration */
        *angle2 = max(*angle1, *angle2);
    } else {
        
        if(isActive) {
            bool isReceiver = (2 * processId + 1) % (totalProc/(activeProc/2)) == (totalProc/(activeProc/2)) - 1;

            if(!isReceiver) {

                MPI_Send(angle2, 1, MPI_DOUBLE, processId + (totalProc/activeProc)/2, TAG, MPI_COMM_WORLD);
            } else {

                double neighbourAngle = 0;
                MPI_Recv(&neighbourAngle, 1, MPI_DOUBLE, processId - (totalProc/activeProc)/2, TAG, MPI_COMM_WORLD, stat);

                *angle2 = max(*angle2, neighbourAngle);
            }
        }
    }

    if((activeProc != 2) && (isActive)) { /* End if it was distributed */
        upSweep(angle1, angle2, processId, totalProc, activeProc/2, stat);
    }
}

/* Check if process is parent in current iteration */
bool isParent(int processId, int iteration, int activeProc) {
    activeProc /= 2;
    for(int i = 0; i < activeProc; i += pow(2, iteration)) {
        if((i + pow(2, iteration) - 1) == processId) {
            return true;
        }
    }

    return false;
}

/* Check if process is left child in current iteration */
bool isChild(int processId, int iteration, int activeProc) {
    activeProc /= 2;
    for(int i = 0; i < activeProc; i += pow(2, iteration)) {
        if((i + pow(2, iteration - 1) - 1) == processId) {
            return true;
        }
    }

    return false;
}

void downSweep(double *angle1, double *angle2, int processId, int activeProc, MPI_Status *stat) {

    for(int i = log2(activeProc) - 1; i > 0; i--) {
        if(isParent(processId, i, activeProc)) {
            double tmp;
            MPI_Recv(&tmp, 1, MPI_DOUBLE, processId - pow(2, i - 1), TAG, MPI_COMM_WORLD, stat);
            MPI_Send(angle2, 1, MPI_DOUBLE, processId - pow(2, i - 1), TAG, MPI_COMM_WORLD);
            *angle2 = max(tmp, *angle2);
        } else if(isChild(processId, i, activeProc)) {
            MPI_Send(angle2, 1, MPI_DOUBLE, processId + pow(2, i - 1), TAG, MPI_COMM_WORLD);
            MPI_Recv(angle2, 1, MPI_DOUBLE, processId + pow(2, i - 1), TAG, MPI_COMM_WORLD, stat);
        }
    }

    double tmp = *angle1;
    *angle1 = *angle2;
    *angle2 = max(tmp, *angle2);
}

int parseInput(string input, int cpuCnt) {

    vector<int> inputVector;
    string tmp;
    int defValue = DEFVALUE;
    int defInactiveValue = DEFINACTIVEVALUE;

    /* Parse input string */
    int i = 0;
    while (input[i] != 0)
    {
        if(input[i] == ',') {
            inputVector.push_back(stoi(tmp));
            tmp = "";
        } else {
            tmp += input[i];
        }

        i++;
    }
    inputVector.push_back(stoi(tmp));

    /* Calculate number of proc in tree */
    int numOfProc = pow(2, ceil(log2(inputVector.size())));

    /* Divide only if there is more than one value */
    if(numOfProc != 1) {
        numOfProc /= 2;
    }
    int activeProc = numOfProc * 2; /* Number of leaf values in active processes */

    // possibility = error not enough processors, must be at least values/2 = 1 process has 2 values

    /* Distribute values to active processes */
    for(int i = 0; i < 2*numOfProc; i++) {

        if(i < inputVector.size()) {
            MPI_Send(&inputVector[i], 1, MPI_INT, i/2, TAG, MPI_COMM_WORLD);
        } else {
            MPI_Send(&defValue, 1, MPI_INT, i/2, TAG, MPI_COMM_WORLD);
        }
    }

    /* Distribute values to inactive processes */
    for(int i = numOfProc; i < cpuCnt; i++) {
        MPI_Send(&defInactiveValue, 1, MPI_INT, i, TAG, MPI_COMM_WORLD);
        MPI_Send(&defInactiveValue, 1, MPI_INT, i, TAG, MPI_COMM_WORLD);
    }

    /* Distribute base value + number of active processes */
    for(int i = 0; i < numOfProc; i++) {
        MPI_Send(&inputVector[0], 1, MPI_INT, i, TAG, MPI_COMM_WORLD);
        MPI_Send(&activeProc, 1, MPI_INT, i, TAG, MPI_COMM_WORLD);
    }

    return inputVector.size();
}

/* Print output = only main process */
void printVisibility(int inputVectorSize, int activeProc, MPI_Status *stat) {

    vector<double> outputVector;
    double tmp = 0;

    for(int i = 0; i < activeProc; i++) {      
        MPI_Recv(&tmp, 1, MPI_INT, i/2, TAG, MPI_COMM_WORLD, stat);   /* Receive 2 values from every proc */
        outputVector.push_back(tmp);
    }

    cout << "_";

    for(int i = 1; i < inputVectorSize; i++) {
        cout << (outputVector[i] ? ",v" : ",u");
    }

    cout << endl;

    if(MEASURE) {
        duration<double> time = duration_cast<duration<double> >(measureEnd - measureStart);
        cout << "Time: " << time.count()*1000000 << " usec" << endl;
    }
}

int main(int argc, char *argv[]) {

    int cpuCnt;
    int processId;
    int num1 = 0;
    int num2 = 0;
    double angle1 = 0;
    double angle2 = 0;
    int baseValue = 0;
    MPI_Status stat;

    int activeProc = 0;

    int inputVectorSize = 0; /* Only used by main process */

    /* MPI init */
    MPI_Init(&argc,&argv);
    MPI_Comm_size(MPI_COMM_WORLD, &cpuCnt);
    MPI_Comm_rank(MPI_COMM_WORLD, &processId);

    /* Distribute values */
    if(processId == 0) {
        inputVectorSize = parseInput(argv[1], cpuCnt);
    }

    /* Receive distributed values */
    MPI_Recv(&num1, 1, MPI_INT, 0, TAG, MPI_COMM_WORLD, &stat);
    MPI_Recv(&num2, 1, MPI_INT, 0, TAG, MPI_COMM_WORLD, &stat);

    /* Terminate inactive processes */
    if((num1 == DEFINACTIVEVALUE) && (num2 == DEFINACTIVEVALUE)) {

        /* Unblock barriers for measure */
        if(MEASURE) {
            MPI_Barrier(MPI_COMM_WORLD);
            MPI_Barrier(MPI_COMM_WORLD);
        }

        MPI_Finalize();
        return 0;
    }

    /* Receive of base value for angels */
    MPI_Recv(&baseValue, 1, MPI_INT, 0, TAG, MPI_COMM_WORLD, &stat);
    MPI_Recv(&activeProc, 1, MPI_INT, 0, TAG, MPI_COMM_WORLD, &stat);

    if(MEASURE) {
        MPI_Barrier(MPI_COMM_WORLD);

        if(processId == 0) {
            measureStart = high_resolution_clock::now();
        }
    }

    /* Calculate angles */
    if(processId == 0) {
        angle1 = -DBL_MAX;
    } else {
        angle1 = calculateAngle(num1, baseValue, 2 * processId);
    }
    
    angle2 = calculateAngle(num2, baseValue, 2 * processId + 1);

    /* Save angle value for future compare */
    double maxAngle1 = angle1;
    double maxAngle2 = angle2;

    upSweep(&maxAngle1, &maxAngle2, processId, activeProc, activeProc, &stat);

    /* Clear */
    if(processId == activeProc/2 - 1) {
        maxAngle2 = -DBL_MAX;
    }

    downSweep(&maxAngle1, &maxAngle2, processId, activeProc, &stat);

    int visibility1 = angle1 > maxAngle1 ? 1 : 0;
    int visibility2 = angle2 > maxAngle2 ? 1 : 0;

    if(MEASURE) {
        MPI_Barrier(MPI_COMM_WORLD);

        if(processId == 0) {
            measureEnd = high_resolution_clock::now();
        }
    }

    /* Send self calculated values to main process */
    MPI_Send(&visibility1, 1, MPI_INT, 0, TAG, MPI_COMM_WORLD);
    MPI_Send(&visibility2, 1, MPI_INT, 0, TAG, MPI_COMM_WORLD);

    /* Printing visibility output */
    if(processId == 0) {
        printVisibility(inputVectorSize, activeProc, &stat);
    }

    MPI_Finalize();

    return 0;
}
