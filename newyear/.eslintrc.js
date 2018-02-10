module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es6": true,
		"jquery": true
	},
	"plugins": [
		"html"
	],
	"extends": ["eslint:recommended"],
	"parserOptions": {
		"sourceType": "module"
	},
	"rules": {
		"indent": ["error", 4],
		"linebreak-style": ["error", "unix"],
		semi: 0,
		"quotes": [
			"error",
			"single",
			{ "allowTemplateLiterals": true }
		],
		"max-len": [2, 200, 4],
		"indent": 0,
		"no-mixed-spaces-and-tabs": 0,
		"no-use-before-define": 0,
		"consistent-return": 0,
		"no-tabs":0,
		"no-cond-assign": 0, // 禁止在条件语句中出现赋值操作符
		"complexity": ["error", 10], // 限制圈复杂度 http://eslint.cn/docs/rules/complexity
		"default-case": ["error"], // http://eslint.cn/docs/rules/default-case
		"eqeqeq": ["error", "always"], // http://eslint.cn/docs/rules/eqeqeq
		"no-eval": ["error"],
		"no-floating-decimal": "error", // http://eslint.cn/docs/rules/no-floating-decimal
		// "no-magic-numbers": ["error", { "ignoreArrayIndexes": true }], // http://eslint.cn/docs/rules/no-magic-numbers
		"no-param-reassign": ["error", { "props": false }], // 禁止对函数参数再赋值 http://eslint.cn/docs/rules/no-param-reassign
		"no-proto": "error", // 禁用__proto__ http://eslint.cn/docs/rules/no-proto
		"no-with": "error", // 禁用 with 语句 http://eslint.cn/docs/rules/no-with
		"camelcase": [
			"error",
			{
				"properties": "never"
			}
		], // 要求使用骆驼拼写法 (camelcase) http://eslint.cn/docs/rules/camelcase
		"key-spacing": ["error"], // http://eslint.cn/docs/rules/key-spacing
		"max-depth": ["error", 4], // 强制块语句的最大可嵌套深度4 http://eslint.cn/docs/rules/max-depth
		"max-nested-callbacks": ["error", 4], // 强制回调函数最大嵌套深度 http://eslint.cn/docs/rules/max-nested-callbacks
		"no-nested-ternary": "error", // 禁止使用嵌套的三元表达式 http://eslint.cn/docs/rules/no-nested-ternary
		"keyword-spacing": ["error"], // 强制关键字周围空格的一致性 http://eslint.cn/docs/rules/keyword-spacing
		"no-whitespace-before-property": "error", // 禁止属性前有空白 http://eslint.cn/docs/rules/no-whitespace-before-property
		"object-property-newline": "error", // 强制将对象的属性放在不同的行上 http://eslint.cn/docs/rules/object-property-newline
		"space-infix-ops": "error", // 要求中缀操作符周围有空格 http://eslint.cn/docs/rules/space-infix-ops,
		"space-unary-ops": "error", // 禁止在一元操作符之前或之后存在空格 http://eslint.cn/docs/rules/space-unary-ops

		// es6

		"arrow-spacing": "error" // 要求箭头函数的箭头之前或之后有空格 http://eslint.cn/docs/rules/arrow-spacing
	}
}