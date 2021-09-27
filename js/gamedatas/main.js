// refresh scenes
myPhaserConfig.scene = [SceneMain]
// creation GAME Instance
const LOGON = false
let ITEMFACTORY = new ItemFactory();
let UIFACTORY = new UiDomFactory();
let PLAYERFACTORY = new PlayerFactory();
let GAME = new Phaser.Game(myPhaserConfig);
