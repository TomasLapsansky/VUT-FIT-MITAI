#ifndef rsa_hpp
#define rsa_hpp

#include <gmp.h>

void generate(int bitsSize);
void getPrimes(mpz_t p, mpz_t q, int bitsSize, gmp_randstate_t random);
void getRandom(mpz_t p, mpz_t q, int bitsSize, gmp_randstate_t random);
bool testPrime(mpz_t p, int k, int bitsSize, gmp_randstate_t random);
int getJacoby(mpz_t var, mpz_t p);
bool gcdCheck(mpz_t e, mpz_t phi);

void cypher(mpz_t exp, mpz_t key, mpz_t message);

#endif