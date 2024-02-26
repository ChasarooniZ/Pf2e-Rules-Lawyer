Hooks.once('ready', function () {
    Hooks.on('modifiersMatter', (data) => {
        //console.log({ modifiers: data })
        if (!game.settings.get("pf2e-rules-lawyer", "enabled")) return;
        const sigMods = ["ESSENTIAL", "HELPFUL", "HARMFUL", "DETRIMENTAL"];
        if (data?.significantModifiers.some(mod => sigMods.includes(mod.significance))) {
            const position = game.settings.get("pf2e-rules-lawyer", "position");
            const anchor = getAnchor(position);
            const uiOffset = getUIOffset(position)
            const offset = getBaseOffset(position);
            const vidFile = 'modules/pf2e-rules-lawyer/resources/every-plus-one-extra.webm';
            const sfxFile = 'modules/pf2e-rules-lawyer/resources/rules-lawyer-sfx.ogg';
            const volume = game.settings.get("pf2e-rules-lawyer", "volume") / 100;
            const userXOffset = game.settings.get("pf2e-rules-lawyer", "offset.x");
            const userYOffset = game.settings.get("pf2e-rules-lawyer", "offset.y");
            const duration = game.settings.get("pf2e-rules-lawyer", "duration") * 1000;
            const fadeOutDuration = duration/5;
            const scale = 1/3 * game.settings.get("pf2e-rules-lawyer", "scale");
            new Sequence()
                .effect()
                .file(vidFile)
                .screenSpace()
                .screenSpaceAnchor(anchor)
                .screenSpaceAboveUI()
                .screenSpacePosition({ x:userXOffset + uiOffset + offset.x, y: userYOffset + offset.y })
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

function getBaseOffset(position) {
    switch (position) {
        case 'bot-left':
            return { x: 200, y: -100 }
        case 'bot-right':
            return { x: -180, y: -40 }
        case 'top-left':
            return { x: 100, y: 60 }
        case 'top-right':
            return { x: -240, y: 50 }
        default:
            return { x: 0, y: 0 }
    }
}