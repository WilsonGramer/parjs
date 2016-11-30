"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var parser_action_1 = require("../../../base/parser-action");
/**
 * Created by User on 21-Nov-16.
 */
var PrsCharWhere = (function (_super) {
    __extends(PrsCharWhere, _super);
    function PrsCharWhere(predicate) {
        _super.call(this);
        this.predicate = predicate;
        this.displayName = "charWhere";
        this.isLoud = true;
    }
    PrsCharWhere.prototype._apply = function (ps) {
        var predicate = this.predicate;
        var position = ps.position, input = ps.input;
        if (position >= input.length)
            return false;
        var curChar = input[position];
        if (!predicate(curChar)) {
            ps.result = ResultKind.SoftFail;
            return;
        }
        ps.value = curChar;
        ps.position++;
        ps.result = ResultKind.OK;
    };
    return PrsCharWhere;
}(parser_action_1.JaseBaseParserAction));
exports.PrsCharWhere = PrsCharWhere;
//# sourceMappingURL=char-where.js.map