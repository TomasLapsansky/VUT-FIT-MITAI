#!/bin/bash
for i in {1..200}
do
   wget -O tmp http://pcocenas.fit.vutbr.cz/?login=xlapsa00
   xxd -p -c10000 tmp >> hexaInput
done
