# Jase - Parser Combinator Library
Jase is a JavaScript library of parser combinators, similar in principle and in design to the likes of [Parsec](https://wiki.haskell.org/Parsec) and its F# adaptation [FParsec](http://www.quanttec.com/fparsec/).

It's also similar to the [parsimmon](https://github.com/jneen/parsimmon) library, but intends to be superior to it.

Jase is a loose portmanteau of JavaScript and Parse.  It is designed to be used with TypeScript, but you don't have to do so.

## What's a parser combinator?
A parser, in our context, is a function that takes a string and outputs something else:

	Parser<TOut> : (input : string) => TOut

Two examples of parsers would be *a,b* that just parse the characters `a` and `b`, respectively, and return the characters they parsed. Here are their types:

	a : (input : string) => string;
	b : (input : string) => string;

Now let's introduce a *combinator* *C*. *C* takes a pair of parsers, *p_1, p_2*, and gives us a new parser, denoted *p_1p_2* that first applies *p_1* on the input and then (saving the last position) applies *p_2*, and returns the result of both in an array.

Thus it would parse the string `'ab'` and return the array `['a', 'b']`

The type of *C* would be something like:

	C : (p1 : Parser<T>, p2 : Parser<T>) => Parser<T[]>

So combinators take parsers and transform them in different ways, giving you other parsers.

From two simple parsers, we've built a slightly more complex parser. With more combinators, and more basic parsers to start with, you can imagine building parsers even for complex programming languages. You could even build a parser to JavaScript itself.

## So what does Jase include?
Jase includes two or three somewhat-separate components:

1. Basic parsers for doing things like parsing specific character types, specific strings, and so on.
2. Combinators that work on those parsers, allowing you to parse more and more complex stuff.
3. A system for executing parsers on inputs.

You could also divide Jase a bit differently, from a more internal perspective:

1. An interface for parsers and combinators.
2. An implementation for parsers and combinators.
3. Other functions.

## What's it for?
Parser combinator libraries are great for building parsers (relatively) simply and easily. Unlike regexes, they're for extracting meaning out of a well-formed language, not just for searching arbitrary text. They are a lot more powerful than regex when used for that purpose.

Their advantage over dedicated parsers is that the user doesn't have to deal with the nuts and bolts of recognizing characters and strings, just with the API of the parser-combinator library which is much closer to the problem domain.

They also allow you to easily separate and test different parts of the language you intend to parse and can result in very readable code.

The main disadvantage is probably performance. Parser-combinator libraries necessistate a lot of overhead for creating separate parsers and linking them up together. Another arguable disadvantage is the inability to separate parsing from tokenization.

## Performance
Jase is designed to perform well, but not to sacrifice performance for usability.

This says a lot when writing JavaScript, because it's hard to write optimized JS string processing code *without* sacrificing usability. So 

## Loud Parsers and Quiet Parsers
Jase has two essential kinds of parsers: loud parsers and quiet parsers.

A loud parser returns a value when it's finished parsing, while a quiet one does not return a value. This is an important distinction.

Say we want to parse a string between double quotes: `"hello"`. One way to do this would be:

	let pQuote = Jase.string('"');
	pQuote.then(Jase.anyChar.manyTill(pQuote))

The final parser would, however, return an array like this: `['"', 'hello']`, even though the initial `"` isn't something we care about. This is one reason to use quiet parsers. In TypeScript, quiet parsers are represented using the interface `QuietParser` and also hold `parser.isLoud === false`. If forced to return a value, they return a special `noResult` token, rather than `null` or `undefined` (which might be returned by the user intentionally).

Some parsers are quiet by default. For example, the `not` combinator returns a parser *P* that succeeds if the original failed. It doesn't make any sense for this parser to return anything, so it is always a quiet parser.

You can make a parser shut up using the `.quiet` combinator:

	let pQuote = Jase.string('"').quiet;
	pQuote.then(Jase.anyChar.manyTill(pQuote));

The resulting parser will intelligently return only `'hello'`.

Another way to handle quiet parsers is used in the `Jase.seq` static combinator. This combinator lets you chian any number of parsers in sequence and returns an array of the parsed results:

	let example = Jase.seq(Jase.digit, Jase.string(",").quiet, Jase.digit);

This combinator never returns a quiet parser, but the returns of quiet parsers will be ignored in the resulting array, giving us `['3', '4']` for the input `'3,4'`.

## Jase internals
A jase parser object is composed of a `JaseParser` wrapper and a `JaseParserAction` object that defines the actual parsing operation, as well as whether the operation is loud or quiet.

Instance-level combinators for both `LoudParser<T>` and `QuietParser` and defined on `JaseParser`, while `JaseParserAction` only provides a low-level method for doing the actual parsing.
