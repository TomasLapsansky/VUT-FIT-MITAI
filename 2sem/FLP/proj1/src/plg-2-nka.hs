-- PLG-2-NKA Project FLP
--
-- Author: Tomas Lapsansky (xlapsa00)
-- Brno university of Technology 2019/2020
------------------------------------------

import System.Environment
import Control.Monad

import PLGmodule

parseArgs :: [String] -> (Integer, String)
-- stdIn
parseArgs [x]
  | x == "-i" = (0, [])
  | x == "-1" = (1, [])
  | x == "-2" = (2, [])
-- file
parseArgs [x, fileName]
  | x == "-i" = (0, fileName)
  | x == "-1" = (1, fileName)
  | x == "-2" = (2, fileName)
parseArgs _ = error "Invalid arguments"

main :: IO()
main = do
    -- Parse args
    argv <- getArgs
    let (args, inputSrc) = parseArgs argv

    input <- fmap lines $ if (inputSrc == [])
        then getContents
        else readFile inputSrc

    let grammar = PLGmodule.parseGrammar input

    case args of
        0 -> PLGmodule.printGrammar grammar
        1 -> PLGmodule.printGrammar $ PLGmodule.simplifyPLG grammar
        2 -> PLGmodule.printNka $ PLGmodule.simplifyPLG grammar

    return ()
    