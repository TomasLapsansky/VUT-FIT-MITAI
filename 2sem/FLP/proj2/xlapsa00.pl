/**
 * Project 2 - FLP 2020 - NTS
 * Author: Tomas Lapsansky (xlapsa00)
 * Brno university of technology
 */

/* Rule saver */
:- dynamic rule/4.

/* Functions from FLP */
read_line(L,C) :-
	get_char(C),
	(isEOFEOL(C), L = [], !;
		read_line(LL,_),% atom_codes(C,[Cd]),
		[C|LL] = L).

isEOFEOL(C) :-
	C == end_of_file;
	(char_code(C,Code), Code==10).


read_lines(Ls) :-
	read_line(L,C),
	( C == end_of_file, Ls = [] ;
	  read_lines(LLs), Ls = [L|LLs]
	).
/* End Functions from FLP */

/* Checkers */
isEqual(A, A).
isEmpty([]).
isEmptyEmpty([[]]).

last([X], X).
last([_|Tails], Y) :- last(Tails, Y).

getSymbol([S|_], S).
getSymbol([], ' ').
/* End Checkers */

parse_rules([]) :- !.
parse_rules([X]) :-
    nth0(0, X, S),
    nth0(2, X, I),
    nth0(4, X, N),
    nth0(6, X, O),
    assertz(rule(S, I, N, O)).
parse_rules([X|Rules]) :-
    nth0(0, X, S),
    nth0(2, X, I),
    nth0(4, X, N),
    nth0(6, X, O),
    assertz(rule(S, I, N, O)),
    parse_rules(Rules).

/* NTS functions */
finish_nts([]) :- !, fail.
finish_nts(Tapes) :-
    write_tapes(Tapes),
    !, fail.

write_tapes([]).
write_tapes([Tape|Tapes]) :-
    write_tape(Tape),
    write_tapes(Tapes).

write_tape([Symbol]) :-
    writeln(Symbol).
write_tape([Symbol|Tails]) :-
    write(Symbol),
    write_tape(Tails).

run_nts(Tape) :-
    nts_steps([[Tape]]).

nts_steps([]) :-
    writeln('No solution founded'),
    !, fail.
nts_steps([Tapes|Tails]) :-
    nts_step(Tapes, NewTapes),
    (isEmptyEmpty(Tails) ->
        Tails1 = NewTapes
    ;   append(Tails, NewTapes, Tails1)
    ),
    nts_steps(Tails1).

nts_step(Tapes, NewTapes) :-
    last(Tapes, Tape),
    nts_get_state(Tape, S, I),
    findall([S, I, X, Y], rule(S, I, X, Y), DoRules),
    do_rules(DoRules, Tapes, NewTapes).
/* End NTS function */

/* Rules functions */
do_rules([], _, []).
do_rules([Rule|Rules], Tapes, NewTapes) :-
    last(Tapes, Tape),
    do_rule(Rule, Tape, NewTape, Finish),
    (Finish ->
        append(Tapes, [NewTape], EndTapes),
        finish_nts(EndTapes)
        ; true
    ),
    do_rules(Rules, Tapes, NewTapesTmp),
    (isEmpty(NewTape) ->
        NewTapes = NewTapesTmp
    ;   append(Tapes, [NewTape], TapesTmp),
        append([TapesTmp], NewTapesTmp, NewTapes)
    ).

do_rule(Rule, Tape, NewTape, Finish) :-
    nth0(2, Rule, F),
    (isEqual(F, 'F') ->
        Finish = true
        ; Finish = false
    ),
    nth0(3, Rule, X),
    (isEqual(X, 'L') ->
        do_rule_shift_left(Rule, Tape, NewTape)
    ;   (isEqual(X, 'R') ->
            do_rule_shift_right(Rule, Tape, NewTape)
        ;   do_rule_rewrite(Rule, Tape, NewTape)
        )
    ).
/* End Rules functions */

/* Rule rewrite */
do_rule_rewrite(Rule, Tape, NewTape) :-
    rewrite_helper_left(Rule, Tape, LeftTape),
    rewrite_helper_right(Rule, Tape, RightTape),
    append(LeftTape, RightTape, NewTape).

