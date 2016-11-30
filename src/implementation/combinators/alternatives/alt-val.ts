import {JaseParserAction} from "../../../base/parser-action";
import {Issues, failReturn} from "../../common";
/**
 * Created by lifeg on 23/11/2016.
 */

export class PrsAltVal extends JaseParserAction {
    displayName = "altVal";
    isLoud = true;
    constructor (private inner : AnyParserAction, private val : any) {
        super();
        inner.isLoud || Issues.quietParserNotPermitted(this);
    }

    _apply(ps : ParsingState) {
        let {inner, val} = this;
        inner.apply(ps);
        if (ps.result.isSoft) {
            //on soft failure, set the value and result to OK
            ps.value = val;
            ps.result = ResultKind.OK;
        }
        //on ok/hard/fatal, propagate the result.
    }
}