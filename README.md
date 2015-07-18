# Jay Extend

A super fast prototypal inheritance microlib for the modern web.

### Rationale

Why another JavaScript inheritance library? In a word: Speed.

The world is littered with JavaScript inheritance libraries. Every framework has
its own builtin flavor. This microlib takes a slightly different approach,
providing the fastest possible inheritance implementation while being easy to
use.

Jay Inheritance is very similar to John Resig's Simple Inheritance pattern (on
which it is based), but with improvements in constructor-time, and run-time
performance.

*Caveat Emptor: Startup-time performance suffers, due to `Object.defineProperty`
calls.*

### More information

I wrote an in-depth article that is available on my
[blog](http://blog.kodewerx.org/2014/03/melonjs-should-be-all-about-speed.html).

## Basic usage

### Setup in nodeland

```javascript
// Require Jay.extend() method
var Jay = require("jay-extend");
```

### Setup in browserland

```html
<!-- Add Jay.extend() method -->
<script src="jay-extend/lib/jay-extend.js"></script>
```

### Example class definitions

```javascript
var Person = Jay.extend({
    "init" : function (isDancing) {
        this.dancing = isDancing;
    },
    "dance" : function () {
        return this.dancing;
    }
});

var Ninja = Person.extend({
    "init" : function () {
        // Call the super constructor, passing a single argument
        this._super(Person, "init", [ false ] );
    },
    "dance" : function () {
        // Call the overridden dance() method
        return this._super(Person, "dance");
    },
    "swingSword" : function () {
        return true;
    }
});

var Pirate = Person.extend(Ninja, {
    "init" : function() {
        // Call the super constructor, passing a single argument
        this._super(Person, "init", [ true ]);
    }
});
```

### Example class instantiation

```javascript
var p = new Person(true);
console.log(p.dance()); // => true

var n = new Ninja();
console.log(n.dance()); // => false
console.log(n.swingSword()); // => true

var r = new Pirate();
console.log(r.dance()); // => true
console.log(r.swingSword()); // => true

console.log(
    p instanceof Person &&
    n instanceof Ninja &&
    n instanceof Person &&
    r instanceof Pirate &&
    r instanceof Person
); // => true
```

## Jay.extend

Returns **Class**

Argument | Type | Description
---------|------|------------
mixins... | **Descriptor[]** | Each *mixin* is a dictionary of functions, or a previously extended class whose methods will be applied to the target class prototype.

When multiple `mixins` are provided, methods may be overridden by later
`mixins`; The last mixin provided takes precedence. To call overridden mixin
methods, access its prototype or use `this._super()` (See below).

**Descriptor** is a simple (single-level) `Object` or **Class**. Each key in the
**Descriptor** must have a `Function` value.

## this._super

Returns **Mixed**

Argument | Type | Description
---------|------|------------
superClass | **Class** | Super class to access
methodName | **String** | Method name to access on `superClass`
args... | **Mixed[]** | List of arguments to pass to the method

To call methods on another **Class** within the prototype chain (or indeed not
even in the prototype chain!) you *should* use the standard prototypal call
pattern:

```javascript
SuperClass.prototype.methodName.call(this, arg1, arg2, ...);
```

However, Jay Inheritance includes a syntactic sugar convenience method on the
prototype called `_super`. The above can be rewritten as:

```javascript
this._super(SuperClass, "methodName", [ arg1, arg2, ... ]);
```

Which is a little easier to swallow. Note that `superClass` does not need to be
in the prototype chain, which allows mixins to function properly.

### Better than this._super

It is slower to call `this._super` by at least a factor of 3:
http://jsperf.com/inheritance-showdown/5

To keep the convenience of syntactic sugar and retain all of the raw
performance provided by the JavaScript VM, it's possible to use compile-time
replacements with [`grunt-replace`](https://github.com/outaTiME/grunt-replace).

Here's a sample `grunt-replace` configuration that takes care of this for you:

```javascript
"options" : {
  "patterns" : [
    {
      "match" : /this\._super\(\s*([\w\.]+)\s*,\s*"(\w+)"\s*(,\s*)?/g,
      "replacement" : "$1.prototype.$2.apply(this$3"
    }
  ]
}
```

### License

The source code is hereby released under the MIT License. The full text of the
license appears below.

Copyright (c) 2014-2015 Jay Oster

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
