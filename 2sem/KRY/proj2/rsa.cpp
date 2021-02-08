#include "rsa.hpp"
#include <iostream>
#include <unistd.h>

void generate(int bitsSize) {

    /* Randomize */
    unsigned long seed = clock() + time(NULL) + getpid();
    gmp_randstate_t random;
    gmp_randinit_mt(random);
    gmp_randseed_ui(random, seed);

    mpz_t n, e, d, p, q, phi;

    mpz_init(n);
    mpz_init(e);
    mpz_init(d);
    mpz_init(p);
    mpz_init(q);
    mpz_init(phi);

    if(bitsSize > 2048) {
        mpz_set_ui(e, 65537);
    } else {
        mpz_set_ui(e, 3);
    }

    do {
        getPrimes(p, q, bitsSize, random);

        /* Get n */
        mpz_mul(n, p, q);

        /* Get phi */
        mpz_t pTmp, qTmp;

        mpz_init(pTmp);
        mpz_init(qTmp);

        mpz_set(pTmp, p);
        mpz_set(qTmp, q);

        mpz_sub_ui(pTmp, pTmp, 1);
        mpz_sub_ui(qTmp, qTmp, 1);

        mpz_mul(phi, pTmp, qTmp);

        mpz_clear(pTmp);
        mpz_clear(qTmp);
    } while(gcdCheck(e, phi));

    /* Get d */
    mpz_t s, t, phiTmp, eTmp, sTmp, tTmp, qo, tmp1, tmp2;

    mpz_init_set_ui(s, 0);
    mpz_init_set_ui(t, 1);
    mpz_init_set(phiTmp, phi);
    mpz_init_set(eTmp, e);
    mpz_init_set_ui(sTmp, 0);
    mpz_init_set_ui(tTmp, 1);

    mpz_init(qo);
    mpz_init(tmp1);
    mpz_init(tmp2);

    if(mpz_cmp_ui(phiTmp, 1) != 0) {
        mpz_set_ui(d, 0);
    }

    while(mpz_cmp_ui(phiTmp, 0) != 0) {

        mpz_div(qo, eTmp, phiTmp);

        mpz_set(tmp1, phiTmp);
        mpz_mul(tmp2, qo, tmp1);
        mpz_sub(phiTmp, eTmp, tmp2);
        mpz_set(eTmp, tmp1);

        mpz_set(tmp1, s);
        mpz_mul(tmp2, qo, tmp1);
        mpz_sub(s, tTmp, tmp2);
        mpz_set(tTmp, tmp1);

        mpz_set(tmp1, t);
        mpz_mul(tmp2, qo, tmp1);
        mpz_sub(t, sTmp, tmp2);
        mpz_set(sTmp, tmp1);
    }

    mpz_set(d, tTmp);

    if(mpz_cmp_ui(d, 0) < 0) {
        mpz_add(d, d, phi);
    }

    mpz_clear(s);
    mpz_clear(t);
    mpz_clear(phiTmp);
    mpz_clear(eTmp);
    mpz_clear(sTmp);
    mpz_clear(tTmp);
    mpz_clear(qo);
    mpz_clear(tmp1);
    mpz_clear(tmp2);

    /* Print output */
    gmp_printf("0x%Zx 0x%Zx 0x%Zx 0x%Zx 0x%Zx\n", p, q, n, e, d);

    /* Clear */
    mpz_clear(p);
    mpz_clear(q);
    mpz_clear(n);
    mpz_clear(e);
    mpz_clear(d);
}

void getPrimes(mpz_t p, mpz_t q, int bitsSize, gmp_randstate_t random) {

    getRandom(p, q, bitsSize, random);

    while(!testPrime(p, 50, bitsSize, random)) {
        mpz_add_ui(p, p, 2);
    }

    while(!testPrime(q, 50, bitsSize, random)) {
        mpz_add_ui(q, q, 2);
        if(mpz_cmp(p, q) == 0) {
            mpz_add_ui(q, q, 2);
        }
    }


}

void getRandom(mpz_t p, mpz_t q, int bitsSize, gmp_randstate_t random) {

    int len = bitsSize/2;
    int len2 = bitsSize - len;

    mpz_urandomb(p, random, len);
    mpz_urandomb(q, random, len2);

    mpz_setbit(p, 0);
    mpz_setbit(q, 0);

    /* Can't be same */
    while(mpz_cmp(p, q) == 0){
        mpz_urandomb(q, random, len2);
        mpz_setbit(q, 0);
    }

    if(bitsSize >= 10) {
        mpz_setbit(p, len);
        mpz_setbit(q, len);
    }

}

