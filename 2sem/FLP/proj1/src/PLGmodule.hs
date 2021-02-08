-- PLG-2-NKA Project FLP
--
-- Author: Tomas Lapsansky (xlapsa00)
-- Brno university of Technology 2019/2020
------------------------------------------

module PLGmodule (
    Grammar(..),
    Rule(..),
    parseGrammar,
    simplifyPLG,
    printGrammar,
    printNka,
) where

import Prelude
import Data.Char
import Data.Ord
import Data.List
import Data.List.Split
import Control.Monad

-- Grammar data
data Grammar = Grammar {
    nonTerms :: [String],
    terms :: [String],
    start :: String,
    rules :: [Rule]
}

-- Grammar rules data
data Rule = Rule {
    left :: String,
    right :: String
}

-- NKA states data
data State = State {
    state :: String,
    rule :: String
}

-- Validation rules
isTerm = (`elem` ['a'..'z'])
isNonTerm = (`elem` ['A'..'Z'])

-- Grammar validation
validateGrammar :: Grammar -> Grammar
validateGrammar grammar =
    if (validateNonTerm (start grammar) (nonTerms grammar)) && (validateLeftSides grammar) && (validateRightSides grammar)
        then grammar
        else error "Invalid grammar"


-- Validate if left sides of rules are only nonTerms
validateLeftSides :: Grammar -> Bool
validateLeftSides grammar = null (filter (\r -> (not (validateNonTerm (left r) (nonTerms grammar)))) (rules grammar))

-- Validate right sides of rules
validateRightSides :: Grammar -> Bool
validateRightSides grammar = validateRightRules (rules grammar) (grammar)

-- Validate right sides rule by rule - helper
validateRightRules :: [Rule] -> Grammar -> Bool
validateRightRules [] _ = True
validateRightRules (x:xs) grammar =
    if (onlyTerms (right x) grammar || termsOneNonTerm (right x) grammar || epsilon (right x))
        then validateRightRules xs grammar
        else False

-- Validate if string contains only terms
onlyTerms :: String -> Grammar -> Bool
onlyTerms [] grammar = True
onlyTerms (x:xs) grammar =
    if (validateTerm [x] (terms grammar))
        then onlyTerms xs grammar
        else False

-- Validate if string contains n (0..) terms and 1 nonTerm
termsOneNonTerm :: String -> Grammar -> Bool
termsOneNonTerm (x:xs) grammar =
    if (length xs == 0) -- Only one lefts
        then validateNonTerm [x] (nonTerms grammar)
        else if (validateTerm [x] (terms grammar))
            then termsOneNonTerm xs grammar
            else False

-- Validate if string is epsilon
epsilon :: String -> Bool
epsilon x = (length x) == 1 && (x == "#")

-- Validate if string is term
validateTerm :: String -> [String] -> Bool
validateTerm check terms = check `elem` terms

-- Validate if string si nonTerm
validateNonTerm :: String -> [String] -> Bool
validateNonTerm check nonTerms = check `elem` nonTerms

-- Filter rules
getIdx :: [Rule] -> Integer
getIdx [] = 0
getIdx rules = read (drop 1 $ left (last rules)) :: Integer

-- Sorting rules
sortRules :: [Rule] -> [Rule]
sortRules = sortBy (comparing left)

-- TIN 3.2 - step 1.1
getBasicRules :: Grammar -> [Rule]
getBasicRules grammar = filter (\r -> (length (right r) == 2) && (isTerm $ (head (right r))) && (isNonTerm $ (last (right r)))) (rules grammar)

-- TIN 3.2 - step 1.2
getEpsRules :: Grammar -> [Rule]
getEpsRules grammar = filter (\r -> (length (right r) == 1) && ((right r) == "#")) (rules grammar)

-- TIN 3.2 - step 2 - get
getLongRulesNonTerm :: Grammar -> [Rule]
getLongRulesNonTerm grammar = filter (\r -> (length (right r) >= 3) && (isNonTerm $ (last (right r)))) (rules grammar)

