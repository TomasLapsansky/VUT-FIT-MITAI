#include <iostream> 
#include <string>
#include <getopt.h>

#include "rsa.hpp"

using namespace std;

int main(int argc, char* argv[]) {

    string arg = argv[1];

    if(arg == "-g" && argc == 3) {
        generate(stoi(argv[2]));
    } else if(arg == "-e" && argc == 5) {
        mpz_t exp, key, message;
        
        mpz_init(exp);
        mpz_init(key);
        mpz_init(message);

        mpz_set_str(exp, argv[2], 0);
        mpz_set_str(key, argv[3], 0);
        mpz_set_str(message, argv[4], 0);

        cypher(exp, key, message);
    } else if(arg == "-d" && argc == 5) {
        mpz_t exp, key, message;
        
        mpz_init(exp);
        mpz_init(key);
        mpz_init(message);

        mpz_set_str(exp, argv[2], 0);
        mpz_set_str(key, argv[3], 0);
        mpz_set_str(message, argv[4], 0);

        cypher(exp, key, message);
    } else {
        std::cerr << "Bad arguments" << std::endl;
    }

    return 0;
}