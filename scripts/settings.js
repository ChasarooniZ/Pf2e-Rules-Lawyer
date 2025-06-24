Hooks.on("init", () => {
  game.settings.register("pf2e-rules-lawyer", "enabled", {
    name: game.i18n.localize("pf2e-rules-lawyer.module-settings.enabled.name"),
    hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.enabled.hint"),
    scope: "world",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register("pf2e-rules-lawyer", "harmful-options", {
    name: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.harmful-options.name"
    ),
    hint: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.harmful-options.hint"
    ),
    scope: "world",
    config: true,
    default: "alt-sound-image",
    type: String,
    choices: {
      ["normal"]: game.i18n.localize(
        "pf2e-rules-lawyer.module-settings.harmful-options.choices.normal"
      ),
      ["none"]: game.i18n.localize(
        "pf2e-rules-lawyer.module-settings.harmful-options.choices.none"
      ),
      ["alt-sound"]: game.i18n.localize(
        "pf2e-rules-lawyer.module-settings.harmful-options.choices.alt-sound"
      ),
      ["alt-image"]: game.i18n.localize(
        "pf2e-rules-lawyer.module-settings.harmful-options.choices.alt-image"
      ),
      ["alt-sound-image"]: game.i18n.localize(
        "pf2e-rules-lawyer.module-settings.harmful-options.choices.alt-sound-image"
      ),
    },
  });

  game.settings.register("pf2e-rules-lawyer", "position", {
    name: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.name"),
    hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.position.hint"),
    scope: "world",
    config: true,
    default: "bot-right",
    type: String,
    choices: {
      ["top-left"]: game.i18n.localize(
        "pf2e-rules-lawyer.module-settings.position.choices.top-left"
      ),
      ["top-right"]: game.i18n.localize(
        "pf2e-rules-lawyer.module-settings.position.choices.top-right"
      ),
      ["bot-left"]: game.i18n.localize(
        "pf2e-rules-lawyer.module-settings.position.choices.bot-left"
      ),
      ["bot-right"]: game.i18n.localize(
        "pf2e-rules-lawyer.module-settings.position.choices.bot-right"
      ),
    },
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

  game.settings.register("pf2e-rules-lawyer", "player.offset.x", {
    name: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.player.offset.x.name"
    ),
    hint: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.player.offset.x.hint"
    ),
    scope: "client",
    config: true,
    default: 0,
    type: Number,
  });

  game.settings.register("pf2e-rules-lawyer", "player.offset.y", {
    name: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.player.offset.y.name"
    ),
    hint: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.player.offset.y.hint"
    ),
    scope: "client",
    config: true,
    default: 0,
    type: Number,
  });

  game.settings.register("pf2e-rules-lawyer", "scale", {
    name: game.i18n.localize("pf2e-rules-lawyer.module-settings.scale.name"),
    hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.scale.hint"),
    scope: "world",
    config: true,
    default: 1,
    type: Number,
  });

  game.settings.register("pf2e-rules-lawyer", "player.scale", {
    name: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.player.scale.name"
    ),
    hint: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.player.scale.hint"
    ),
    scope: "client",
    config: true,
    default: 1,
    type: Number,
  });

  game.settings.register("pf2e-rules-lawyer", "delay", {
    name: game.i18n.localize("pf2e-rules-lawyer.module-settings.delay.name"),
    hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.delay.hint"),
    scope: "world",
    config: true,
    default: 1,
    range: {
      min: 0,
      max: 10,
      step: 0.1,
    },
    type: Number,
  });

  game.settings.register("pf2e-rules-lawyer", "duration", {
    name: game.i18n.localize("pf2e-rules-lawyer.module-settings.duration.name"),
    hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.duration.hint"),
    scope: "world",
    config: true,
    default: 5,
    range: {
      min: 0,
      max: 10,
      step: 0.1,
    },
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
      step: 1,
    },
    type: Number,
  });

  game.settings.register("pf2e-rules-lawyer", "aid.on-action.enable", {
    name: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.aid.on-action.enable.name"
    ),
    hint: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.aid.on-action.enable.hint"
    ),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register("pf2e-rules-lawyer", "exact-only", {
    name: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.exact-only.name"
    ),
    hint: game.i18n.localize(
      "pf2e-rules-lawyer.module-settings.exact-only.hint"
    ),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register("pf2e-rules-lawyer", "debug", {
    name: game.i18n.localize("pf2e-rules-lawyer.module-settings.debug.name"),
    hint: game.i18n.localize("pf2e-rules-lawyer.module-settings.debug.hint"),
    scope: "world",
    config: true,
    default: false,
    type: Boolean,
  });
});
