/*
 * Architektury výpočetních systémů (AVS 2019)
 * Projekt c. 1 (ANN)
 * Login: xlapsa00
 */

#include <cstdlib>
#include "neuron.h"

float evalNeuron(
  size_t inputSize,
  size_t neuronCount,
  const float* input,
  const float* weights,
  float bias,
  size_t neuronId
)
{
  //TODO: Step0 - Fill in the implementation, all the required arguments are passed.
  //              If you don't use them all you are doing something wrong!

  float sum = 0;

  for(size_t i = 0; i < inputSize; i++) {
    sum += (input[i] * weights[neuronId + (i * neuronCount)]);
  }

  sum += bias;

  return (sum > 0) ? sum : 0;
}
