import { waitForMessage } from "./diceSoNice.js";

export async function aid() {
  let dc;
  try {
    dc = await foundry.applications.api.DialogV2.prompt({
      window: {
        title: game.i18n.localize("pf2e-rules-lawyer.dialog.aid.title"),
      },
      content: `<div class="form-group">
          <label>${game.i18n.localize(
            "pf2e-rules-lawyer.dialog.aid.description"
          )}:</label>
          <input name="dc" type="number" min="1" max="200" step="1" autofocus>
        </div>`,
      ok: {
        label: game.i18n.localize("pf2e-rules-lawyer.dialog.aid.submit"),
        callback: (event, button, dialog) =>
          button.form.elements.dc.valueAsNumber,
      },
    });
  } catch {
    console.log("User did not submit a dc.");
    return;
  }

  let hookId = -1;
  const token = canvas.tokens.controlled?.[0] ?? game.user.character.token;
  const target = game.user.targets.first();
  if (token) addAidingEffect(token);
  ui.notifications.notify(
    game.i18n.localize("pf2e-rules-lawyer.notification.aid-effect")
  );

  hookId = Hooks.on("createChatMessage", waitForAid);
  async function waitForAid(msg, _misc, id) {
    if (id === game.user.id && msg.isCheckRoll) {
      const rollValue = msg?.rolls?.[0]?.total;
      waitForMessage(msg.id).then(() => {
        handleResult(rollValue);
        Hooks.off("createChatMessage", hookId);
      });
    }
  }

  async function addAidingEffect(tok) {
    const item = await fromUuid(
      "Compendium.pf2e-rules-lawyer.rules-lawyer-patched-items.Item.pN3qY1aRaI5Iz0Ra"
    );
    const source = item.toObject();
    await tok.actor.createEmbeddedDocuments("Item", [source]);
  }

  async function handleResult(rollValue) {
    const [dcVal, tok, targ] = [dc, token, target];
    const diff = rollValue - dcVal;
    const data = {};
    const aidUUID = "Compendium.pf2e.other-effects.Item.AHMUpMbaVkZ5A1KX";
    if (diff >= 10) {
      //Crit Success
      data.degree = game.i18n.localize("pf2e-rules-lawyer.dos.cs");
      data.bonus = "+4";
      data.uuid =
        "Compendium.pf2e-rules-lawyer.rules-lawyer-patched-items.Item.dBlNyIre5KrR9yHM";
    } else if (diff >= 0) {
      //Success
      data.degree = game.i18n.localize("pf2e-rules-lawyer.dos.s");
      data.bonus = "+2";
      data.uuid =
        "Compendium.pf2e-rules-lawyer.rules-lawyer-patched-items.Item.3CuvkOIoaCKVo9zg";
    } else if (diff > -10) {
      //Failure
      data.degree = game.i18n.localize("pf2e-rules-lawyer.dos.f");
      data.bonus = "+1";
      data.uuid =
        "Compendium.pf2e-rules-lawyer.rules-lawyer-patched-items.Item.v3dEizRtPt4nPmSP";
    } else {
      //Critical Failure
      data.degree = game.i18n.localize("pf2e-rules-lawyer.dos.cf");
      data.bonus = "-1";
      data.uuid =
        "Compendium.pf2e-rules-lawyer.rules-lawyer-patched-items.Item.bWQKYNvuKi0fPJZG";
    }
    if (targ) {
      socketlib.modules.get("pf2e-rules-lawyer").executeAsGM("createEffects", {
        actorUuid: targ.actor.uuid,
        eff: aidUUID,
        setChoice: {
          flag: "aidBonus",
          value: Number(data.bonus),
        },
      });
    }
    ChatMessage.create({
      content: `<h3>${game.i18n.localize("pf2e-rules-lawyer.message.aid")}</h3>
        <p><i>${game.i18n.localize("pf2e-rules-lawyer.message.dc")} ${dc} ${
        diff >= 0
          ? game.i18n.localize("pf2e-rules-lawyer.message.succeeded")
          : game.i18n.localize("pf2e-rules-lawyer.message.failed")
      } ${game.i18n.localize("pf2e-rules-lawyer.message.by")} ${
        diff > 0 ? "+" + diff.toString() : diff
      }</i></p>
        <b>${data.degree}</b> ${game.i18n.localize(
        "pf2e-rules-lawyer.message.your-ally"
      )} <b>${data.bonus}</b> ${game.i18n.localize(
        "pf2e-rules-lawyer.message.to-their"
      )}
      <p>@UUID[${data.uuid}]</p>`,
      speaker: ChatMessage.getSpeaker({ token: tok.actor }),
    });
  }
}
