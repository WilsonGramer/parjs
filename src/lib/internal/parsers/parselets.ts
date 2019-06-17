/**
 * @module parjs/internal/implementation/parsers
 */
/** */
import {
    isDigitCode,
    AsciiCodes
} from "char-info/ascii";
import {ParsingState} from "../state";

/**
 * Parsing helper.
 */
export class ParseletsType {

    parseDigitsInBase(ps: ParsingState, base: number) {
        let {position, input} = ps;
        let length = input.length;
        let result = 0;
        for (; position < length; position++) {
            let curCode = input.charCodeAt(position);
            if (!isDigitCode(curCode, base)) {
                break;
            }
        }
        ps.position = position;
        return result;
    }

    /**
     * Tries to parse a '+' or '-'. Returns the sign that was parsed, or 0 if the parsing failed.
     * @param ps
     * @returns {number}
     */
    parseSign(ps: ParsingState) {
        let sign = 0;
        let curChar = ps.input.charCodeAt(ps.position);
        if (curChar === AsciiCodes.minus) {
            sign = -1;
            ps.position++;
        } else if (curChar === AsciiCodes.plus) {
            ps.position++;
            sign = 1;
        }
        return sign;
    }
}

export const Parselets = new ParseletsType();
