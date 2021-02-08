#!/bin/bash

#count numbers to generate
if [ $# -lt 1 ];then 
    exit 1
else
    numbers=$1;
fi;

#random numbers
dd if=/dev/random bs=1 count=$numbers of=numbers 2>/dev/null

#compile
mpic++ --prefix /usr/local/share/OpenMPI -o ots ots.cpp

#run
mpirun --oversubscribe --prefix /usr/local/share/OpenMPI -np $numbers ots

#clean
rm -f ots numbers
