import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  language: any

  constructor() {
    if (!this.language)
      this.createLanguageMap()
  }

  createLanguageMap() {
    this.language = new Map<string, Map<string, string>>();
    const words = [{
      key: 'feed', en: "feed", pt: "feed"
    }, {
      key: 'seguindo', en: "Following", pt: "Seguindo"
    }, {
      key: 'notificacoes', en: "Notifications", pt: "Notificações"
    }, {
      key: 'mensagens', en: "Messages", pt: "Mensagens"
    }, {
      key: 'grupos', en: "Groups", pt: "Grupos"
    }, {
      key: 'itenssalvos', en: "Saved Items", pt: "Itens Salvos"
    }, {
      key: 'minhasfotos', en: "My Photos", pt: "Minhas Fotos"
    }, {
      key: 'logout', en: "Log out", pt: "Sair"
    }, {
      key: 'meusgrupos', en: "My Groups", pt: "Meus Grupos"
    }, {
      key: 'publicos', en: "Public", pt: "Publicos"
    }, {
      key: 'postar', en: "Post", pt: "Postar"
    }, {
      key: 'doceoutravessura', en: "Trick or treat", pt: "Doce ou travessura?"
    }, {
      key: 'criarouadicionaralbum', en: "Create or add to an album", pt: "Criar ou adicionar a um álbum"
    }, {
      key: 'enviando', en: "sending", pt: "enviando"
    }, {
      key: 'postenviado', en: "Post sent", pt: "Post enviado"
    }, {
      key: 'fechar', en: "Close", pt: "Fechar"
    }, {
      key: 'senha', en: "password", pt: "senha"
    }, {
      key: 'qualseuemail', en: "What's your email?", pt: "Qual seu email?"
    }, {
      key: 'digitoualgoerrado', en: "I think you typed something wrong!", pt: "Acho que vc digitou algo errado!"
    }, {
      key: 'naoesquecasenha', en: "Don't forget your password!", pt: "Não esqueça da senha!"
    }, {
      key: 'logar', en: "Login", pt: "Logar"
    }, {
      key: 'registrese', en: "Register", pt: "Registre-se"
    }, {
      key: 'fotodeperfil', en: "Profile picture", pt: "Foto do perfil"
    }, {
      key: 'quemsabeumafoto', en: "Who knows a little picture of you?", pt: "Quem sabe uma fotinha sua?"
    }, {
      key: 'nome', en: "name", pt: "nome"
    }, {
      key: 'senha5caracteres', en: "Password must be longer than 5 characters", pt: "Senha deve ter mais de 5 caracteres "
    }, {
      key: 'todocadastrosenha', en: "Every registration needs a password, right?", pt: " Todo cadastro precisa de uma senha né não? "
    }, {
      key: 'repetirsenha', en: "repeat password?", pt: "repetir a senha "
    }, {
      key: 'poderepetirporfavor', en: "Can you repeat it, please?", pt: "Pode repetir, por favor? "
    }, {
      key: 'algonaoconfere', en: "Oops, something doesn't match here! 🙃", pt: "Oops, algo não confere aqui! 🙃"
    }, {
      key: 'registrar', en: "Register", pt: "Registrar"
    }, {
      key: 'minhasnotificacoes', en: "My notifications", pt: "Minhas notificacões"
    }, {
      key: 'perfil', en: "Profile", pt: "Perfil"
    }, {
      key: 'pesquisar', en: "search", pt: "pesquisar"
    }]








    words.forEach(w => {
      this.addToLanguageMap(w.key, w.pt, w.en)
    })

  }

  addToLanguageMap(key: string, wordPt: string, wordEn: string) {
    const mapLng = new Map<string, string>([["pt", wordPt], ["en", wordEn]])
    this.language.set(key, mapLng);
  }

  getWord(word: string) {
    const lng = window.location.host == 'exchangeagram.app' ? 'en' : 'pt';
    return this.language.get(word)?.get(lng)
  }
}