rewrite_helper_left(Rule, [Head|Tape], LeftTape) :-
    nth0(0, Rule, X),
    (isEqual(X, Head) ->
        nth0(2, Rule, LeftTapeTmp),
        LeftTape = [LeftTapeTmp]
    ;   rewrite_helper_left(Rule, Tape, LeftTapeTmp),
        append([Head], LeftTapeTmp, LeftTape)
    ).

rewrite_helper_right(Rule, [Head|Tape], RightTape) :-
    nth0(0, Rule, X),
    (isEqual(X, Head) ->
        rewrite_helper_right_2(Rule, Tape, RightTape)
    ;   rewrite_helper_right(Rule, Tape, RightTape)
    ).

rewrite_helper_right_2(Rule, [_|Tape], RightTape) :-
    nth0(3, Rule, X),
    (isEmpty(Tape) ->
        RightTapeTmp = [' '] /* Add blank symbol if rewriting last element */
        ; rewrite_helper_right_3(Rule, Tape, RightTapeTmp)
    ),
    append([X], RightTapeTmp, RightTape).

rewrite_helper_right_3(_, [], []).
rewrite_helper_right_3(Rule, [Head|Tape], RightTape) :-
    rewrite_helper_right_3(Rule, Tape, RightTapeTmp),
    append([Head], RightTapeTmp, RightTape).
/* End Rule rewrite */

/* Rule shift right */
do_rule_shift_right(Rule, Tape, NewTape) :-
    shift_right_helper_left(Rule, Tape, LeftTape),
    shift_right_helper_right(Rule, Tape, RightTape),
    append(LeftTape, RightTape, NewTape).

shift_right_helper_left(Rule, [Head|Tape], LeftTape) :-
    nth0(0, Rule, X),
    (isEqual(X, Head) ->
        LeftTape = []
    ;   shift_right_helper_left(Rule, Tape, LeftTapeTmp),
        append([Head], LeftTapeTmp, LeftTape)
    ).

shift_right_helper_right(Rule, [Head|Tape], RightTape) :-
    nth0(0, Rule, X),
    (isEqual(X, Head) ->
        shift_right_helper_right_2(Rule, Tape, RightTape)
    ;   shift_right_helper_right(Rule, Tape, RightTape)
    ).

shift_right_helper_right_2(Rule, [_], RightTape) :-
    nth0(2, Rule, X),
    RightTape = [' ', X, ' '].
shift_right_helper_right_2(Rule, [Head|Tape], RightTape) :-
    nth0(2, Rule, X),
    shift_right_helper_right_3(Rule, Tape, RightTapeTmp),
    append([Head, X], RightTapeTmp, RightTape).
    
shift_right_helper_right_3(_, [], []).
shift_right_helper_right_3(Rule, [Head|Tape], NewTape) :-
    shift_right_helper_right_3(Rule, Tape, NewTapeTmp),
    append([Head], NewTapeTmp, NewTape).
/* End Rule shift right */

/* Rule shift left */
do_rule_shift_left(Rule, [Head|Tape], NewTape) :-
    nth0(0, Rule, X),
    (isEqual(X, Head) ->
        NewTape = []
    ;   shift_left_helper(Rule, [Head|Tape], [], NewTape)
    ).

shift_left_helper(Rule, [Head1, Head2|Tape], LeftTape, NewTape) :-
    nth0(0, Rule, X),
    (isEqual(X, Head2) ->
        nth0(2, Rule, NewX),
        NewTapeTmp = [NewX, Head1|Tape],
        append(LeftTape, NewTapeTmp, NewTape)
    ;   append(LeftTape, [Head1], LeftTapeTmp),
        shift_left_helper(Rule, [Head2|Tape], LeftTapeTmp, NewTape)
    ).
/* End Rule shift left */

nts_get_state([S|Tails], State, Symbol) :-
    (char_type(S, upper) ->
        State = S,
        getSymbol(Tails, Symbol)
    ;   nts_get_state(Tails, State, Symbol)
    ).

/* Helper */
remove_last_line(L1, L2):-
    append(L2, [_], L1).

/* Main */
start :-
    prompt(_, ''),

    /* Load input */
    read_lines(LL),

    /* Load tape */
    last(LL, LoadTape),
    append(['S'], LoadTape, TapeTmp),
    append(TapeTmp, [' '], Tape),   % Add blank to end of the tape because of findAll

    /* Load rules */
    remove_last_line(LL, Rules),
    parse_rules(Rules),

    !,
    /* Run NTS */
    run_nts(Tape),

    halt.
