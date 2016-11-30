"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_1 = require("../implementation/common");
var BasicParsingResult = (function () {
    function BasicParsingResult(kind, value) {
        if (value === void 0) { value = undefined; }
        this.kind = kind;
        this.value = value;
    }
    Object.defineProperty(BasicParsingResult.prototype, "isOk", {
        get: function () {
            return this.kind === ResultKind.OK;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicParsingResult.prototype, "isSoft", {
        get: function () {
            return this.kind === ResultKind.SoftFail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicParsingResult.prototype, "isHard", {
        get: function () {
            return this.kind === ResultKind.HardFail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BasicParsingResult.prototype, "isFatal", {
        get: function () {
            return this.kind === ResultKind.FatalFail;
        },
        enumerable: true,
        configurable: true
    });
    return BasicParsingResult;
}());
var ResultsClass = (function () {
    function ResultsClass() {
    }
    return ResultsClass;
}());
exports.ResultsClass = ResultsClass;
var BasicParsingState = (function () {
    function BasicParsingState(input) {
        this.input = input;
        this.position = 0;
        this.state = undefined;
        this.value = undefined;
        this.result = undefined;
    }
    return BasicParsingState;
}());
exports.BasicParsingState = BasicParsingState;
/**
 * Created by lifeg on 23/11/2016.
 */
var JaseParserAction = (function () {
    function JaseParserAction() {
    }
    JaseParserAction.prototype.apply = function (ps) {
        var position = ps.position, state = ps.state;
        this._apply(ps);
        if (!ps.result.isOk) {
            ps.value = common_1.failReturn;
        }
    };
    return JaseParserAction;
}());
exports.JaseParserAction = JaseParserAction;
var JaseBaseParserAction = (function (_super) {
    __extends(JaseBaseParserAction, _super);
    function JaseBaseParserAction() {
        _super.apply(this, arguments);
        this.isLoud = true;
    }
    return JaseBaseParserAction;
}(JaseParserAction));
exports.JaseBaseParserAction = JaseBaseParserAction;
//# sourceMappingURL=parser-action.js.map