-- TIN 3.2 - step 2 - main
simplifyLongRulesNonTerm :: [Rule] -> Integer -> [Rule]
simplifyLongRulesNonTerm (x:xs) idx = simpleRules ++ (simplifyLongRulesNonTerm xs) newIdx
    where   simpleRules = convertLongRulesNonTerm x idx
            newIdx = (getIdx simpleRules)
simplifyLongRulesNonTerm _ _ = []

-- TIN 3.2 - step 2 - convert
convertLongRulesNonTerm :: Rule -> Integer -> [Rule]
convertLongRulesNonTerm rule idx =
    if length (right rule) == 2
        then [rule]
        else [Rule {
            left = (left rule),
            right = [head (right rule)] ++ [head (left rule)] ++ show(idx+1)
        }] ++ convertLongRulesNonTerm (Rule ([head (left rule)] ++ show (idx+1)) (drop 1 (right rule))) (idx+1)

-- TIN 3.2 - step 3 - get
getLongRulesTerm :: Grammar -> [Rule]
getLongRulesTerm grammar = filter (\r -> (length (right r) >= 1) && checkLongRulesTerm (right r)) (rules grammar)

-- TIN 3.2 - step 3 - get 2
checkLongRulesTerm :: String -> Bool
checkLongRulesTerm (x:xs) = if isTerm x
    then checkLongRulesTerm xs
    else False
checkLongRulesTerm "" = True

-- TIN 3.2 - step 3 - main
simplifyLongRulesTerm :: [Rule] -> Integer -> [Rule]
simplifyLongRulesTerm (x:xs) idx = simpleRules ++ (simplifyLongRulesTerm xs) newIdx
    where   simpleRules = convertLongRulesTerm x idx
            newIdx = (getIdx simpleRules)
simplifyLongRulesTerm _ _ = []

-- TIN 3.2 - step 3 - convert
convertLongRulesTerm :: Rule -> Integer -> [Rule]
convertLongRulesTerm rule idx =
    if length (right rule) == 0
        then [Rule {left = left rule, right = "#"}]
        else [Rule {
            left = (left rule),
            right = [head (right rule)] ++ [head (left rule)] ++ show(idx+1)
        }] ++ convertLongRulesTerm (Rule ([head (left rule)] ++ show (idx+1)) (drop 1 (right rule))) (idx+1)

-- TIN 3.2 - step 4 - get
getSimpleRules :: [Rule] -> [Rule]
getSimpleRules rules = filter (\r -> isSimple r) (rules)

-- TIN 3.2 - step 4 - get 2
isSimple :: Rule -> Bool
isSimple rule = (isSimpleNTerm (left rule)) && (isSimpleNTerm (right rule))

-- TIN 3.2 - step 4 - get 3
isSimpleNTerm :: String -> Bool
isSimpleNTerm str = ((length str) == 1) && (isNonTerm (head str))

-- TIN 3.2 - step 4 - main
removeSimpleRules :: [Rule] -> [Rule]
removeSimpleRules rules =
    if (not (null (getSimpleRules rules)))
        then removeSimpleRules (replaceSimpleRule (head $ (getSimpleRules rules)) rules)
        else rules

-- TIN 3.2 - step 4 - main helper
replaceSimpleRule :: Rule -> [Rule] -> [Rule]
replaceSimpleRule simpleRule rules =
    removeRule simpleRule (rules ++ createRules (left simpleRule) (getRightSides simpleRule rules))

-- TIN 3.2 - step 4 - right sides of simple rules
getRightSides :: Rule -> [Rule] -> [Rule]
getRightSides simpleRule rules = (filter(\r -> (left r) == (right simpleRule)) (rules))

-- TIN 3.2 - step 4 - create new rules from simple rules
createRules :: String -> [Rule] -> [Rule]
createRules _ [] = []
createRules nonTerm (x:xs) = [Rule{
    left = nonTerm,
    right = right x
}] ++ (createRules nonTerm xs)

-- TIN 3.2 - step 4 - remove simple rules
removeRule :: Rule -> [Rule] -> [Rule]
removeRule rule rules = filter (\r -> ((right r) /= (right rule)) || ((left r) /= (left rule))) (rules)

-- NKA
    
