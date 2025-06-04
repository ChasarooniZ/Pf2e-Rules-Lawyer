export function waitForMessage(id, ms = 250, attempts = 120) {
  return new Promise(function (resolve, reject) {
    (function wait(count = 0) {
      if (count > attempts) return reject();

      if (
        count != 0 &&
        $(ui.chat.element).find(
          `.message[data-message-id="${id}"]:not(.dsn-hide)`
        ).length !== 0
      )
        return resolve();

      setTimeout(wait, ms, count + 1);
    })();
  });
}
