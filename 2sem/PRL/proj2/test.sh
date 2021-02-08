#!/bin/bash

#check input
if [ $# -lt 1 ];then
    exit 1
fi;

#compile
mpic++ --prefix /usr/local/share/OpenMPI -o vid vid.cpp

#run
mpirun --prefix /usr/local/share/OpenMPI -np 16 vid $1  # Add --oversubscribe for mac

#clean
rm -f vid
