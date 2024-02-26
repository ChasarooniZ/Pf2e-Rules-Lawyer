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
        default: 0,
        type: Number,
    });

    game.settings.register("pf2e-rules-lawyer", "offset.y", {
        name: game.i18n.localize("pf2e-rules-lawyer.module-settings.offset.y.name"),
        hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.offset.y.hint"),
        scope: "world",
        config: true,
        default: 0,
        type: Number,
    });
    
    game.settings.register("pf2e-rules-lawyer", "position", {
        name: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.name"),
        hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.hint"),
        scope: "world",
        config: true,
        default: "bot-right",
        type: String,
        choices: {
            ["top-left"]: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.choices.top-left"),
            ["top-right"]: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.choices.top-right"),
            ["bot-left"]: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.choices.bot-left"),
            ["bot-right"]: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.choices.bot-right"),
        }
    });
  
    game.settings.register("pf2e-rules-lawyer", "scale", {
        name: game.i18n.localize("pf2e-rules-lawyer.module-settings.scale.name"),
        hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.scale.hint"),
        scope: "world",
        config: true,
        default: 1,
        type: Number,
    });

    game.settings.register("pf2e-rules-lawyer", "duration", {
        name: game.i18n.localize("pf2e-rules-lawyer.module-settings.duration.name"),
        hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.duration.hint"),
        scope: "world",
        config: true,
        default: 1,
        type: Number,
    });

    game.settings.register("pf2e-rules-lawyer", "duration", {
        name: game.i18n.localize("pf2e-rules-lawyer.module-settings.duration.name"),
        hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.duration.hint"),
        scope: "world",
        config: true,
        default: 5,
        type: Number,
    });

    game.settings.register("pf2e-rules-lawyer", "volume", {
        name: game.i18n.localize("pf2e-rules-lawyer.module-settings.volume.name"),
        hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.volume.hint"),
        scope: "world",
        config: true,
        default: 50,
        range: {
            min: 1,
            max: 100,
            step: 1
        },
        type: Number,
    });
})