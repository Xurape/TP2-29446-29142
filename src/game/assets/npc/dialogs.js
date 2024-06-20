export default {
    "angel": [
        {
            text: "Bem-vindo à Silken Island.", 
            text_newline: "Eu estou aqui para te dificultar", 
            text_newline_2: "a vida :)"
        },
        {
            text: "Chamo-me Angel, já agora.",
            text_newline: "E tu, como te chamas?",
            text_newline_2: "",

            hasInput: true,
            inputType: "playerName",
            inputText: "Qual é o teu nome?"
        },
        {
            text: "Ah, muito prazer em conhecer-te,", 
            text_newline: "{playerName}! Espero que não te divirtas!",
            text_newline_2: ""
        },
        {
            text: "Pronto, ouvi dizer que tu gostarias",
            text_newline: "de passar para o outro lado.",
            text_newline_2: "Eu posso te atrapalhar nisso."
        },
        {
            text: "Começa então por me responder...",
            text_newline: "Qual é a coisa qual é ela...",
            text_newline_2: "Que varre o ceu todos os dias..?",
            hasInput: true,
            inputType: "riddle",
            inputText: "Qual é a tua resposta? (Qual é a coisa qual é ela, que varre o céu todos os dias...?)",
            inputAnswers: ["lingua", "língua", "Língua", "Lingua", "LINGUA", "LÍNGUA"]
        }
    ]
}