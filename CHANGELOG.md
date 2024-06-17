## 12.0.0 V12 Support
- Now supports Fvtt `v12` and relevant module upgrades (Sequencer+ modifiers matters)
- Changes
  - Added an API, can be called like so:
    - `game.rulesLawyer`
       - `create(evil: Boolean)` if evil is true play evil rules lawyer FX, otherwise play the normal one
    - Should help for anyone who wants do the effect manually
  - Positioning + Sizing changes
    - Made some misc. positioning/sizing changes as I realized I was basing the size of the effect based on who triggered it's browser size
    - Not Fully finished, will probably update it once more when I get around to thinking about it
## 11.3.0 Ronald's Rules of Aiding
- Added new Compenmdium `Rules Lawyer Item Patches` that includes updated `Aid` and `Effect: Aid`
- Rules based on [this video](https://www.youtube.com/watch?v=pvYzD7Bna60)
- As follows changes are
  - DC = DC of check you are aiding
  - New Result States
    -  **Crit Succ** +4 Circumstance Bonus
    -  **Succ** +2 Circumstance Bonus
    -  **Fail** +1 Circumstance Bonus
    -  **Crit Fail** -1 Circumstance Bonus
## 11.2.0 Official Launch + Evil Ronald
- This release marks the official launch after getting approval!
- **Harmful +1s** (Suggested by @ronaldsf)
  - Added options to choose how to handle when +1s matter not in favor of a party member
  - Options are as follows:
    - `Treat Normally` - Show as normal +1s Mattering
    - `Don't Show` - Don't show when it benefits not the party
    - `Use Alt Sound` - Uses alternative "evil" sound
    - `Use Alt Pop up` - Uses alternative "evil" ronald pop up
    - `Use Alt Pop up` - Uses alternative "evil" sound + ronald pop up
- **Delay** (Suggested by @ronaldsf)
  - Added option to add a delay to when the effect appears after creating the chat message
- **Debug Mode**
  - Added debug option to give more information on what's happening
- **Updated Visuals**
  - Updated the videos to be a higher quality background removal (got better at removing)
- **Bug Fixes**
  - Fixed some of the options tooltips not being as clear
## 11.1.1 User Settings + Optimizations
- Added User settings for the following so each person can adjust as desired
  - `Offset X`
  - `Offset Y`
  - `Scale`
- Simplified code thanks guidance from (@shemetz)
## 11.1.0 Every +1 Matters
- Romance Dawn, Initial Release
- Adds the iconic Rules Lawyer Every +1 Matters to your games when they do matter
- Relies on Sequencer to create the effect and Modifiers Matter to detect when the modifiers matter 
