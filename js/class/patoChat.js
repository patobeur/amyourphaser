"use strict";
let nbMess = 0;
// ------------------------ -----
class ChatBit {
	constructor() {
		// local Datas
		// this.messages = {
		// 	0: {
		// 		mess: 'Bonjour !',
		// 		type: 'text',
		// 		id: 'Bot',
		// 		time: 0
		// 	}
		// }
		// Targets
		// store current bot question
		this.botQuestionsStack = { id: false, name: false, sentence: false }
		this.pendingQuestionsStack = { id: false, name: false, sentence: false }
		// tempo datas
		this.temporaryName = 'User'

		// check if first comming ?
		this.icons = { bot: '💡', me: '🕹️' }//🧙

		this.chatInput = document.getElementById('chatput')
		this.chatDiv = document.getElementById('chat-container')
		this.submitActionDiv = document.getElementById('chatbit')
		this.biggerActionDiv = document.getElementById('bigger')
		this.fixchatActionDiv = document.getElementById('fixchat')
		this.clearStorageActionDiv = document.getElementById('clearstorage')
		// local Datas
		this.chatSize = { num: 0, sizes: ['sm', 'md', 'xl'] };
		// this.chatDiv.classList.add(this.chatSize[this.chatSize.num].sizes)
		// Targets Listeners	
		this.submitActionDiv.addEventListener('click', this.checkSend, false)
		this.biggerActionDiv.addEventListener('click', this.get_biggerChat)
		this.fixchatActionDiv.addEventListener('click', this.get_fixedChat, false)
		this.clearStorageActionDiv.addEventListener('click', this.clearStorage, false)
		this.get_biggerChat()
		// this.is_known()
	}

	is_known = () => {
		let mls_user = localStorage.getItem('mls_user')
		if (mls_user) {
			// console.log('welcome back ! ' + mls_user)
			this.add_message('welcome back ! ' + mls_user, 'text')
		} else {
			// localStorage.setItem('mls_user', this.temporaryName)
			// console.log('need profil creation ! ')
			this.add_message('New around ? what is your name ?', 'text')
			this.botQuestionsStack = { id: 1, name: [true], sentence: ' is your name ? (y/n)', answers: { 'y': 'save', 'n': 'exit' } }
		}
	}
	clearStorage = () => {
		this.redirect_clear_Storage();
	}
	get_fixedChat = () => {
		this.chatDiv.classList.contains('open') ? this.chatDiv.classList.remove('open') : this.chatDiv.classList.add('open')
		this.fixchatActionDiv.classList.contains('active') ? this.fixchatActionDiv.classList.remove('active') : this.fixchatActionDiv.classList.add('active')
	}
	get_biggerChat = (eve) => {
		this.chatDiv.classList.remove(this.chatSize.sizes[this.chatSize.num])
		this.chatSize.num = (this.chatSize.num < this.chatSize.sizes.length - 1) ? this.chatSize.num + 1 : 0
		this.chatDiv.classList.add(this.chatSize.sizes[this.chatSize.num])
	}
	add_message = (content, type, who = 'bot', uid = false, sentence = false) => {
		// need to be cleaned 
		// need to be cleaned 
		let cleancontent = content // need to be cleaned 
		let cleantype = type // need to be cleaned 
		let cleanwho = who // need to be cleaned 
		// need to be cleaned 
		// need to be cleaned 
		// ---
		let newcontentDiv = document.createElement('div')
		newcontentDiv.className = cleantype
		newcontentDiv.textContent = this.icons[who] + nbMess + ':' + cleancontent
		// ---
		let newmessDiv = document.createElement('div')
		newmessDiv.id = 'mess-' + nbMess
		newmessDiv.className = cleanwho
		newmessDiv.appendChild(newcontentDiv)
		// ---
		let targetDiv = document.getElementById('messages-box')
		targetDiv.prepend(newmessDiv)
		// ---
		document.getElementById('chat-container').classList.add('active')
		// ---
		nbMess++
		setTimeout(this.set_chatOff, 5000, 'test')
	}
	checkSend = () => {
		let intputValue = this.chatInput.value
		if (intputValue.length > 0) {
			this.reroot_add_message(intputValue, 'text', 'me')
			this.chatInput.value = ""
		}
	}
	checkEnterKey = () => {
		if (this.chatInput.matches(':focus')) {
			this.checkSend()
		}
	}
	set_chatOff = (content = "vide") => {
		document.getElementById('chat-container').classList.remove('active')
	}

	redirect_clear_Storage = () => { console.log('clear_Storage'); localStorage.clear(); }

	regex_input = (value) => { return value.replaceAll(/[&/\\#,+()$~%.^'":*?<>{}]/g, "*"); }
	// ---

	reroot_add_message = (content, type, who, uid) => {
		// EXPERIMENTAL BUG
		content = this.regex_input(content)
		this.add_message(content, type, who, uid)
		// check respons correlation
		if (this.botQuestionsStack.name && this.botQuestionsStack.sentence && this.botQuestionsStack.name[0]) {
			localStorage.setItem('mls_user', content)
			this.add_message(content + ", " + this.botQuestionsStack.sentence, 'text')
			this.botQuestionsStack = { id: 2, name: [true], sentence: ' Oops sorry ' + content + ' i can\'t save this right now... Class is pretty broken and Dev is ... ? Well ! Don\'t know where he is !?!. Just Empty [🔨] your localStorage and refresh [F5] to clear your name.', answers: { y: '', n: '' } }
			setTimeout(() => { this.add_message('see you later !!!', 'text') }, 5000, false)
			setTimeout(() => { document.getElementById('chat-container').remove() }, 7000, false)
		}
	}
	// submit_question = () => {
	// todo
	// }
	// clear_Storage = () => {
	// 	MyDataz.clear_Storage();
	// }
}
let ChatBot = new ChatBit();
