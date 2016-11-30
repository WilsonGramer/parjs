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
var PrsWithState = (function (_super) {
    __extends(PrsWithState, _super);
    function PrsWithState(inner, reducer) {
        _super.call(this);
        this.inner = inner;
        this.reducer = reducer;
        this.displayName = "withState";
        this.isLoud = inner.isLoud;
    }
    PrsWithState.prototype._apply = function (ps) {
        var _a = this, inner = _a.inner, reducer = _a.reducer;
        inner.apply(ps);
        if (!ps.result.isOk) {
            return;
        }
        ps.state = reducer(ps.state, ps.value);
    };
    return PrsWithState;
}(parser_action_1.JaseParserAction));
exports.PrsWithState = PrsWithState;
//# sourceMappingURL=with-state.js.map