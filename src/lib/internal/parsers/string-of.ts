/**
 * @module parjs/internal/implementation/parsers
 */
/** */

import {ParsingState} from "../state";
import {ResultKind} from "../reply";
import {ParjserBase} from "../parser";
import {Parjser} from "../../parjser";

// TODO: rejection info
/**
 * Returns a parser that will parse any of the strings in `strs` and yield
 * the text that was parsed. If it can't, it will fail softly without consuming
 * input.
 * @param strs A set of string options to parse.
 */
export function anyStringOf(...strs: string[]): Parjser<string> {
    return new class StringOf extends ParjserBase {
        type = "anyStringOf";
        expecting = `any of ${strs.map(x => `'${x}'`).join(", ",)}`;

        _apply(ps: ParsingState) {
            let {position, input} = ps;
            strLoop:
                for (let i = 0; i < strs.length; i++) {
                    let curStr = strs[i];
                    if (input.length - position < curStr.length) continue;
                    for (let j = 0; j < curStr.length; j++) {
                        if (curStr.charCodeAt(j) !== input.charCodeAt(position + j)) {
                            continue strLoop;
                        }
                    }
                    // this means we did not contiue strLoop so curStr passed our tests
                    ps.position = position + curStr.length;
                    ps.value = curStr;
                    ps.kind = ResultKind.Ok;
                    return;
                }
            ps.kind = ResultKind.SoftFail;
        }

    }();
}
