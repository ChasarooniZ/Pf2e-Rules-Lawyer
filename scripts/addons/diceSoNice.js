export function handleDiceSoNice(func, params, msgID = null) {
  if (
    game.modules.get("dice-so-nice")?.active &&
    !game.settings.get("dice-so-nice", "immediatelyDisplayChatMessages")
  ) {
    const hookId = Hooks.on("diceSoNiceRollComplete", (id) => {
      if (id === msgID || msgID === null) {
        func(...params);
        disableHook();
      }
    });
    function disableHook() {
      Hooks.off("createChatMessage", hookId);
    }
  } else {
    func(...params);
  }
}
