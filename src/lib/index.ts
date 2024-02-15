/**
{
	"scopeName": "source.jaan",
	"patterns": [
		{
			"include": "#comments"
		},
		{
			"include": "#numbers"
		},
		{
			"include": "#operator-logical"
		},
		{
			"include": "#reservedKeywords"
		},
		{
			"include": "#conditionalKeywords"
		},
		{
			"include": "#functions"
		},
		{
			"include": "#strings-single"
		},
		{
			"include": "#strings-double"
		},
		{
			"include": "#variables"
		}
	],
	"repository": {
		"comments": {
			"patterns": [
				{
					"name": "comment.line.jaan",
					"match": "#.*$"
				}
			]
		},
		"operator-logical": {
			"name": "support.function.jaan",
			"match": "\\b(?:na hoy|hoy|er beshi na hoy|er kom na hoy|er beshi hoy|er kom hoy|er soman na hoy|er soman hoy)\\b"
		},
		"reservedKeywords": {
			"name": "keyword.reserved.jaan",
			"match": "\\b(?:dhoro)\\b"
		},
		"conditionalKeywords": {
			"name": "keyword.control.jaan",
			"match": "\\b(?:hi jaan|bye jaan|jodi|tahole|nahole|huh|bar|and|or|holo)\\b"
		},
		"functions": {
			"name": "entity.name.function.jaan",
			"match": "\\b(?:bolo)\\b"
		},
		"strings-single": {
			"name": "string.quoted.single.jaan",
			"begin": "'",
			"end": "'"
		},
		"strings-double": {
			"name": "string.quoted.double.jaan",
			"begin": "\"",
			"end": "\""
		},
		"variables": {
			"name": "variable.constant.jaan",
			"match": "\\b(?:[a-zA-Z0-9_$]+)\\b"
		},
		"numbers": {
			"name": "constant.numeric.jaan",
			"match": "\\b(?:-?\\d+(?:\\.\\d+)?)\\b"
		},
		"symbols": {
			"name": "punctuation.definition.symbol.jaan",
			"match": "\\b(?:\\+|-|\\*|/|\\^|\\(|\\)|\\{|\\}|\\[|\\]|<|>|=|,|;|:|\\.)\\b"
		}
	}
}
 */

export function highlight(code: string) {
    let parsedCode = '';

	//replace all syntax with their respective classes. Avoid using regex as it will replace the syntax inside strings

	//dhoro -> <span class="keyword">dhoro</span>
	//dhoro amrnam holo "Fuad" -> <span class="keyword">dhoro</span> amrnam <span class="operator">holo</span><span class="string">"Fuad"</span>
	//bolo -> <span class="function">bolo</span>
	//hi jaan -> <span class="keyword">hi jaan</span>
	//bye jaan -> <span class="keyword">bye jaan</span>
	//jodi -> <span class="keyword">jodi</span>

	//output the parsed code
	

    return parsedCode;
}