/*
 * Architektury výpočetních systémů (AVS 2019)
 * Projekt c. 1 (ANN)
 * Login: xlapsa00
 */

#include <cstdlib>
#include "neuron.h"

float evalNeuron(
  size_t inputSize,
  const float* input,
  const float* weights,
  float bias
)
{
  //TODO: Step0 - Fill in the implementation, all the required arguments are passed.
  //              If you don't use them all you are doing something wrong!

  float sum = 0;

  for(size_t i = 0; i < inputSize; i++) {
    sum += (input[i] * weights[i]);
  }

  sum += bias;

  return (sum > 0) ? sum : 0;
}
