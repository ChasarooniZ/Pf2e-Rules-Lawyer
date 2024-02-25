Hooks.once('ready', function () {
    Hooks.on('modifiersMatter', (data) => {
        //console.log({ modifiers: data })
        if (!game.settings.get("pf2e-rules-lawyer", "enabled")) return;
        const sigMods = ["ESSENTIAL", "HELPFUL", "HARMFUL", "DETRIMENTAL"];
        if (data?.significantModifiers.some(mod => sigMods.includes(mod.significance))) {
            const chatWidth = chat.offsetWidth;
            const position = "bot-right";
            const anchor = getAnchor(position);
            const file = 'modules/pf2e-rules-lawyer/resources/every-plus-one-extra.webm';
            const xOffset = -40;
            const yOffset = 0
            const duration = 5000;
            const fadeOutDuration = 1000;
            const scale = 1/3;
            new Sequence()
                .effect()
                .file(file)
                .screenSpace()
                .screenSpaceAnchor(anchor)
                .screenSpacePosition({ x:xOffset - chatWidth, y: yOffset })
                .duration(duration)
                .fadeOut(fadeOutDuration)
                .scale(scale)
                .forUsers(data?.chatMessage?.whisper ?? [...game.users.keys()])
                .play()
        }
    })
});


function getAnchor(position) {
    switch (position) {
        case 'bot-left':
            return { x: 0, y: 1 }
        case 'bot-right':
            return { x: 1, y: 1 }
        case 'top-left':
            return { x: 0, y: 0 }
        case 'top-right':
            return { x: 1, y: 0 }
        default:
            return { x: 0.5, y: 1 }
    }
}