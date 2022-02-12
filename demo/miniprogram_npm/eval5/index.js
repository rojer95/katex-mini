module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1644647847424, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Interpreter", {
  enumerable: true,
  get: function get() {
    return _main.Interpreter;
  }
});
Object.defineProperty(exports, "evaluate", {
  enumerable: true,
  get: function get() {
    return _evaluate.default;
  }
});
Object.defineProperty(exports, "Function", {
  enumerable: true,
  get: function get() {
    return _Function.default;
  }
});
exports.vm = exports.default = void 0;

var _main = require("./interpreter/main");

var vm = _interopRequireWildcard(require("./vm"));

exports.vm = vm;

var _evaluate = _interopRequireDefault(require("./evaluate"));

var _Function = _interopRequireDefault(require("./Function"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = _evaluate.default;
exports.default = _default;
}, function(modId) {var map = {"./interpreter/main":1644647847425,"./vm":1644647847427,"./evaluate":1644647847428,"./Function":1644647847429}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1644647847425, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Interpreter = void 0;

var _acorn = require("acorn");

var _messages = require("./messages");

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var version = "1.4.7";

function defineFunctionName(func, name) {
  Object.defineProperty(func, "name", {
    value: name,
    writable: false,
    enumerable: false,
    configurable: true
  });
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
var Break = Symbol("Break");
var Continue = Symbol("Continue");
var DefaultCase = Symbol("DefaultCase");
var EmptyStatementReturn = Symbol("EmptyStatementReturn");
var WithScopeName = Symbol("WithScopeName");
var SuperScopeName = Symbol("SuperScopeName");
var RootScopeName = Symbol("RootScopeName");
var GlobalScopeName = Symbol("GlobalScopeName");

function isFunction(func) {
  return typeof func === "function";
}

var InternalInterpreterReflection =
/*#__PURE__*/
function () {
  function InternalInterpreterReflection(interpreter) {
    this.interpreter = interpreter;
  }

  var _proto = InternalInterpreterReflection.prototype;

  _proto.generator = function generator() {
    var interpreter = this.interpreter;

    function getCurrentScope() {
      return this.getCurrentScope();
    }

    function getGlobalScope() {
      return this.getGlobalScope();
    }

    function getCurrentContext() {
      return this.getCurrentContext();
    }

    return {
      getOptions: interpreter.getOptions.bind(interpreter),
      getCurrentScope: getCurrentScope.bind(interpreter),
      getGlobalScope: getGlobalScope.bind(interpreter),
      getCurrentContext: getCurrentContext.bind(interpreter),
      getExecStartTime: interpreter.getExecStartTime.bind(interpreter)
    };
  };

  return InternalInterpreterReflection;
}();

function internalEval(reflection, code, useGlobalScope) {
  if (useGlobalScope === void 0) {
    useGlobalScope = true;
  }

  if (!(reflection instanceof InternalInterpreterReflection)) {
    throw new Error("Illegal call");
  }

  if (typeof code !== "string") return code;
  if (!code) return void 0;
  var instance = reflection.generator();
  var opts = instance.getOptions();
  var options = {
    timeout: opts.timeout,
    _initEnv: function _initEnv() {
      // set caller context
      if (!useGlobalScope) {
        this.setCurrentContext(instance.getCurrentContext());
      } // share timeout


      this.execStartTime = instance.getExecStartTime();
      this.execEndTime = this.execStartTime;
    }
  };
  var currentScope = useGlobalScope ? instance.getGlobalScope() : instance.getCurrentScope();
  var interpreter = new Interpreter(currentScope, options);
  return interpreter.evaluate(code);
}

Object.defineProperty(internalEval, "__IS_EVAL_FUNC", {
  value: true,
  writable: false,
  enumerable: false,
  configurable: false
});

function internalFunction(reflection) {
  if (!(reflection instanceof InternalInterpreterReflection)) {
    throw new Error("Illegal call");
  }

  var instance = reflection.generator();

  for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    params[_key - 1] = arguments[_key];
  }

  var code = params.pop();
  var interpreter = new Interpreter(instance.getGlobalScope(), instance.getOptions());
  var wrapCode = "\n\t\t    (function anonymous(" + params.join(",") + "){\n\t\t        " + code + "\n\t\t    });\n\t\t    ";
  return interpreter.evaluate(wrapCode);
}

Object.defineProperty(internalFunction, "__IS_FUNCTION_FUNC", {
  value: true,
  writable: false,
  enumerable: false,
  configurable: false
});

var Return = function Return(value) {
  this.value = value;
};

var BreakLabel = function BreakLabel(value) {
  this.value = value;
};

var ContinueLabel = function ContinueLabel(value) {
  this.value = value;
};
/**
 * scope chain
 *
 * superScope
 *     ↓
 * rootScope
 *     ↓
 * globalScope
 *     ↓
 * functionScope
 *
 */


var Scope = function Scope(data, parent, name) {
  if (parent === void 0) {
    parent = null;
  }

  this.name = name;
  this.parent = parent;
  this.data = data;
  this.labelStack = [];
};

function noop() {}

function createScope(parent, name) {
  if (parent === void 0) {
    parent = null;
  }

  return new Scope(Object.create(null), parent, name);
}

function createRootContext(data) {
  return Object.create(data);
}

var BuildInObjects = {
  NaN: NaN,
  Infinity: Infinity,
  undefined: undefined,
  // null,
  Object: Object,
  Array: Array,
  String: String,
  Boolean: Boolean,
  Number: Number,
  Date: Date,
  RegExp: RegExp,
  Error: Error,
  URIError: URIError,
  TypeError: TypeError,
  RangeError: RangeError,
  SyntaxError: SyntaxError,
  ReferenceError: ReferenceError,
  Math: Math,
  parseInt: parseInt,
  parseFloat: parseFloat,
  isNaN: isNaN,
  isFinite: isFinite,
  decodeURI: decodeURI,
  decodeURIComponent: decodeURIComponent,
  encodeURI: encodeURI,
  encodeURIComponent: encodeURIComponent,
  escape: escape,
  unescape: unescape,
  eval: internalEval,
  Function: internalFunction
}; // ES5 Object

if (typeof JSON !== "undefined") {
  BuildInObjects.JSON = JSON;
} //ES6 Object


if (typeof Promise !== "undefined") {
  BuildInObjects.Promise = Promise;
}

if (typeof Set !== "undefined") {
  BuildInObjects.Set = Set;
}

if (typeof Map !== "undefined") {
  BuildInObjects.Map = Map;
}

if (typeof Symbol !== "undefined") {
  BuildInObjects.Symbol = Symbol;
}

if (typeof Proxy !== "undefined") {
  BuildInObjects.Proxy = Proxy;
}

if (typeof WeakMap !== "undefined") {
  BuildInObjects.WeakMap = WeakMap;
}

if (typeof WeakSet !== "undefined") {
  BuildInObjects.WeakSet = WeakSet;
}

if (typeof Reflect !== "undefined") {
  BuildInObjects.Reflect = Reflect;
}

var Interpreter =
/*#__PURE__*/
function () {
  function Interpreter(context, options) {
    if (context === void 0) {
      context = Interpreter.global;
    }

    if (options === void 0) {
      options = {};
    }

    this.sourceList = [];
    this.collectDeclVars = Object.create(null);
    this.collectDeclFuncs = Object.create(null);
    this.isVarDeclMode = false;
    this.lastExecNode = null;
    this.isRunning = false;
    this.options = {
      ecmaVersion: options.ecmaVersion || Interpreter.ecmaVersion,
      timeout: options.timeout || 0,
      rootContext: options.rootContext,
      globalContextInFunction: options.globalContextInFunction === undefined ? Interpreter.globalContextInFunction : options.globalContextInFunction,
      _initEnv: options._initEnv
    };
    this.context = context || Object.create(null);
    this.callStack = [];
    this.initEnvironment(this.context);
  }

  var _proto2 = Interpreter.prototype;

  _proto2.initEnvironment = function initEnvironment(ctx) {
    var scope; //init global scope

    if (ctx instanceof Scope) {
      scope = ctx;
    } else {
      var rootScope = null;
      var superScope = this.createSuperScope(ctx);

      if (this.options.rootContext) {
        rootScope = new Scope(createRootContext(this.options.rootContext), superScope, RootScopeName);
      }

      scope = new Scope(ctx, rootScope || superScope, GlobalScopeName);
    }

    this.globalScope = scope;
    this.currentScope = this.globalScope; //init global context to this

    this.globalContext = scope.data;
    this.currentContext = scope.data; // collect var/function declare

    this.collectDeclVars = Object.create(null);
    this.collectDeclFuncs = Object.create(null);
    this.execStartTime = Date.now();
    this.execEndTime = this.execStartTime;
    var _initEnv = this.options._initEnv;

    if (_initEnv) {
      _initEnv.call(this);
    }
  };

  _proto2.getExecStartTime = function getExecStartTime() {
    return this.execStartTime;
  };

  _proto2.getExecutionTime = function getExecutionTime() {
    return this.execEndTime - this.execStartTime;
  };

  _proto2.setExecTimeout = function setExecTimeout(timeout) {
    if (timeout === void 0) {
      timeout = 0;
    }

    this.options.timeout = timeout;
  };

  _proto2.getOptions = function getOptions() {
    return this.options;
  };

  _proto2.getGlobalScope = function getGlobalScope() {
    return this.globalScope;
  };

  _proto2.getCurrentScope = function getCurrentScope() {
    return this.currentScope;
  };

  _proto2.getCurrentContext = function getCurrentContext() {
    return this.currentContext;
  };

  _proto2.isInterruptThrow = function isInterruptThrow(err) {
    return err instanceof _messages.InterruptThrowError || err instanceof _messages.InterruptThrowReferenceError || err instanceof _messages.InterruptThrowSyntaxError;
  };

  _proto2.createSuperScope = function createSuperScope(ctx) {
    var data = Object.assign({}, BuildInObjects);
    var buildInObjectKeys = Object.keys(data);
    buildInObjectKeys.forEach(function (key) {
      if (key in ctx) {
        delete data[key];
      }
    });
    return new Scope(data, null, SuperScopeName);
  };

  _proto2.setCurrentContext = function setCurrentContext(ctx) {
    this.currentContext = ctx;
  };

  _proto2.setCurrentScope = function setCurrentScope(scope) {
    this.currentScope = scope;
  };

  _proto2.evaluate = function evaluate(code) {
    if (code === void 0) {
      code = "";
    }

    var node;
    if (!code) return;
    node = (0, _acorn.parse)(code, {
      ranges: true,
      locations: true,
      ecmaVersion: this.options.ecmaVersion || Interpreter.ecmaVersion
    });
    return this.evaluateNode(node, code);
  };

  _proto2.appendCode = function appendCode(code) {
    return this.evaluate(code);
  };

  _proto2.evaluateNode = function evaluateNode(node, source) {
    var _this = this;

    if (source === void 0) {
      source = "";
    }

    this.value = undefined;
    this.source = source;
    this.sourceList.push(source);
    this.isRunning = true; //reset timeout

    this.execStartTime = Date.now();
    this.execEndTime = this.execStartTime; // reset

    this.collectDeclVars = Object.create(null);
    this.collectDeclFuncs = Object.create(null);
    var currentScope = this.getCurrentScope();
    var currentContext = this.getCurrentContext();
    var labelStack = currentScope.labelStack.concat([]);
    var callStack = this.callStack.concat([]);

    var reset = function reset() {
      _this.setCurrentScope(currentScope); //reset scope


      _this.setCurrentContext(currentContext); //reset context


      currentScope.labelStack = labelStack; //reset label stack

      _this.callStack = callStack; //reset call stack
    }; // start run


    try {
      var bodyClosure = this.createClosure(node); // add declares to data

      this.addDeclarationsToScope(this.collectDeclVars, this.collectDeclFuncs, this.getCurrentScope());
      bodyClosure();
    } catch (e) {
      throw e;
    } finally {
      reset();
      this.execEndTime = Date.now();
    }

    this.isRunning = false;
    return this.getValue();
  };

  _proto2.createErrorMessage = function createErrorMessage(msg, value, node) {
    var message = msg[1].replace("%0", String(value));

    if (node !== null) {
      message += this.getNodePosition(node || this.lastExecNode);
    }

    return message;
  };

  _proto2.createError = function createError(message, error) {
    return new error(message);
  };

  _proto2.createThrowError = function createThrowError(message, error) {
    return this.createError(message, error);
  };

  _proto2.createInternalThrowError = function createInternalThrowError(msg, value, node) {
    return this.createError(this.createErrorMessage(msg, value, node), msg[2]);
  };

  _proto2.checkTimeout = function checkTimeout() {
    if (!this.isRunning) return false;
    var timeout = this.options.timeout || 0;
    var now = Date.now();

    if (now - this.execStartTime > timeout) {
      return true;
    }

    return false;
  };

  _proto2.getNodePosition = function getNodePosition(node) {
    if (node) {
      var errorCode = ""; //this.source.slice(node.start, node.end);

      return node.loc ? " [" + node.loc.start.line + ":" + node.loc.start.column + "]" + errorCode : "";
    }

    return "";
  };

  _proto2.createClosure = function createClosure(node) {
    var _this2 = this;

    var closure;

    switch (node.type) {
      case "BinaryExpression":
        closure = this.binaryExpressionHandler(node);
        break;

      case "LogicalExpression":
        closure = this.logicalExpressionHandler(node);
        break;

      case "UnaryExpression":
        closure = this.unaryExpressionHandler(node);
        break;

      case "UpdateExpression":
        closure = this.updateExpressionHandler(node);
        break;

      case "ObjectExpression":
        closure = this.objectExpressionHandler(node);
        break;

      case "ArrayExpression":
        closure = this.arrayExpressionHandler(node);
        break;

      case "CallExpression":
        closure = this.callExpressionHandler(node);
        break;

      case "NewExpression":
        closure = this.newExpressionHandler(node);
        break;

      case "MemberExpression":
        closure = this.memberExpressionHandler(node);
        break;

      case "ThisExpression":
        closure = this.thisExpressionHandler(node);
        break;

      case "SequenceExpression":
        closure = this.sequenceExpressionHandler(node);
        break;

      case "Literal":
        closure = this.literalHandler(node);
        break;

      case "Identifier":
        closure = this.identifierHandler(node);
        break;

      case "AssignmentExpression":
        closure = this.assignmentExpressionHandler(node);
        break;

      case "FunctionDeclaration":
        closure = this.functionDeclarationHandler(node);
        break;

      case "VariableDeclaration":
        closure = this.variableDeclarationHandler(node);
        break;

      case "BlockStatement":
      case "Program":
        closure = this.programHandler(node);
        break;

      case "ExpressionStatement":
        closure = this.expressionStatementHandler(node);
        break;

      case "EmptyStatement":
        closure = this.emptyStatementHandler(node);
        break;

      case "ReturnStatement":
        closure = this.returnStatementHandler(node);
        break;

      case "FunctionExpression":
        closure = this.functionExpressionHandler(node);
        break;

      case "IfStatement":
        closure = this.ifStatementHandler(node);
        break;

      case "ConditionalExpression":
        closure = this.conditionalExpressionHandler(node);
        break;

      case "ForStatement":
        closure = this.forStatementHandler(node);
        break;

      case "WhileStatement":
        closure = this.whileStatementHandler(node);
        break;

      case "DoWhileStatement":
        closure = this.doWhileStatementHandler(node);
        break;

      case "ForInStatement":
        closure = this.forInStatementHandler(node);
        break;

      case "WithStatement":
        closure = this.withStatementHandler(node);
        break;

      case "ThrowStatement":
        closure = this.throwStatementHandler(node);
        break;

      case "TryStatement":
        closure = this.tryStatementHandler(node);
        break;

      case "ContinueStatement":
        closure = this.continueStatementHandler(node);
        break;

      case "BreakStatement":
        closure = this.breakStatementHandler(node);
        break;

      case "SwitchStatement":
        closure = this.switchStatementHandler(node);
        break;

      case "LabeledStatement":
        closure = this.labeledStatementHandler(node);
        break;

      case "DebuggerStatement":
        closure = this.debuggerStatementHandler(node);
        break;

      default:
        throw this.createInternalThrowError(_messages.Messages.NodeTypeSyntaxError, node.type, node);
    }

    return function () {
      var timeout = _this2.options.timeout;

      if (timeout && timeout > 0 && _this2.checkTimeout()) {
        throw _this2.createInternalThrowError(_messages.Messages.ExecutionTimeOutError, timeout, null);
      }

      _this2.lastExecNode = node;
      return closure.apply(void 0, arguments);
    };
  } // a==b a/b
  ;

  _proto2.binaryExpressionHandler = function binaryExpressionHandler(node) {
    var _this3 = this;

    var leftExpression = this.createClosure(node.left);
    var rightExpression = this.createClosure(node.right);
    return function () {
      var leftValue = leftExpression();
      var rightValue = rightExpression();

      switch (node.operator) {
        case "==":
          return leftValue == rightValue;

        case "!=":
          return leftValue != rightValue;

        case "===":
          return leftValue === rightValue;

        case "!==":
          return leftValue !== rightValue;

        case "<":
          return leftValue < rightValue;

        case "<=":
          return leftValue <= rightValue;

        case ">":
          return leftValue > rightValue;

        case ">=":
          return leftValue >= rightValue;

        case "<<":
          return leftValue << rightValue;

        case ">>":
          return leftValue >> rightValue;

        case ">>>":
          return leftValue >>> rightValue;

        case "+":
          return leftValue + rightValue;

        case "-":
          return leftValue - rightValue;

        case "*":
          return leftValue * rightValue;

        case "**":
          return Math.pow(leftValue, rightValue);

        case "/":
          return leftValue / rightValue;

        case "%":
          return leftValue % rightValue;

        case "|":
          return leftValue | rightValue;

        case "^":
          return leftValue ^ rightValue;

        case "&":
          return leftValue & rightValue;

        case "in":
          return leftValue in rightValue;

        case "instanceof":
          return leftValue instanceof rightValue;

        default:
          throw _this3.createInternalThrowError(_messages.Messages.BinaryOperatorSyntaxError, node.operator, node);
      }
    };
  } // a && b
  ;

  _proto2.logicalExpressionHandler = function logicalExpressionHandler(node) {
    var _this4 = this;

    var leftExpression = this.createClosure(node.left);
    var rightExpression = this.createClosure(node.right);
    return function () {
      switch (node.operator) {
        case "||":
          return leftExpression() || rightExpression();

        case "&&":
          return leftExpression() && rightExpression();

        default:
          throw _this4.createInternalThrowError(_messages.Messages.LogicalOperatorSyntaxError, node.operator, node);
      }
    };
  } // protected isRootScope(node: ESTree.Expression | ESTree.Pattern): boolean {
  // 	if (node.type === "Identifier") {
  // 		const scope = this.getScopeFromName(node.name, this.getCurrentScope());
  // 		return scope.name === "rootScope";
  // 	}
  // 	return false;
  // }
  // typeof a !a()
  ;

  _proto2.unaryExpressionHandler = function unaryExpressionHandler(node) {
    var _this5 = this;

    switch (node.operator) {
      case "delete":
        var objectGetter = this.createObjectGetter(node.argument);
        var nameGetter = this.createNameGetter(node.argument);
        return function () {
          // not allowed to delete root scope property
          // rootContext has move to prototype chai, so no judgment required
          // if (this.isRootScope(node.argument)) {
          // 	return false;
          // }
          var obj = objectGetter();
          var name = nameGetter();
          return delete obj[name];
        };

      default:
        var expression; // for typeof undefined var
        // typeof adf9ad

        if (node.operator === "typeof" && node.argument.type === "Identifier") {
          var _objectGetter = this.createObjectGetter(node.argument);

          var _nameGetter = this.createNameGetter(node.argument);

          expression = function expression() {
            return _objectGetter()[_nameGetter()];
          };
        } else {
          expression = this.createClosure(node.argument);
        }

        return function () {
          var value = expression();

          switch (node.operator) {
            case "-":
              return -value;

            case "+":
              return +value;

            case "!":
              return !value;

            case "~":
              return ~value;

            case "void":
              return void value;

            case "typeof":
              return typeof value;

            default:
              throw _this5.createInternalThrowError(_messages.Messages.UnaryOperatorSyntaxError, node.operator, node);
          }
        };
    }
  } // ++a --a
  ;

  _proto2.updateExpressionHandler = function updateExpressionHandler(node) {
    var _this6 = this;

    var objectGetter = this.createObjectGetter(node.argument);
    var nameGetter = this.createNameGetter(node.argument);
    return function () {
      var obj = objectGetter();
      var name = nameGetter();

      _this6.assertVariable(obj, name, node);

      switch (node.operator) {
        case "++":
          return node.prefix ? ++obj[name] : obj[name]++;

        case "--":
          return node.prefix ? --obj[name] : obj[name]--;

        default:
          throw _this6.createInternalThrowError(_messages.Messages.UpdateOperatorSyntaxError, node.operator, node);
      }
    };
  } // var o = {a: 1, b: 's', get name(){}, set name(){}  ...}
  ;

  _proto2.objectExpressionHandler = function objectExpressionHandler(node) {
    var _this7 = this;

    var items = [];

    function getKey(keyNode) {
      if (keyNode.type === "Identifier") {
        // var o = {a:1}
        return keyNode.name;
      } else if (keyNode.type === "Literal") {
        // var o = {"a":1}
        return keyNode.value;
      } else {
        return this.throwError(_messages.Messages.ObjectStructureSyntaxError, keyNode.type, keyNode);
      }
    } // collect value, getter, and/or setter.


    var properties = Object.create(null);
    node.properties.forEach(function (property) {
      var kind = property.kind;
      var key = getKey(property.key);

      if (!properties[key] || kind === "init") {
        properties[key] = {};
      }

      properties[key][kind] = _this7.createClosure(property.value);
      items.push({
        key: key,
        property: property
      });
    });
    return function () {
      var result = {};
      var len = items.length;

      for (var i = 0; i < len; i++) {
        var item = items[i];
        var key = item.key;
        var kinds = properties[key];
        var value = kinds.init ? kinds.init() : undefined;
        var getter = kinds.get ? kinds.get() : function () {};
        var setter = kinds.set ? kinds.set() : function (a) {};

        if ("set" in kinds || "get" in kinds) {
          var descriptor = {
            configurable: true,
            enumerable: true,
            get: getter,
            set: setter
          };
          Object.defineProperty(result, key, descriptor);
        } else {
          var property = item.property;
          var kind = property.kind; // set function.name
          // var d = { test(){} }
          // var d = { test: function(){} }

          if (property.key.type === "Identifier" && property.value.type === "FunctionExpression" && kind === "init" && !property.value.id) {
            defineFunctionName(value, property.key.name);
          }

          result[key] = value;
        }
      }

      return result;
    };
  } // [1,2,3]
  ;

  _proto2.arrayExpressionHandler = function arrayExpressionHandler(node) {
    var _this8 = this;

    //fix: [,,,1,2]
    var items = node.elements.map(function (element) {
      return element ? _this8.createClosure(element) : element;
    });
    return function () {
      var len = items.length;
      var result = Array(len);

      for (var i = 0; i < len; i++) {
        var item = items[i];

        if (item) {
          result[i] = item();
        }
      }

      return result;
    };
  };

  _proto2.safeObjectGet = function safeObjectGet(obj, key, node) {
    return obj[key];
  };

  _proto2.createCallFunctionGetter = function createCallFunctionGetter(node) {
    var _this9 = this;

    switch (node.type) {
      case "MemberExpression":
        var objectGetter = this.createClosure(node.object);
        var keyGetter = this.createMemberKeyGetter(node);
        var source = this.source;
        return function () {
          var obj = objectGetter();
          var key = keyGetter();

          var func = _this9.safeObjectGet(obj, key, node);

          if (!func || !isFunction(func)) {
            var name = source.slice(node.start, node.end);
            throw _this9.createInternalThrowError(_messages.Messages.FunctionUndefinedReferenceError, name, node);
          } // obj.eval = eval
          // obj.eval(...)


          if (func.__IS_EVAL_FUNC) {
            return function (code) {
              return func(new InternalInterpreterReflection(_this9), code, true);
            };
          } // obj.func = Function
          // obj.func(...)


          if (func.__IS_FUNCTION_FUNC) {
            return function () {
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }

              return func.apply(void 0, [new InternalInterpreterReflection(_this9)].concat(args));
            };
          } // method call
          // eg：obj.say(...)
          // eg: obj.say.call(...)
          // eg: obj.say.apply(...)
          // ======================
          // obj.func(...)
          // func = func.bind(obj)
          // tips:
          // func(...) -> func.bind(obj)(...)
          // func.call(...) -> obj.func.call.bind(obj.func)(...)
          // func.apply(...) -> obj.func.apply.bind(obj.func)(...)
          // ...others


          return func.bind(obj);
        };

      default:
        // test() or (0,test)() or a[1]() ...
        var closure = this.createClosure(node);
        return function () {
          var name = "";

          if (node.type === "Identifier") {
            name = node.name;
          } // const name: string = (<ESTree.Identifier>node).name;


          var func = closure();

          if (!func || !isFunction(func)) {
            throw _this9.createInternalThrowError(_messages.Messages.FunctionUndefinedReferenceError, name, node);
          } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval
          // var eval = eval;
          // function test(){
          //    eval(...); //note: use local scope in eval5，but in Browser is use global scope
          // }


          if (node.type === "Identifier" && func.__IS_EVAL_FUNC && name === "eval") {
            return function (code) {
              var scope = _this9.getScopeFromName(name, _this9.getCurrentScope());

              var useGlobalScope = scope.name === SuperScopeName || // !scope.parent || // super scope
              scope.name === GlobalScopeName || // this.globalScope === scope ||
              scope.name === RootScopeName; // use local scope if calling eval in super scope

              return func(new InternalInterpreterReflection(_this9), code, !useGlobalScope);
            };
          } // use global scope
          // var g_eval = eval;
          // g_eval("a+1");
          //(0,eval)(...) ...eval alias


          if (func.__IS_EVAL_FUNC) {
            return function (code) {
              return func(new InternalInterpreterReflection(_this9), code, true);
            };
          } // Function('a', 'b', 'return a+b')


          if (func.__IS_FUNCTION_FUNC) {
            return function () {
              for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
              }

              return func.apply(void 0, [new InternalInterpreterReflection(_this9)].concat(args));
            };
          }

          var ctx = _this9.options.globalContextInFunction; // with(obj) {
          //     test() // test.call(obj, ...)
          // }

          if (node.type === "Identifier") {
            var scope = _this9.getIdentifierScope(node);

            if (scope.name === WithScopeName) {
              ctx = scope.data;
            }
          } // function call
          // this = undefined
          // tips:
          // test(...) === test.call(undefined, ...)
          // fix: alert.call({}, ...) Illegal invocation


          return func.bind(ctx);
        };
    }
  } // func()
  ;

  _proto2.callExpressionHandler = function callExpressionHandler(node) {
    var _this10 = this;

    var funcGetter = this.createCallFunctionGetter(node.callee);
    var argsGetter = node.arguments.map(function (arg) {
      return _this10.createClosure(arg);
    });
    return function () {
      return funcGetter().apply(void 0, argsGetter.map(function (arg) {
        return arg();
      }));
    };
  } // var f = function() {...}
  ;

  _proto2.functionExpressionHandler = function functionExpressionHandler(node) {
    var _this11 = this;

    var self = this;
    var source = this.source;
    var oldDeclVars = this.collectDeclVars;
    var oldDeclFuncs = this.collectDeclFuncs;
    this.collectDeclVars = Object.create(null);
    this.collectDeclFuncs = Object.create(null);
    var name = node.id ? node.id.name : "";
    /**anonymous*/

    var paramLength = node.params.length;
    var paramsGetter = node.params.map(function (param) {
      return _this11.createParamNameGetter(param);
    }); // set scope

    var bodyClosure = this.createClosure(node.body);
    var declVars = this.collectDeclVars;
    var declFuncs = this.collectDeclFuncs;
    this.collectDeclVars = oldDeclVars;
    this.collectDeclFuncs = oldDeclFuncs;
    return function () {
      // bind current scope
      var runtimeScope = self.getCurrentScope();

      var func = function func() {
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        self.callStack.push("" + name);
        var prevScope = self.getCurrentScope();
        var currentScope = createScope(runtimeScope, "FunctionScope(" + name + ")");
        self.setCurrentScope(currentScope);
        self.addDeclarationsToScope(declVars, declFuncs, currentScope); // var t = function(){ typeof t } // function
        // t = function(){ typeof t } // function
        // z = function tx(){ typeof tx } // function
        // but
        // d = { say: function(){ typeof say } } // undefined

        if (name) {
          currentScope.data[name] = func;
        } // init arguments var


        currentScope.data["arguments"] = arguments;
        paramsGetter.forEach(function (getter, i) {
          currentScope.data[getter()] = args[i];
        }); // init this

        var prevContext = self.getCurrentContext(); //for ThisExpression

        self.setCurrentContext(this);
        var result = bodyClosure(); //reset

        self.setCurrentContext(prevContext);
        self.setCurrentScope(prevScope);
        self.callStack.pop();

        if (result instanceof Return) {
          return result.value;
        }
      };

      defineFunctionName(func, name);
      Object.defineProperty(func, "length", {
        value: paramLength,
        writable: false,
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(func, "toString", {
        value: function value() {
          return source.slice(node.start, node.end);
        },
        writable: true,
        configurable: true,
        enumerable: false
      });
      Object.defineProperty(func, "valueOf", {
        value: function value() {
          return source.slice(node.start, node.end);
        },
        writable: true,
        configurable: true,
        enumerable: false
      });
      return func;
    };
  } // new Ctrl()
  ;

  _proto2.newExpressionHandler = function newExpressionHandler(node) {
    var _this12 = this;

    var source = this.source;
    var expression = this.createClosure(node.callee);
    var args = node.arguments.map(function (arg) {
      return _this12.createClosure(arg);
    });
    return function () {
      var construct = expression();

      if (!isFunction(construct) || construct.__IS_EVAL_FUNC) {
        var callee = node.callee;
        var name = source.slice(callee.start, callee.end);
        throw _this12.createInternalThrowError(_messages.Messages.IsNotConstructor, name, node);
      } // new Function(...)


      if (construct.__IS_FUNCTION_FUNC) {
        return construct.apply(void 0, [new InternalInterpreterReflection(_this12)].concat(args.map(function (arg) {
          return arg();
        })));
      }

      return _construct(construct, args.map(function (arg) {
        return arg();
      }));
    };
  } // a.b a['b']
  ;

  _proto2.memberExpressionHandler = function memberExpressionHandler(node) {
    var objectGetter = this.createClosure(node.object);
    var keyGetter = this.createMemberKeyGetter(node);
    return function () {
      var obj = objectGetter();
      var key = keyGetter();
      return obj[key];
    };
  } //this
  ;

  _proto2.thisExpressionHandler = function thisExpressionHandler(node) {
    var _this13 = this;

    return function () {
      return _this13.getCurrentContext();
    };
  } // var1,var2,...
  ;

  _proto2.sequenceExpressionHandler = function sequenceExpressionHandler(node) {
    var _this14 = this;

    var expressions = node.expressions.map(function (item) {
      return _this14.createClosure(item);
    });
    return function () {
      var result;
      var len = expressions.length;

      for (var i = 0; i < len; i++) {
        var expression = expressions[i];
        result = expression();
      }

      return result;
    };
  } // 1 'name'
  ;

  _proto2.literalHandler = function literalHandler(node) {
    return function () {
      if (node.regex) {
        return new RegExp(node.regex.pattern, node.regex.flags);
      }

      return node.value;
    };
  } // var1 ...
  ;

  _proto2.identifierHandler = function identifierHandler(node) {
    var _this15 = this;

    return function () {
      var currentScope = _this15.getCurrentScope();

      var data = _this15.getScopeDataFromName(node.name, currentScope);

      _this15.assertVariable(data, node.name, node);

      return data[node.name];
    };
  };

  _proto2.getIdentifierScope = function getIdentifierScope(node) {
    var currentScope = this.getCurrentScope();
    var scope = this.getScopeFromName(node.name, currentScope);
    return scope;
  } // a=1 a+=2
  ;

  _proto2.assignmentExpressionHandler = function assignmentExpressionHandler(node) {
    var _this16 = this;

    // var s = function(){}
    // s.name === s
    if (node.left.type === "Identifier" && node.right.type === "FunctionExpression" && !node.right.id) {
      node.right.id = {
        type: "Identifier",
        name: node.left.name
      };
    }

    var dataGetter = this.createObjectGetter(node.left);
    var nameGetter = this.createNameGetter(node.left);
    var rightValueGetter = this.createClosure(node.right);
    return function () {
      var data = dataGetter();
      var name = nameGetter();
      var rightValue = rightValueGetter();

      if (node.operator !== "=") {
        // if a is undefined
        // a += 1
        _this16.assertVariable(data, name, node);
      }

      switch (node.operator) {
        case "=":
          return data[name] = rightValue;

        case "+=":
          return data[name] += rightValue;

        case "-=":
          return data[name] -= rightValue;

        case "*=":
          return data[name] *= rightValue;

        case "**=":
          return data[name] = Math.pow(data[name], rightValue);

        case "/=":
          return data[name] /= rightValue;

        case "%=":
          return data[name] %= rightValue;

        case "<<=":
          return data[name] <<= rightValue;

        case ">>=":
          return data[name] >>= rightValue;

        case ">>>=":
          return data[name] >>>= rightValue;

        case "&=":
          return data[name] &= rightValue;

        case "^=":
          return data[name] ^= rightValue;

        case "|=":
          return data[name] |= rightValue;

        default:
          throw _this16.createInternalThrowError(_messages.Messages.AssignmentExpressionSyntaxError, node.type, node);
      }
    };
  } // function test(){}
  ;

  _proto2.functionDeclarationHandler = function functionDeclarationHandler(node) {
    if (node.id) {
      var functionClosure = this.functionExpressionHandler(node);
      Object.defineProperty(functionClosure, "isFunctionDeclareClosure", {
        value: true,
        writable: false,
        configurable: false,
        enumerable: false
      });
      this.funcDeclaration(node.id.name, functionClosure);
    }

    return function () {
      return EmptyStatementReturn;
    };
  };

  _proto2.getVariableName = function getVariableName(node) {
    if (node.type === "Identifier") {
      return node.name;
    } else {
      throw this.createInternalThrowError(_messages.Messages.VariableTypeSyntaxError, node.type, node);
    }
  } // var i;
  // var i=1;
  ;

  _proto2.variableDeclarationHandler = function variableDeclarationHandler(node) {
    var _this17 = this;

    var assignmentsClosure;
    var assignments = [];

    for (var i = 0; i < node.declarations.length; i++) {
      var decl = node.declarations[i];
      this.varDeclaration(this.getVariableName(decl.id));

      if (decl.init) {
        assignments.push({
          type: "AssignmentExpression",
          operator: "=",
          left: decl.id,
          right: decl.init
        });
      }
    }

    if (assignments.length) {
      assignmentsClosure = this.createClosure({
        type: "BlockStatement",
        body: assignments
      });
    }

    return function () {
      if (assignmentsClosure) {
        var oldValue = _this17.isVarDeclMode;
        _this17.isVarDeclMode = true;
        assignmentsClosure();
        _this17.isVarDeclMode = oldValue;
      }

      return EmptyStatementReturn;
    };
  };

  _proto2.assertVariable = function assertVariable(data, name, node) {
    if (data === this.globalScope.data && !(name in data)) {
      throw this.createInternalThrowError(_messages.Messages.VariableUndefinedReferenceError, name, node);
    }
  } // {...}
  ;

  _proto2.programHandler = function programHandler(node) {
    var _this18 = this;

    // const currentScope = this.getCurrentScope();
    var stmtClosures = node.body.map(function (stmt) {
      // if (stmt.type === "EmptyStatement") return null;
      return _this18.createClosure(stmt);
    });
    return function () {
      var result = EmptyStatementReturn;

      for (var i = 0; i < stmtClosures.length; i++) {
        var stmtClosure = stmtClosures[i]; // save last value

        var ret = _this18.setValue(stmtClosure()); // if (!stmtClosure) continue;
        // EmptyStatement


        if (ret === EmptyStatementReturn) continue;
        result = ret; // BlockStatement: break label;  continue label; for(){ break ... }
        // ReturnStatement: return xx;

        if (result instanceof Return || result instanceof BreakLabel || result instanceof ContinueLabel || result === Break || result === Continue) {
          break;
        }
      } // save last value


      return result;
    };
  } // all expression: a+1 a&&b a() a.b ...
  ;

  _proto2.expressionStatementHandler = function expressionStatementHandler(node) {
    return this.createClosure(node.expression);
  };

  _proto2.emptyStatementHandler = function emptyStatementHandler(node) {
    return function () {
      return EmptyStatementReturn;
    };
  } // return xx;
  ;

  _proto2.returnStatementHandler = function returnStatementHandler(node) {
    var argumentClosure = node.argument ? this.createClosure(node.argument) : noop;
    return function () {
      return new Return(argumentClosure());
    };
  } // if else
  ;

  _proto2.ifStatementHandler = function ifStatementHandler(node) {
    var testClosure = this.createClosure(node.test);
    var consequentClosure = this.createClosure(node.consequent);
    var alternateClosure = node.alternate ? this.createClosure(node.alternate) :
    /*!important*/
    function () {
      return EmptyStatementReturn;
    };
    return function () {
      return testClosure() ? consequentClosure() : alternateClosure();
    };
  } // test() ? true : false
  ;

  _proto2.conditionalExpressionHandler = function conditionalExpressionHandler(node) {
    return this.ifStatementHandler(node);
  } // for(var i = 0; i < 10; i++) {...}
  ;

  _proto2.forStatementHandler = function forStatementHandler(node) {
    var _this19 = this;

    var initClosure = noop;
    var testClosure = node.test ? this.createClosure(node.test) : function () {
      return true;
    };
    var updateClosure = noop;
    var bodyClosure = this.createClosure(node.body);

    if (node.type === "ForStatement") {
      initClosure = node.init ? this.createClosure(node.init) : initClosure;
      updateClosure = node.update ? this.createClosure(node.update) : noop;
    }

    return function (pNode) {
      var labelName;
      var result = EmptyStatementReturn;
      var shouldInitExec = node.type === "DoWhileStatement";

      if (pNode && pNode.type === "LabeledStatement") {
        labelName = pNode.label.name;
      }

      for (initClosure(); shouldInitExec || testClosure(); updateClosure()) {
        shouldInitExec = false; // save last value

        var ret = _this19.setValue(bodyClosure()); // notice: never return Break or Continue!


        if (ret === EmptyStatementReturn || ret === Continue) continue;

        if (ret === Break) {
          break;
        }

        result = ret; // stop continue label

        if (result instanceof ContinueLabel && result.value === labelName) {
          result = EmptyStatementReturn;
          continue;
        }

        if (result instanceof Return || result instanceof BreakLabel || result instanceof ContinueLabel) {
          break;
        }
      }

      return result;
    };
  } // while(1) {...}
  ;

  _proto2.whileStatementHandler = function whileStatementHandler(node) {
    return this.forStatementHandler(node);
  };

  _proto2.doWhileStatementHandler = function doWhileStatementHandler(node) {
    return this.forStatementHandler(node);
  };

  _proto2.forInStatementHandler = function forInStatementHandler(node) {
    var _this20 = this;

    // for( k in obj) or for(o.k in obj) ...
    var left = node.left;
    var rightClosure = this.createClosure(node.right);
    var bodyClosure = this.createClosure(node.body); // for(var k in obj) {...}

    if (node.left.type === "VariableDeclaration") {
      // init var k
      this.createClosure(node.left)(); // reset left
      // for( k in obj)

      left = node.left.declarations[0].id;
    }

    return function (pNode) {
      var labelName;
      var result = EmptyStatementReturn;
      var x;

      if (pNode && pNode.type === "LabeledStatement") {
        labelName = pNode.label.name;
      }

      var data = rightClosure();

      for (x in data) {
        // assign left to scope
        // k = x
        // o.k = x
        _this20.assignmentExpressionHandler({
          type: "AssignmentExpression",
          operator: "=",
          left: left,
          right: {
            type: "Literal",
            value: x
          }
        })(); // save last value


        var ret = _this20.setValue(bodyClosure()); // notice: never return Break or Continue!


        if (ret === EmptyStatementReturn || ret === Continue) continue;

        if (ret === Break) {
          break;
        }

        result = ret; // stop continue label

        if (result instanceof ContinueLabel && result.value === labelName) {
          result = EmptyStatementReturn;
          continue;
        }

        if (result instanceof Return || result instanceof BreakLabel || result instanceof ContinueLabel) {
          break;
        }
      }

      return result;
    };
  };

  _proto2.withStatementHandler = function withStatementHandler(node) {
    var _this21 = this;

    var objectClosure = this.createClosure(node.object);
    var bodyClosure = this.createClosure(node.body);
    return function () {
      var data = objectClosure();

      var currentScope = _this21.getCurrentScope();

      var newScope = new Scope(data, currentScope, WithScopeName); // const data = objectClosure();
      // copy all properties
      // for (let k in data) {
      // 	newScope.data[k] = data[k];
      // }

      _this21.setCurrentScope(newScope); // save last value


      var result = _this21.setValue(bodyClosure());

      _this21.setCurrentScope(currentScope);

      return result;
    };
  };

  _proto2.throwStatementHandler = function throwStatementHandler(node) {
    var _this22 = this;

    var argumentClosure = this.createClosure(node.argument);
    return function () {
      _this22.setValue(undefined);

      throw argumentClosure();
    };
  } // try{...}catch(e){...}finally{}
  ;

  _proto2.tryStatementHandler = function tryStatementHandler(node) {
    var _this23 = this;

    var blockClosure = this.createClosure(node.block);
    var handlerClosure = node.handler ? this.catchClauseHandler(node.handler) : null;
    var finalizerClosure = node.finalizer ? this.createClosure(node.finalizer) : null;
    return function () {
      var currentScope = _this23.getCurrentScope();

      var currentContext = _this23.getCurrentContext();

      var labelStack = currentScope.labelStack.concat([]);

      var callStack = _this23.callStack.concat([]);

      var result = EmptyStatementReturn;
      var finalReturn;
      var throwError;

      var reset = function reset() {
        _this23.setCurrentScope(currentScope); //reset scope


        _this23.setCurrentContext(currentContext); //reset context


        currentScope.labelStack = labelStack; //reset label stack

        _this23.callStack = callStack; //reset call stack
      };
      /**
       * try{...}catch(e){...}finally{...} execution sequence:
       * try stmt
       * try throw
       * catch stmt (if)
       * finally stmt
       *
       * finally throw or finally return
       * catch throw or catch return
       * try return
       */


      try {
        result = _this23.setValue(blockClosure());

        if (result instanceof Return) {
          finalReturn = result;
        }
      } catch (err) {
        reset();

        if (_this23.isInterruptThrow(err)) {
          throw err;
        }

        if (handlerClosure) {
          try {
            result = _this23.setValue(handlerClosure(err));

            if (result instanceof Return) {
              finalReturn = result;
            }
          } catch (err) {
            reset();

            if (_this23.isInterruptThrow(err)) {
              throw err;
            } // save catch throw error


            throwError = err;
          }
        }
      } // finally {


      if (finalizerClosure) {
        try {
          //do not save finally result
          result = finalizerClosure();

          if (result instanceof Return) {
            finalReturn = result;
          } // finalReturn = finalizerClosure();

        } catch (err) {
          reset();

          if (_this23.isInterruptThrow(err)) {
            throw err;
          } // save finally throw error


          throwError = err;
        } // if (finalReturn instanceof Return) {
        // 	result = finalReturn;
        // }

      } // }


      if (throwError) throw throwError;

      if (finalReturn) {
        return finalReturn;
      }

      return result;
    };
  } // ... catch(e){...}
  ;

  _proto2.catchClauseHandler = function catchClauseHandler(node) {
    var _this24 = this;

    var paramNameGetter = this.createParamNameGetter(node.param);
    var bodyClosure = this.createClosure(node.body);
    return function (e) {
      var result;

      var currentScope = _this24.getCurrentScope();

      var scopeData = currentScope.data; // get param name "e"

      var paramName = paramNameGetter();
      var isInScope = hasOwnProperty.call(scopeData, paramName); //paramName in scopeData;
      // save "e"

      var oldValue = scopeData[paramName]; // add "e" to scope

      scopeData[paramName] = e; // run

      result = bodyClosure(); // reset "e"

      if (isInScope) {
        scopeData[paramName] = oldValue;
      } else {
        //unset
        delete scopeData[paramName];
      }

      return result;
    };
  };

  _proto2.continueStatementHandler = function continueStatementHandler(node) {
    return function () {
      return node.label ? new ContinueLabel(node.label.name) : Continue;
    };
  };

  _proto2.breakStatementHandler = function breakStatementHandler(node) {
    return function () {
      return node.label ? new BreakLabel(node.label.name) : Break;
    };
  };

  _proto2.switchStatementHandler = function switchStatementHandler(node) {
    var _this25 = this;

    var discriminantClosure = this.createClosure(node.discriminant);
    var caseClosures = node.cases.map(function (item) {
      return _this25.switchCaseHandler(item);
    });
    return function () {
      var value = discriminantClosure();
      var match = false;
      var result;
      var ret, defaultCase;

      for (var i = 0; i < caseClosures.length; i++) {
        var item = caseClosures[i]();
        var test = item.testClosure();

        if (test === DefaultCase) {
          defaultCase = item;
          continue;
        }

        if (match || test === value) {
          match = true;
          ret = _this25.setValue(item.bodyClosure()); // notice: never return Break!

          if (ret === EmptyStatementReturn) continue;

          if (ret === Break) {
            break;
          }

          result = ret;

          if (result instanceof Return || result instanceof BreakLabel || result instanceof ContinueLabel || result === Continue) {
            break;
          }
        }
      }

      if (!match && defaultCase) {
        ret = _this25.setValue(defaultCase.bodyClosure());
        var isEBC = ret === EmptyStatementReturn || ret === Break; // notice: never return Break or Continue!

        if (!isEBC) {
          result = ret;
        }
      }

      return result;
    };
  };

  _proto2.switchCaseHandler = function switchCaseHandler(node) {
    var testClosure = node.test ? this.createClosure(node.test) : function () {
      return DefaultCase;
    };
    var bodyClosure = this.createClosure({
      type: "BlockStatement",
      body: node.consequent
    });
    return function () {
      return {
        testClosure: testClosure,
        bodyClosure: bodyClosure
      };
    };
  } // label: xxx
  ;

  _proto2.labeledStatementHandler = function labeledStatementHandler(node) {
    var _this26 = this;

    var labelName = node.label.name;
    var bodyClosure = this.createClosure(node.body);
    return function () {
      var result;

      var currentScope = _this26.getCurrentScope();

      currentScope.labelStack.push(labelName);
      result = bodyClosure(node); // stop break label

      if (result instanceof BreakLabel && result.value === labelName) {
        result = EmptyStatementReturn;
      }

      currentScope.labelStack.pop();
      return result;
    };
  };

  _proto2.debuggerStatementHandler = function debuggerStatementHandler(node) {
    return function () {
      debugger;
      return EmptyStatementReturn;
    };
  } // get es3/5 param name
  ;

  _proto2.createParamNameGetter = function createParamNameGetter(node) {
    if (node.type === "Identifier") {
      return function () {
        return node.name;
      };
    } else {
      throw this.createInternalThrowError(_messages.Messages.ParamTypeSyntaxError, node.type, node);
    }
  };

  _proto2.createObjectKeyGetter = function createObjectKeyGetter(node) {
    var getter; // var obj = { title: "" }

    if (node.type === "Identifier") {
      getter = function getter() {
        return node.name;
      };
    } else {
      // Literal or ...
      // var obj = { "title": "" } or others...
      getter = this.createClosure(node);
    }

    return function () {
      return getter();
    };
  };

  _proto2.createMemberKeyGetter = function createMemberKeyGetter(node) {
    // s['a'];  node.computed = true
    // s.foo;  node.computed = false
    return node.computed ? this.createClosure(node.property) : this.createObjectKeyGetter(node.property);
  } // for UnaryExpression UpdateExpression AssignmentExpression
  ;

  _proto2.createObjectGetter = function createObjectGetter(node) {
    var _this27 = this;

    switch (node.type) {
      case "Identifier":
        return function () {
          return _this27.getScopeDataFromName(node.name, _this27.getCurrentScope());
        };

      case "MemberExpression":
        return this.createClosure(node.object);

      default:
        throw this.createInternalThrowError(_messages.Messages.AssignmentTypeSyntaxError, node.type, node);
    }
  } // for UnaryExpression UpdateExpression AssignmentExpression
  ;

  _proto2.createNameGetter = function createNameGetter(node) {
    switch (node.type) {
      case "Identifier":
        return function () {
          return node.name;
        };

      case "MemberExpression":
        return this.createMemberKeyGetter(node);

      default:
        throw this.createInternalThrowError(_messages.Messages.AssignmentTypeSyntaxError, node.type, node);
    }
  };

  _proto2.varDeclaration = function varDeclaration(name) {
    var context = this.collectDeclVars;
    context[name] = undefined;
  };

  _proto2.funcDeclaration = function funcDeclaration(name, func) {
    var context = this.collectDeclFuncs;
    context[name] = func;
  };

  _proto2.addDeclarationsToScope = function addDeclarationsToScope(declVars, declFuncs, scope) {
    var scopeData = scope.data;

    for (var key in declFuncs) {
      var value = declFuncs[key];
      scopeData[key] = value ? value() : value;
    }

    for (var _key5 in declVars) {
      if (!(_key5 in scopeData)) {
        scopeData[_key5] = void 0;
      }
    }
  };

  _proto2.getScopeValue = function getScopeValue(name, startScope) {
    var scope = this.getScopeFromName(name, startScope);
    return scope.data[name];
  };

  _proto2.getScopeDataFromName = function getScopeDataFromName(name, startScope) {
    return this.getScopeFromName(name, startScope).data;
  };

  _proto2.getScopeFromName = function getScopeFromName(name, startScope) {
    var scope = startScope;

    do {
      if (name in scope.data) {
        //if (hasOwnProperty.call(scope.data, name)) {
        return scope;
      }
    } while (scope = scope.parent);

    return this.globalScope;
  };

  _proto2.setValue = function setValue(value) {
    var isFunctionCall = this.callStack.length;

    if (this.isVarDeclMode || isFunctionCall || value === EmptyStatementReturn || value === Break || value === Continue || value instanceof BreakLabel || value instanceof ContinueLabel) {
      return value;
    }

    this.value = value instanceof Return ? value.value : value;
    return value;
  };

  _proto2.getValue = function getValue() {
    return this.value;
  };

  return Interpreter;
}();

exports.Interpreter = Interpreter;
Interpreter.version = version;
Interpreter.eval = internalEval;
Interpreter.Function = internalFunction;
Interpreter.ecmaVersion = 5; // alert.call(globalContextInFunction, 1);
// fix: alert.call({}, 1); // Illegal invocation
// function func(){
//     this;// Interpreter.globalContextInFunction
// }
// func()

Interpreter.globalContextInFunction = void 0;
Interpreter.global = Object.create(null);
}, function(modId) { var map = {"./messages":1644647847426}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1644647847426, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Messages = exports.InterruptThrowReferenceError = exports.InterruptThrowSyntaxError = exports.InterruptThrowError = exports.ThrowTypeError = exports.ThrowReferenceError = exports.ThrowSyntaxError = exports.ThrowError = void 0;

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ThrowError =
/*#__PURE__*/
function (_Error) {
  _inheritsLoose(ThrowError, _Error);

  function ThrowError() {
    return _Error.apply(this, arguments) || this;
  }

  return ThrowError;
}(_wrapNativeSuper(Error));

exports.ThrowError = ThrowError;

var ThrowSyntaxError =
/*#__PURE__*/
function (_SyntaxError) {
  _inheritsLoose(ThrowSyntaxError, _SyntaxError);

  function ThrowSyntaxError() {
    return _SyntaxError.apply(this, arguments) || this;
  }

  return ThrowSyntaxError;
}(_wrapNativeSuper(SyntaxError));

exports.ThrowSyntaxError = ThrowSyntaxError;

var ThrowReferenceError =
/*#__PURE__*/
function (_ReferenceError) {
  _inheritsLoose(ThrowReferenceError, _ReferenceError);

  function ThrowReferenceError() {
    return _ReferenceError.apply(this, arguments) || this;
  }

  return ThrowReferenceError;
}(_wrapNativeSuper(ReferenceError));

exports.ThrowReferenceError = ThrowReferenceError;

var ThrowTypeError =
/*#__PURE__*/
function (_TypeError) {
  _inheritsLoose(ThrowTypeError, _TypeError);

  function ThrowTypeError() {
    return _TypeError.apply(this, arguments) || this;
  }

  return ThrowTypeError;
}(_wrapNativeSuper(TypeError));

exports.ThrowTypeError = ThrowTypeError;

var InterruptThrowError =
/*#__PURE__*/
function (_ThrowError) {
  _inheritsLoose(InterruptThrowError, _ThrowError);

  function InterruptThrowError() {
    return _ThrowError.apply(this, arguments) || this;
  }

  return InterruptThrowError;
}(ThrowError);

exports.InterruptThrowError = InterruptThrowError;

var InterruptThrowSyntaxError =
/*#__PURE__*/
function (_ThrowSyntaxError) {
  _inheritsLoose(InterruptThrowSyntaxError, _ThrowSyntaxError);

  function InterruptThrowSyntaxError() {
    return _ThrowSyntaxError.apply(this, arguments) || this;
  }

  return InterruptThrowSyntaxError;
}(ThrowSyntaxError);

exports.InterruptThrowSyntaxError = InterruptThrowSyntaxError;

var InterruptThrowReferenceError =
/*#__PURE__*/
function (_ThrowReferenceError) {
  _inheritsLoose(InterruptThrowReferenceError, _ThrowReferenceError);

  function InterruptThrowReferenceError() {
    return _ThrowReferenceError.apply(this, arguments) || this;
  }

  return InterruptThrowReferenceError;
}(ThrowReferenceError);

exports.InterruptThrowReferenceError = InterruptThrowReferenceError;
var Messages = {
  UnknownError: [3001, "%0", InterruptThrowError],
  ExecutionTimeOutError: [3002, "Script execution timed out after %0ms", InterruptThrowError],
  NodeTypeSyntaxError: [1001, "Unknown node type: %0", InterruptThrowReferenceError],
  BinaryOperatorSyntaxError: [1002, "Unknown binary operator: %0", InterruptThrowReferenceError],
  LogicalOperatorSyntaxError: [1003, "Unknown logical operator: %0", InterruptThrowReferenceError],
  UnaryOperatorSyntaxError: [1004, "Unknown unary operator: %0", InterruptThrowReferenceError],
  UpdateOperatorSyntaxError: [1005, "Unknown update operator: %0", InterruptThrowReferenceError],
  ObjectStructureSyntaxError: [1006, "Unknown object structure: %0", InterruptThrowReferenceError],
  AssignmentExpressionSyntaxError: [1007, "Unknown assignment expression: %0", InterruptThrowReferenceError],
  VariableTypeSyntaxError: [1008, "Unknown variable type: %0", InterruptThrowReferenceError],
  ParamTypeSyntaxError: [1009, "Unknown param type: %0", InterruptThrowReferenceError],
  AssignmentTypeSyntaxError: [1010, "Unknown assignment type: %0", InterruptThrowReferenceError],
  FunctionUndefinedReferenceError: [2001, "%0 is not a function", ThrowReferenceError],
  VariableUndefinedReferenceError: [2002, "%0 is not defined", ThrowReferenceError],
  IsNotConstructor: [2003, "%0 is not a constructor", ThrowTypeError]
};
exports.Messages = Messages;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1644647847427, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = createContext;
exports.compileFunction = compileFunction;
exports.runInContext = _runInContext;
exports.Script = exports.runInNewContext = void 0;

var _main = require("./interpreter/main");

// TODO:
// add tests
function createContext(ctx) {
  if (ctx === void 0) {
    ctx = Object.create(null);
  }

  return ctx;
}

function compileFunction(code, params, options) {
  if (params === void 0) {
    params = [];
  }

  if (options === void 0) {
    options = {};
  }

  var ctx = options.parsingContext;
  var timeout = options.timeout === undefined ? 0 : options.timeout;
  var wrapCode = "\n    (function anonymous(" + params.join(",") + "){\n         " + code + "\n    });\n    ";
  var interpreter = new _main.Interpreter(ctx, {
    ecmaVersion: options.ecmaVersion,
    timeout: timeout,
    rootContext: options.rootContext,
    globalContextInFunction: options.globalContextInFunction
  });
  return interpreter.evaluate(wrapCode);
}

function _runInContext(code, ctx, options) {
  var interpreter = new _main.Interpreter(ctx, options);
  return interpreter.evaluate(code);
}

var runInNewContext = _runInContext;
exports.runInNewContext = runInNewContext;

var Script =
/*#__PURE__*/
function () {
  function Script(code) {
    this._code = code;
  }

  var _proto = Script.prototype;

  _proto.runInContext = function runInContext(ctx) {
    return _runInContext(this._code, ctx);
  };

  _proto.runInNewContext = function runInNewContext(ctx) {
    return _runInContext(this._code, ctx);
  };

  return Script;
}();

exports.Script = Script;
}, function(modId) { var map = {"./interpreter/main":1644647847425}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1644647847428, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vm = require("./vm");

var _default = function _default(code, ctx, options) {
  return (0, _vm.runInContext)(code, ctx, options);
};

exports.default = _default;
}, function(modId) { var map = {"./vm":1644647847427}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1644647847429, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _vm = require("./vm");

function _default() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var code = args.pop();
  return (0, _vm.compileFunction)(code || "", args);
}
}, function(modId) { var map = {"./vm":1644647847427}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1644647847424);
})()
//miniprogram-npm-outsideDeps=["acorn"]
//# sourceMappingURL=index.js.map