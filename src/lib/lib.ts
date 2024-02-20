import hljs from "highlight.js";

hljs.registerLanguage("jaan", (h) => {
    return {
        name: "JaanLang",
        keywords: [
            "dhoro",
            "hi jaan",
            "bye jaan",
            "jodi",
            "tahole",
            "nahole",
            "huh",
            "bar",
            "and",
            "or",
            "holo",
        ],
        contains: [
            {
                className: "comment",
                begin: "#",
                end: "$",
            },
            {
                className: "operator-logical",
                begin: "\\b(?:na hoy|hoy|er beshi na hoy|er kom na hoy|er beshi hoy|er kom hoy|er soman na hoy|er soman hoy)\\b",
            },
            {
                className: "keyword",
                begin: "\\b(?:dhoro)\\b",
            },
            {
                className: "keyword",
                begin: "\\b(?:hi jaan|bye jaan|jodi|tahole|nahole|huh|bar|and|or|holo)\\b",
            },
            {
                className: "function",
                begin: "\\b(?:bolo)\\b",
            },
            {
                className: "string",
                begin: "'",
                end: "'",
            },
            {
                className: "string",
                begin: '"',
                end: '"',
            },
            {
                className: "variables",
                //start with a letter or underscore is mandatory
                begin: "\\b(?:[a-zA-Z_$][a-zA-Z0-9_$]*)\\b",
            },
            {
                className: "number",
                begin: "\\b(?:-?\\d+(?:\\.\\d+)?)\\b",
            },
            {
                className: "symbols",
                begin: "\\b(?:\\+|-|\\*|/|\\^|\\(|\\)|\\{|\\}|\\[|\\]|<|>|=|,|;|:|\\.)\\b",
            },
            {
                className: "empty-line",
                begin: "^$",
            },
        ],
    };
});

export default hljs;