-- NKA mapping function nonTerms -> numbers
mapStates :: [String] -> Integer -> [State]
mapStates (x:[]) idx = [State {state = show idx, rule = x}]
mapStates (x:xs) idx = [State {state = show idx, rule = x}] ++ mapStates xs (idx+1)

-- NKA get mapped states
getMappedStates :: [State] -> [String]
getMappedStates [] = []
getMappedStates (x:xs) = [state x] ++ getMappedStates xs

-- NKA get start state with mapping
getStartStateMap :: [State] -> String -> [State]
getStartStateMap states start = filter (\r -> ((rule r) == start)) (states)

-- NKA get end states with mapping
getFiniteStatesMap :: [State] -> [Rule] -> [State]
getFiniteStatesMap states rules = filter (\r -> (isFinite rules (rule r))) (states)

-- NKA get end states helper
isFinite :: [Rule] -> String -> Bool
isFinite (x:xs) rule = if (left x) == rule
    then True
    else isFinite xs rule
isFinite [] _ = False

-- NKA transform rules and print
transformNKARules :: [State] -> [Rule] -> IO()
transformNKARules s r = do
    let rules = transNKArule r s
    putStrLn (intercalate "\n" (rules))

-- NKA get transformed rules
transNKArule :: [Rule] -> [State] -> [String]
transNKArule [] states = []
transNKArule (x:xs) states =
    if (length (right x)) == 1 -- eps rule
        then transNKArule xs states
        else
            [((getMapState (left x) states)++","++[head (right x)]++","++(getMapState (drop 1 (right x)) states))] ++ transNKArule xs states

-- NKA mapper
getMapState :: String -> [State] -> String
getMapState searched states = state (head (filter (\r -> (rule r) == searched) (states)))

-- Load grammar to data block
parseGrammar :: [String] -> Grammar
parseGrammar (nonTerms : terms : start : rules) = validateGrammar Grammar {
    nonTerms = splitOn "," nonTerms,
    terms = splitOn "," terms,
    start = start,
    rules = parseRules rules
}
parseGrammar _ = error "Invalid grammar"

-- Parse rules to data block
parseRules :: [String] -> [Rule]
parseRules input = map parseRule input

-- Parse rule < parseRules
parseRule :: String -> Rule
parseRule input
    | (isInfixOf "->" input) /= True = error "Invalid grammar"
    | otherwise = Rule {
        left = partLeft,
        right = partRight
      }
      where split = splitOn "->" input
            partLeft = head split
            partRight = last split

-- Print Grammar to STDOUT
printGrammar :: Grammar -> IO()
printGrammar grammar = do
    putStrLn (intercalate "," (nonTerms grammar))
    putStrLn (intercalate "," (terms grammar))
    putStrLn (start grammar)
    forM_ (rules grammar) $ \s -> do
        putStrLn $ ((left s) ++ "->" ++ (right s))

-- Print Grammar converted to NKA to STDOUT
printNka :: Grammar -> IO()
printNka grammar = do
    let states = mapStates (nonTerms grammar) 1
    let printStates = getMappedStates states
    let finiteStates = getMappedStates (getFiniteStatesMap states (getEpsRules (grammar)))
    putStrLn (intercalate "," (printStates))
    putStrLn (state (head (getStartStateMap states (start grammar))))
    putStrLn (intercalate "," (finiteStates))
    transformNKARules states (rules grammar)

-- TIN 3.2
simplifyPLG :: Grammar -> Grammar
simplifyPLG grammar = Grammar {
        terms = terms grammar,
        start = start grammar,
        rules = sortRules (removeSimpleRules (transformRules grammar)),
        nonTerms = sort (nub (map left (transformRules grammar)))
    }

-- TIN 3.2 - transformation
transformRules :: Grammar -> [Rule]
transformRules grammar = p1 ++ p1eps ++ p2 ++ p3 ++ p4
    where   p1 = getBasicRules grammar
            p1eps = getEpsRules grammar
            p2 = simplifyLongRulesNonTerm (getLongRulesNonTerm grammar) 1
            p3 = simplifyLongRulesTerm (getLongRulesTerm grammar) (getIdx p2)
            p4 = getSimpleRules (rules grammar)
