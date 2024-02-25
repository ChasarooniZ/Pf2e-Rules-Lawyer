Hooks.on("init", () => {
    const debouncedReload = foundry.utils.debounce(() => window.location.reload(), 100);

    game.settings.register("pf2e-rules-lawyer", "enabled", {
        name: game.i18n.localize("pf2e-rules-lawyer.module-settings.enabled.name"),
        hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.enabled.hint"),
        scope: "world",
        config: true,
        default: true,
        type: Boolean,
    });

    game.settings.register("pf2e-rules-lawyer", "offset.x", {
        name: game.i18n.localize("pf2e-rules-lawyer.module-settings.offset.x.name"),
        hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.offset.x.hint"),
        scope: "world",
        config: true,
        default: -180,
        type: Number,
    });

    game.settings.register("pf2e-rules-lawyer", "offset.y", {
        name: game.i18n.localize("pf2e-rules-lawyer.module-settings.offset.y.name"),
        hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.offset.y.hint"),
        scope: "world",
        config: true,
        default: -40,
        type: Number,
    });
    
    // game.settings.register("pf2e-rules-lawyer", "position", {
    //     name: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.name"),
    //     hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.hint"),
    //     scope: "world",
    //     config: true,
    //     default: "roll",
    //     type: String,
    //     choices: {
    //         ["top-left"]: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.choices.top-left"),
    //         ["top-right"]: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.choices.top-right"),
    //         ["bot-left"]: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.choices.bot-left"),
    //         ["bot-right"]: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.choices.bot-right"),
    //     }
    // });
})