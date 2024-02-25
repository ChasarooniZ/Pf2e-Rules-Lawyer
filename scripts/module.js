Hooks.once('ready', function () {
    Hooks.on('modifiersMatter', (data) => {
        //console.log({ modifiers: data })
        if (!game.settings.get("pf2e-rules-lawyer", "enabled")) return;
        const sigMods = ["ESSENTIAL", "HELPFUL", "HARMFUL", "DETRIMENTAL"];
        if (data?.significantModifiers.some(mod => sigMods.includes(mod.significance))) {
            const position = "bot-right";
            const anchor = getAnchor(position);
            const uiOffset = getUIOffset(position)
            const vidFile = 'modules/pf2e-rules-lawyer/resources/every-plus-one-extra.webm';
            const sfxFile = 'modules/pf2e-rules-lawyer/resources/rules-lawyer-sfx.ogg';
            const volume = 0.5;
            const xOffset = game.settings.get("pf2e-rules-lawyer", "offset.x");
            const yOffset = game.settings.get("pf2e-rules-lawyer", "offset.y");
            const duration = 5000;
            const fadeOutDuration = 1000;
            const scale = 1/3;
            new Sequence()
                .effect()
                .file(vidFile)
                .screenSpace()
                .screenSpaceAnchor(anchor)
                .screenSpaceAboveUI()
                .screenSpacePosition({ x:xOffset + uiOffset, y: yOffset })
                .duration(duration)
                .fadeOut(fadeOutDuration)
                .scale(scale)
                .forUsers(data?.chatMessage?.whisper ?? [...game.users.keys()])
                .sound()
                .file(sfxFile)
                .volume(volume)
                .duration(duration)
                .fadeOutAudio(fadeOutDuration)
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

function getUIOffset(position) {
    switch (position) {
        case 'bot-left':
            return $('nav#controls').width()
        case 'bot-right':
            return -
            $('.chat-sidebar').width();
        case 'top-left':
            return $('nav#controls').width()
        case 'top-right':
            return -
            $('.chat-sidebar').width();
        default:
            return 0;
    }
}