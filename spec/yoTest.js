var path = require('path');
var expect = require('chai').expect;
var yoTest = require(path.join(__dirname, '..', './yoTest.js'));
describe('yoTest()', function () {
    'use strict';
    it('exists', function () {
        expect(yoTest).to.be.a('function');
    });
    it('does something', function () {
        expect(true).to.equal(true);
    });
    it('does something else', function () {
        expect(true).to.equal(true);
    });
    // Add more assertions here
    it('A primitive value is a member of one of the following built-in types: Undefined, Null, Boolean, Number, String, and Symbol', function () {
        expect(typeof Undefined).to.equal('undefined')
        expect([undefined, null, Boolean, Number, String, Symbol].length).to.equal(6)
    })
    it('objects that are fundamental to the runtime semantics of the language including Object, Function, Boolean, Symbol, and various Error objects', function () {
        [Object, Function, Boolean, Symbol, Error].forEach(function (val, ind) {
            expect(val instanceof Object).to.be.ok
        })
    })
    it('objects that represent and manipulate numeric values including Math, Number, and Date', function () {
        [Math.random(), Number(), new Date().getTime()].forEach(function (val) {
            expect(typeof val).to.equal('number')
        })
    })
    it(' the text processing objects String and RegExp', function () {
        expect(typeof  'text').to.equal('string')
        expect('text'.split('')).to.deep.include.members(['t', 'e', 'x', 't'])
        expect('text'.match(/^t.+t$/)).to.be.ok
    })
    it('keyed collections including Map and Set objects', function () {
        [Map, Set].forEach(function (val) {
            expect(val).to.exist
        })
        let s = new Set()
        s.add("hello").add("goodbye").add("hello")
        expect(s.size).to.equal(2)
        expect(s.has("hello")).to.be.ok
        expect(typeof s.values()).to.equal('object')
        var iterObj = s.values()
        expect(iterObj.next().value).to.equal('hello')
        expect(iterObj.next().value).to.equal('goodbye')
        expect(iterObj.next().value).to.equal(undefined)
        let m = new Map()
        m.set("hello", 42)
        m.set(s, 34)
        expect(m.get(s)).to.equal(34)
        expect(m.size).to.equal(2)
        var iterObj = m.entries()
        expect(iterObj.next().value).to.deep.include.members(['hello', 42])
        expect(iterObj.next().value).to.deep.include.members([s, 34])
    })
    it('objects supporting structured data including the JSON object, ArrayBuffer, and DataView', function () {
        [JSON, ArrayBuffer, DataView].forEach(function (val) {
            expect(val instanceof Object).to.be.ok
        })
        var buffer = new ArrayBuffer(8);
        var view = new Int32Array(buffer);
        expect(ArrayBuffer.isView(view)).to.be.ok
        var littleEndian = (function () {
            var buffer = new ArrayBuffer(2);
            new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
            // Int16Array uses the platform's endianness.
            return new Int16Array(buffer)[0] === 256;
        })();
        expect(littleEndian).to.be.ok; // true or false
    })
    it('objects supporting control abstractions including generator functions and Promise objects', function () {
        expect(Object.getPrototypeOf(function*() {
        }).constructor).to.be.instanceof(Function)
        var GeneratorFunction = Object.getPrototypeOf(function*() {
        }).constructor
        var g = new GeneratorFunction("a", "yield a * 2");
        var iterator = g(10);
        expect(iterator.next().value).to.equal(20)
        function msgAfterTimeout(msg, who, timeout) {
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout)
            })
        }

        return msgAfterTimeout("", "Foo", 100).then((msg) => {
                expect(msg).to.equal(' Hello Foo!')
                msgAfterTimeout(msg, "Bar", 200)
            }
        ).then((msg) => {
                expect(msg).to.be.undefined
            })
    })
    it('objects supporting control abstractions including reflection objects including Proxy and Reflect', function () {
        let target = {
            foo: "Welcome, foo"
        }

        function declareProxy() {
            let proxy = new Proxy(target, {
                get (receiver, name) {
                    return name in receiver ? receiver[name] : `Hello, ${name}`
                }
            })
        }

        expect(declareProxy).throw()
        //proxy.foo   === "Welcome, foo"
        //proxy.world === "Hello, world"
        function reflectFun() {
            let obj = {a: 1}
            Object.defineProperty(obj, "b", {value: 2})
            obj[Symbol("c")] = 3
            Reflect.ownKeys(obj) // [ "a", "b", Symbol(c) ]
        }

        expect(reflectFun).throw();
    })
});
describe('Terms and Definitions', function () {
    'use strict';
    it('type', function () {
        expect(true).to.be.ok
    })
    it('primitive value', function () {
    })
    it('object:NOTE An object is a collection of properties and has a single prototype object. The prototype may be the null value.', function () {
        let obj = {}
        obj.prototype = null
        expect(obj.prototype).to.be.object
        expect(obj.prototype).to.be.null
    })
    it('Infinity:number value that is the positive infinite number value', function () {
        var large = 10e100
        expect(Infinity).to.be.above(large)
    })
    it('method:    function that is the value of a property    NOTE When a function is called as a method of an object, the object is passed to the function as its this value.', function () {
        var methodObj = {
            method: ()=> {
                return this
            }
        }
        expect({foo: 'bar'}).to.eql({foo: 'bar'});
        expect(methodObj.method().method).to.be.function
        //but why?
        expect(methodObj.method()).to.not.be.eql(methodObj)
    })
    it("own property:    property that is directly contained by its object", function () {
        var obj = {}
        obj.prop = 'prop'
    })
})
describe('ToBoolean ( argument )', function () {
    'use strict';
    it('toBoolean', function () {
        var undefinedObj
        let arr = [undefinedObj, +0, -0, NaN, '', null]
        let arr1 = [' ', Symbol(), {}]
        for (let i = 0; i < arr.length; i++) {
            expect(arr[i]).to.not.be.ok
            if (arr1[i]) {
                expect(arr1[i]).to.be.ok
            }
        }
    })
    it('ToString', function () {
        let foo
        //Undefined
        //Return "undefined".
        expect(String(foo)).to.equal('undefined')
        //    Null
        //Return "null".
        expect(String(null)).to.equal('null')
        //    Boolean
        //If argument is true, return "true".
        //    If argument is false, return "false".
        expect(String(true)).to.equal('true')
        expect(String(false)).to.equal('false')
        //    Number
        //See 7.1.12.1.
        //    String
        //Return argument.
        //    Symbol
        //Throw a TypeError exception
        expect(()=>String(new Symbol())).throw()
        //    Object
        //Apply the following steps:
        //    1. Let primValue be ToPrimitive(argument, hint String). 2. Return ToString(primValue).
        foo = {a: 1, b: 2}
        expect(String(foo)).to.equal('[object Object]')
    })
    it('7.1.12.1 ToString Applied to the Number Type', function () {
        //If m is NaN, return the String "NaN".
        expect(String(NaN)).equal('NaN')
        // If m is +0 or -0, return the String "0".
        expect(String(+0)).equal('0')
        // If m is less than zero, return the String concatenation of the String "-" and ToString(-m).
        expect(String(-1)).equal('-1')
        // If m is +∞, return the String "Infinity".
        expect(String(Infinity)).equal('Infinity')
        // Otherwise, let n, k, and s be integers such that k  1, 10k-1  s < 10k, the Number value for s  10n-k is m, and k is as small as possible. Note that k is the number of digits in the decimal representation of s, that s is not divisible by 10, and that the least significant digit of s is not necessarily uniquely determined by these criteria.
        // If k  n  21, return the String consisting of the code units of the k digits of the decimal representation of s (in order, with no leading zeroes), followed by n-k occurrences of the code unit 0x0030 (DIGIT ZERO).
        // If 0 < n  21, return the String consisting of the code units of the most significant n digits of the decimal representation of s, followed by the code unit 0x002E (FULL STOP), followed by the code units of the remaining k-n digits of the decimal representation of s.
        // If -6 < n  0, return the String consisting of the code unit 0x0030 (DIGIT ZERO), followed by the code unit 0x002E (FULL STOP), followed by -n occurrences of the code unit 0x0030 (DIGIT ZERO), followed by the code units of the k digits of the decimal representation of s.
        // Otherwise, if k = 1, return the String consisting of the code unit of the single digit of s, followed by code unit 0x0065 (LATIN SMALL LETTER E), followed by the code unit 0x002B (PLUS SIGN) or the code unit 0x002D (HYPHEN-MINUS) according to whether n-1 is positive or negative, followed by the code units of the decimal representation of the integer abs(n-1) (with no leading zeroes).
        // Return the String consisting of the code units of the most significant digit of the decimal representation of s, followed by code unit 0x002E (FULL STOP), followed by the code units of the remaining k-1 digits of the decimal representation of s, followed by code unit 0x0065 (LATIN SMALL LETTER E), followed by code unit 0x002B (PLUS SIGN) or the code unit 0x002D (HYPHEN-MINUS) according to whether n-1 is positive or negative, followed by the code units of the decimal representation of the integer abs(n-1) (with no leading zeroes).
    })
    it('ToObject', function () {
        //Undefined
        //Throw a TypeError exception.why?
        let undefinedObj

        function foo() {
            Object(undefinedObj)
        }

        expect(()=>Object(undefinedObj)).not.throw()
        //Null Throw a TypeError exception.
        //    Boolean
        //Return a new Boolean object whose [[BooleanData]] internal slot is set to the value of argument. See 19.3 for a description of Boolean objects.
        //    Number
        //Return a new Number object whose [[NumberData]] internal slot is set to the value of argument. See 20.1 for a description of Number objects.
        //    String
        //Return a new String object whose [[StringData]] internal slot is set to the value of argument. See 21.1 for a description of String objects.
        //    Symbol
        //Return a new Symbol object whose [[SymbolData]] internal slot is set to the value of argument. See 19.4 for a description of Symbol objects.
        //    Object
        //Return argument.
    })
})
describe('Keywords', function () {
    'use strict';
    it('', function () {
        let keywords = ['break', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'typeof', 'instanceof', 'var', 'new', 'void', 'return', 'while', 'super', 'with', 'switch', 'yield', 'this', 'throw', 'try', , 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete']
        keywords.forEach((val)=> {
            let func = (name)=>eval('var ' + val)
            expect(func).throw();
        })
    })
})