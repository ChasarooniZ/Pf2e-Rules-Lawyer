let socketlibSocket = undefined;
// Taken by Reference from Pf2e Action Support
async function createEffects(data) {
  const actor = await fromUuid(data.actorUuid);
  const source = (await fromUuid(data.eff)).toObject();
  source.flags = foundry.utils.mergeObject(source.flags ?? {}, {
    core: { sourceId: data.eff },
  });
  if (data.level) {
    source.system.level = { value: data.level };
  }
  await actor.createEmbeddedDocuments("Item", [source]);
}
export const setupSocket = () => {
  if (globalThis.socketlib) {
    socketlibSocket = globalThis.socketlib.registerModule("pf2e-rules-lawyer");
    socketlibSocket.register("createEffects", createEffects);
  }
  return !!globalThis.socketlib;
};
