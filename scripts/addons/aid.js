import { waitForMessage } from "./diceSoNice.js";

export async function aid() {
  let dc = await Dialog.wait({
    title: "Ronald's Aid Macro",
    content: `
            <form>
                <div class="form-group">
                    <label>DC of Aid Check:</label>
                    <input type="number" name="number" required>
                </div>
            </form>
        `,
    buttons: {
      submit: {
        icon: '<i class="fas fa-check"></i>',
        label: "Submit",
        callback: (html) => {
          let number = parseInt(html.find('input[name="number"]').val());
          if (!isNaN(number)) {
            // Handle the number here (for example, send it to chat)
            return number;
          } else {
            ui.notifications.error("Please enter a valid number.");
          }
        },
      },
    },
  });
  let hookId = -1;
  const token = canvas.tokens.controlled?.[0] ?? game.user.character.token;
  const target = game.user.targets.first();
  if (token) addAidingEffect(token);
  ui.notifications.notify(
    `You are now prepared to aid, now attempt the appropriate skill or attack roll as approved by the DM`
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
      data.degree = "Critical Success";
      data.bonus = "+4";
      data.uuid =
        "Compendium.pf2e-rules-lawyer.rules-lawyer-patched-items.Item.dBlNyIre5KrR9yHM";
    } else if (diff >= 0) {
      //Success
      data.degree = "Success";
      data.bonus = "+2";
      data.uuid =
        "Compendium.pf2e-rules-lawyer.rules-lawyer-patched-items.Item.3CuvkOIoaCKVo9zg";
    } else if (diff > -10) {
      //Failure
      data.degree = "Failure";
      data.bonus = "+1";
      data.uuid =
        "Compendium.pf2e-rules-lawyer.rules-lawyer-patched-items.Item.v3dEizRtPt4nPmSP";
    } else {
      //Critical Failure
      data.degree = "Critical Failure";
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
      content: `<h3>Aid</h3>
        <p><i>DC ${dc} ${diff >= 0 ? "succeeded" : "failed"} by ${
        diff > 0 ? "+" + diff.toString() : diff
      }</i></p>
        <b>${data.degree}</b> Your ally gets a <b>${
        data.bonus
      }</b> to their check or attack roll
      <p>@UUID[${data.uuid}]</p>`,
      speaker: ChatMessage.getSpeaker({ token: tok.actor }),
    });
  }
}
