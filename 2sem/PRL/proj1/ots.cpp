/*
 * PRL Project 1 - odd-even transposition sort
 * Author: Tomas Lapsansky (xlapsa00)
 * Date: 22.3.2020
 */

 #include <mpi.h>
 #include <iostream>
 #include <fstream>
 #include <ctime>
 #include <ratio>
 #include <chrono>
 #include <vector>

 #define TEST_FILE "numbers"
 #define TAG 0
 /* MEASURE = true if want to measure time */
 #define MEASURE true
 
 using namespace std;
 using namespace std::chrono;

 high_resolution_clock::time_point measureStart, measureEnd;

 void loadFile() {

    int tmpNumber;
    int cpuNum = 0;
    fstream file;
    file.open(TEST_FILE, ios::in);

    vector<int> numbers;

    while(file.good()) {
        tmpNumber = file.get();
        if(!file.good())
            break;

        /* Print */
        if(cpuNum != 0)
            cout << " ";
        
        cout << tmpNumber;
        numbers.push_back(tmpNumber);
        cpuNum++;
    }

    cout << endl;

    file.close();

    if(MEASURE) {
        measureStart = high_resolution_clock::now();
    }

    for(int i = 0; i < cpuNum; i++) {

        /* MPI send */
        MPI_Send(&numbers[i], 1, MPI_INT, i, TAG, MPI_COMM_WORLD);
    }

 }

 int* transpositionSort(int cpuCnt, int processId, int myNum, MPI_Status stat) {

    int otherNum;
    
    /* Limits */
    int oddLimit = 2 * (cpuCnt/2) - 1;
    int evenLimit = 2 * ((cpuCnt-1)/2);

    /* If odd, has to be half, not less */
    int forCycle = cpuCnt/2;
    if(cpuCnt % 2 != 0) {
        forCycle++;
    }

    /* Odd-even transposition sort */
    for(int i = 1; i <= forCycle; i++) {

        /* Even */
        if((processId % 2 == 0) && (processId < oddLimit)) {

            MPI_Send(&myNum, 1, MPI_INT, processId + 1, TAG, MPI_COMM_WORLD);
            MPI_Recv(&myNum, 1, MPI_INT, processId + 1, TAG, MPI_COMM_WORLD, &stat);

        } else if(processId <= oddLimit) { /* Odd process */

            MPI_Recv(&otherNum, 1, MPI_INT, processId - 1, TAG, MPI_COMM_WORLD, &stat);

            if(otherNum > myNum) {
                /* SWAP */
                MPI_Send(&myNum, 1, MPI_INT, processId - 1, TAG, MPI_COMM_WORLD);
                myNum = otherNum;

            } else {

                MPI_Send(&otherNum, 1, MPI_INT, processId - 1, TAG, MPI_COMM_WORLD);
            }
        }

        /* Odd */
        if((processId % 2 == 1) && (processId < evenLimit)) {

            MPI_Send(&myNum, 1, MPI_INT, processId + 1, TAG, MPI_COMM_WORLD);
            MPI_Recv(&myNum, 1, MPI_INT, processId + 1, TAG, MPI_COMM_WORLD, &stat);
            
        } else if(processId <= evenLimit && processId != 0) { /* Even process */

            MPI_Recv(&otherNum, 1, MPI_INT, processId - 1, TAG, MPI_COMM_WORLD, &stat);

            if(otherNum > myNum) {

                MPI_Send(&myNum, 1, MPI_INT, processId - 1, TAG, MPI_COMM_WORLD);
                myNum = otherNum;
            }
            else MPI_Send(&otherNum, 1, MPI_INT, processId - 1, TAG, MPI_COMM_WORLD);
        }   
    }

    /* Distribution */
    int* final = new int [cpuCnt];
    for(int i = 1; i < cpuCnt; i++) {

        if(processId == i) {

            MPI_Send(&myNum, 1, MPI_INT, 0, TAG,  MPI_COMM_WORLD);

        }
        
        if(processId == 0) {

            MPI_Recv(&otherNum, 1, MPI_INT, i, TAG, MPI_COMM_WORLD, &stat);
            final[i] = otherNum;
        }
    }

    /* Main process number save */
    if(processId == 0) {

        final[0] = myNum;
    }

    return final;
 }

 int main(int argc, char *argv[]) {

    int cpuCnt;
    int processId;
    int myNum;
    MPI_Status stat;

    /* MPI init */
    MPI_Init(&argc,&argv);
    MPI_Comm_size(MPI_COMM_WORLD, &cpuCnt);
    MPI_Comm_rank(MPI_COMM_WORLD, &processId);
 
    /* Main process loads file */
    if(processId == 0){
        loadFile();             
    }

    /* MPI receive my num */
    MPI_Recv(&myNum, 1, MPI_INT, 0, TAG, MPI_COMM_WORLD, &stat);

    int* final = transpositionSort(cpuCnt, processId, myNum, stat);

    /* Main process, final print */
    if(processId == 0) {

        if(MEASURE) {
            measureEnd = high_resolution_clock::now();
        }

        for(int i = 0; i < cpuCnt; i++){
            cout << final[i] << endl;
        }

        if(MEASURE) {
            duration<double> time = duration_cast<duration<double> >(measureEnd - measureStart);
            cout << "Time: " << time.count() << " sec" << endl;
        }
    }

    MPI_Finalize(); 
    return 0;
 }