bool testPrime(mpz_t p, int k, int bitsSize, gmp_randstate_t random) {

    if((mpz_cmp_ui(p, 2) == 0) || (mpz_cmp_ui(p, 3) == 0)) {
        return true;
    } else if(mpz_cmp_ui(p, 0) <= 0) {
        return false;
    }

    /* Remove 2n numbers */
    mpz_t modus;

    mpz_init(modus);

    mpz_mod_ui(modus, p, 2);
    if(mpz_cmp_ui(modus, 0) == 0) {
        return false;
    }

    mpz_t leftSide, rightSide, rnd, var;

    mpz_init(leftSide);
    mpz_init(rightSide);
    mpz_init(rnd);
    mpz_init(var);

    for(int i = 0; i < k; i++) {

        mpz_urandomb(rnd, random, bitsSize/2);
        mpz_sub_ui(modus, p, 1);
        mpz_mod(var, rnd, modus);
        mpz_add_ui(var, var, 1);

        /* Right side */
        int jacoby = getJacoby(var, p);

        if(jacoby >= 0) {
            mpz_add_ui(rightSide, p, jacoby);
        } else {
            mpz_sub_ui(rightSide, p, -jacoby);
        }

        mpz_mod(rightSide, rightSide, p);

        /* Left side */
        mpz_t x, exp;

        mpz_init_set_ui(x, 1);
        mpz_init(exp);

        mpz_sub_ui(exp, p, 1);
        mpz_div_ui(exp, exp, 2);

        while(mpz_cmp_ui(exp, 0) > 0) {

            mpz_mod_ui(modus, exp, 2);

            if (mpz_cmp_ui(modus, 1) == 0) {
                mpz_mul(modus, x, var);
                mpz_mod(x, modus, p);
            }

            mpz_mul(modus, var, var);
            mpz_mod(var, modus, p);
            mpz_div_ui(exp, exp, 2);
        }

        mpz_mod(leftSide, x, p);

        /* Cmp */
        if((mpz_cmp(rightSide, leftSide) != 0) || (mpz_cmp_ui(rightSide, 0) == 0)) {
            return false;
        }
    }

    mpz_clear(leftSide);
    mpz_clear(rightSide);
    mpz_clear(rnd);
    mpz_clear(var);
    mpz_clear(modus);

    return true;
}

int getJacoby(mpz_t var, mpz_t p) {

    mpz_t varTmp, pTmp;

    mpz_init_set(varTmp, var);
    mpz_init_set(pTmp, p);

    int ret = 1;

    mpz_t tmp, tmp2;

    mpz_init(tmp);
    mpz_init(tmp2);
    
    if(mpz_cmp_ui(var, 0) == 0) {
        return 0;
    }

    if(mpz_cmp_ui(var, 0) < 0) {

        mpz_neg(varTmp, varTmp);
        mpz_mod_ui(tmp, pTmp, 4);

        if(mpz_cmp_ui(tmp, 3) == 0){
            ret = -ret;
        }
    }

    if(mpz_cmp_ui(varTmp, 1) == 0) {
        return ret;
    }
    
    while(mpz_cmp_ui(varTmp, 0) != 0) {

        if(mpz_cmp_ui(varTmp, 0) < 0) {

            mpz_neg(varTmp, varTmp);
            mpz_mod_ui(tmp, pTmp, 4);

            if(mpz_cmp_ui(tmp, 3) == 0) {

                ret = -ret;
            }
        }

        mpz_mod_ui(tmp, varTmp, 2);
        
        while(mpz_cmp_ui(tmp, 0) == 0) {

            mpz_div_ui(varTmp, varTmp, 2);
            mpz_mod_ui(tmp, pTmp, 8);
            if(mpz_cmp_ui(tmp, 3) == 0 || mpz_cmp_ui(tmp, 5) == 0){
                ret = -ret;
            }
            mpz_mod_ui(tmp, varTmp, 2);
        }

        mpz_swap(varTmp, pTmp);
        mpz_mod_ui(tmp, varTmp, 4);
        mpz_mod_ui(tmp2, pTmp, 4);

        if(mpz_cmp_ui(tmp, 3) == 0 && mpz_cmp_ui(tmp2, 3) == 0){
            ret = -ret;
        }

        mpz_mod(varTmp, varTmp, pTmp);
        mpz_div_ui(tmp, pTmp, 2);

        if(mpz_cmp(varTmp, tmp) > 0) {

            mpz_sub(varTmp, varTmp, pTmp);
        }

        mpz_cmp_ui(varTmp, 0);
    }

    mpz_clear(tmp);
    mpz_clear(tmp2);

    return (mpz_cmp_ui(pTmp, 1) == 0) ? ret : 0;
}

bool gcdCheck(mpz_t e, mpz_t phi) {

    mpz_t eTmp, phiTmp, gcd;

    mpz_init(eTmp);
    mpz_init(phiTmp);
    mpz_init(gcd);

    mpz_set(eTmp, e);
    mpz_set(phiTmp, phi);

    while(mpz_cmp_ui(phiTmp, 0) != 0) {
        mpz_set(gcd, phiTmp);
        mpz_mod(phiTmp, eTmp, phiTmp);
        mpz_set(eTmp, gcd);
    }

    return (mpz_get_ui(gcd) != 1);
}

void cypher(mpz_t exp, mpz_t key, mpz_t message) {

    mpz_t value;

    mpz_init(value);

    mpz_powm(value, message, exp, key);

    gmp_printf("0x%Zx\n", value);

    mpz_clear(value);
} 