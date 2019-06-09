/**
 * @module parjs/internal/implementation/parsers
 */
/** */

import {ParsingState} from "../state";
import {ReplyKind} from "../../reply";
import {Parjser} from "../../loud";
import {ParjserBase} from "../parser";

export function regexp(origRegexp: RegExp): Parjser<string[]> {
    let flags = [origRegexp.ignoreCase && "i", origRegexp.multiline && "m"].filter(x => x).join("");
    let regexp = new RegExp(origRegexp.source, `${flags}y`);
    this.expecting = `input matching '${origRegexp.source}'`;
    return new class Regexp extends ParjserBase {
        type = "regexp";
        expecting = `input matching '${regexp.source}'`;
        _apply(ps: ParsingState) {
            let {input, position} = ps;
            regexp.lastIndex = position;
            let match = regexp.exec(input);
            if (!match) {
                ps.kind = ReplyKind.SoftFail;
                return;
            }
            ps.position += match[0].length;
            ps.value = match.slice();
            ps.kind = ReplyKind.Ok;
        }
    }();
}