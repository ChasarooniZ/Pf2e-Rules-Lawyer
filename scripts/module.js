import {
  RULES_LAWYER_EVIL_SFX,
  RULES_LAWYER_EVIL_VID,
  RULES_LAWYER_SFX,
  RULES_LAWYER_VID,
} from "./constants.js";
import { getSetting } from "./helpers.js";

Hooks.once("ready", function () {
  game.rulesLawyer = {
    create: function (evil = false) {
      const effectData = {
        vid: evil ? RULES_LAWYER_EVIL_VID : RULES_LAWYER_VID,
        sfx: evil ? RULES_LAWYER_EVIL_SFX : RULES_LAWYER_SFX,
      };
      createRulesLawyerEffect(
        effectData.vid,
        [...game.users.keys()],
        effectData.sfx
      );
    },
  };
  Hooks.on("modifiersMatter", (data) => {
    //console.log({ modifiers: data })
    if (!getSetting("enabled")) return;
    const harmHelp = isHelpfulOrHarmful(data);
    debugLog({ data, harmHelp });
    let vidFile = RULES_LAWYER_VID;
    let sfxFile = RULES_LAWYER_SFX;
    if (harmHelp === "HARMFUL") {
      const harmful_option = game.settings.get(
        "pf2e-rules-lawyer",
        "harmful-options"
      );
      switch (harmful_option) {
        case "none":
          return;
        case "normal":
          break;
        case "alt-sound":
          sfxFile = RULES_LAWYER_EVIL_SFX;
          break;
        case "alt-image":
          vidFile = RULES_LAWYER_EVIL_VID;
          break;
        case "alt-sound-image":
          vidFile = RULES_LAWYER_EVIL_VID;
          sfxFile = RULES_LAWYER_EVIL_SFX;
          break;
        default:
          return;
      }
    }
    createRulesLawyerEffect(vidFile, data, sfxFile);
  });
});

/**
 * Creates a rules lawyer effect using a video and optional sound effect.
 * @param {string} vidFile - The file path or URL of the video file.
 * @param {object} data - Data object containing information related to the effect.
 * @param {string} [data.chatMessage.whisper] - Optional. Array of user IDs to whisper the effect to.
 * @param {string} [sfxFile] - Optional. The file path or URL of the sound effect file.
 */
function createRulesLawyerEffect(vidFile, data, sfxFile) {
  // Constants
  const videoWidth = 1104;
  const videoHeight = 300;
  const desiredWindowScale = 20; //in %
  const videoScale = desiredWindowScale / 100;

  // Settings
  const position = getSetting("position");
  const anchor = getAnchor(position);
  const uiOffset = getUIOffset(position);
  const volume = getSetting("volume") / 100;
  const worldXOffset = getSetting("offset.x");
  const worldYOffset = getSetting("offset.y");
  const userXOffset = getSetting("offset.x");
  const userYOffset = getSetting("offset.y");
  const duration = getSetting("duration") * 1000;
  const fadeOutDuration = duration / 5;
  const delay = getSetting("delay") * 1000;
  const scale = videoScale * getSetting("scale") * getSetting("player.scale");
  const imgOffset = getImageOffset(position);

  // Create effect sequence
  new Sequence()
    .effect()
    .file(vidFile)
    .screenSpace()
    .screenSpaceAnchor(anchor)
    .screenSpaceAboveUI()
    .screenSpacePosition({
      x: worldXOffset + uiOffset + userXOffset + imgOffset.x,
      y: worldYOffset + userYOffset + imgOffset.y,
    })
    .duration(duration)
    .fadeOut(fadeOutDuration)
    .screenSpaceScale({
      x: scale,
      y: scale,
      fitX: true,
      ratioY: true,
    })
    .delay(delay)
    .forUsers(data?.chatMessage?.whisper ?? [...game.users.keys()]) // Whisper to specified users or all users
    .sound()
    .file(sfxFile)
    .volume(volume)
    .duration(duration)
    .fadeOutAudio(fadeOutDuration)
    .delay(delay)
    .forUsers(data?.chatMessage?.whisper ?? [...game.users.keys()]) // Whisper to specified users or all users
    .play(); // Play the effect
}

function getAnchor(position) {
  switch (position) {
    case "bot-left":
      return { x: 0, y: 1 };
    case "bot-right":
      return { x: 1, y: 1 };
    case "top-left":
      return { x: 0, y: 0 };
    case "top-right":
      return { x: 1, y: 0 };
    default:
      return { x: 0.5, y: 1 };
  }
}

function getImageOffset(position) {
  switch (position) {
    case "bot-left":
      return { x: 60, y: -120 };
    case "bot-right":
      return { x: -60, y: -60 };
    case "top-left":
      return { x: 30, y: 60 };
    case "top-right":
      return { x: -60, y: 60 };
    default:
      return { x: 120, y: 240 };
  }
}

function getUIOffset(position) {
  switch (position) {
    case "bot-left":
      return $("nav#controls").width();
    case "bot-right":
      return -$(".chat-sidebar").width();
    case "top-left":
      return $("nav#controls").width();
    case "top-right":
      return -$(".chat-sidebar").width();
    default:
      return 0;
  }
}

function isHelpfulOrHarmful(data) {
  const relevantSignificance = [];
  const isRollerGood = data.rollingActor.alliance === "party";
  const isDCGood = data.actorWithDc.alliance === "party";
  const isAttack =
    data.chatMessage?.flags?.pf2e?.context?.type === "attack-roll";
  if (isRollerGood) relevantSignificance.push("ESSENTIAL");
  if (isDCGood)
    isAttack
      ? relevantSignificance.push("HARMFUL")
      : relevantSignificance.push("ESSENTIAL");
  return data.significantModifiers.some((mod) =>
    relevantSignificance.includes(mod.significance)
  )
    ? "HELPFUL"
    : "HARMFUL";
}

export function debugLog(data, context = "") {
  if (getSetting("debug"))
    console.log(
      `PF2E-Rules-Lawyer${context ? "[" + context + "]" : ""}:`,
      data
    );
}
