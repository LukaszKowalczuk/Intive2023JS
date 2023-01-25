const Command = {
    EmailTaken: 20,
    NameTaken: 21,
    EmailAndNameTaken: 22,
    NoRegisteredUsers: 30,
    WrongPassword: 31,
    UserDoesntExsist: 32,
    Login: 40

}
//server form
const ServerCmd=document.querySelector("#ServerCmd")
const ServerScreen=document.querySelector("#ServerScreen")
const ServerUsername=document.querySelector("#ServerUsername")
const ServerSubmit=document.querySelector("#ServerSubmit")
const ServerPass=document.querySelector("#ServerPass")
//get method
const QueryString=window.location.search;
const UrlParams=new URLSearchParams(QueryString);
const cmd = UrlParams.get("cmd")
//load storage
let emails=localStorage.getItem("email");
let names=localStorage.getItem("name");
let passwords=localStorage.getItem("password");
if (emails != null && names != null && passwords != null){
    emails=emails.split(",")
    names=names.split(",")
    passwords=passwords.split(",")
}
//console.log(emails, names, passwords)


switch (cmd) {
    case "register":
        let email = UrlParams.get("email")
        let name =UrlParams.get("name")
        let password =UrlParams.get("password")
        let cPassword=Cipher(password)
        //console.log(email)
        //console.log(name)
        //console.log(password)
        //console.log(cPassword)
        let blad=0
        if (emails == null || names == null) {//check if no data
            emails=[email]
            names=[name]
            passwords=[cPassword]
            blad=4
        }else{
            emails.forEach(element => {
                if (element===email) {
                    blad+=1
                }
            });
            names.forEach(element => {
                if (element===name) {
                    blad+=2
                }
            });
        }
        switch (blad) {
            case 1://email taken
                //alert(`blad email`)
                ServerCmd.value=Command.EmailTaken
                ServerScreen.value=2
                //ServerUsername.value="error"
                break;
            
            case 2://name taken
                //alert(`blad nazwy`)
                ServerCmd.value=Command.NameTaken
                ServerScreen.value=2
                //ServerUsername.value="error"
                break;
            case 3://name and email taken
                //alert(`blad nazwy`)
                ServerCmd.value=Command.EmailAndNameTaken
                ServerScreen.value=2
               // ServerUsername.value="error"
                break;
            case 4://first register
                ServerCmd.value=Command.Login
                ServerScreen.value=4
                ServerUsername.value=name
                ServerPass.value=password
                break;
            default://register and log in

                emails.push(email)
                names.push(name)
                passwords.push(cPassword)

                ServerCmd.value=Command.Login
                ServerScreen.value=4
                ServerUsername.value=name
                ServerPass.value=password
                break;
        }      
        localStorage.setItem("email",emails)
        localStorage.setItem("name",names)
        localStorage.setItem("password",passwords)
        //console.log("cmd",cmd,"blad",blad)
        ServerSubmit.click()
        break;
    case "login":
        let name2 =UrlParams.get("name")
        let password2 =UrlParams.get("password")
        let cPassword2=Cipher(password2)
        let blad2=0;
        if (passwords == null || names == null){
            blad2=1
        } else{
            blad2=2
            names.forEach(element => {
                if (element===name2){
                    blad2=0
                }
            })
            emails.forEach(element => {
                if (element===name2){
                    blad2=0
                }
            })
            if (blad2==0) {
                for (let i = 0; i < names.length; i++) {
                    if (names[i]===name2 || emails[i]===name2) {
                        if (passwords[i]==cPassword2) {
                            break;
                        } else {
                            blad2=3
                            break
                        }
                    }
                    
                }
            }
        }
        switch (blad2) {
            case 1:
                ServerCmd.value=Command.NoRegisteredUsers
                ServerScreen.value=3
                break;
            case 2:
                ServerCmd.value=Command.UserDoesntExsist
                ServerScreen.value=3
                ServerUsername.value=name2
                break;
            case 3:
                ServerCmd.value=Command.WrongPassword
                ServerScreen.value=3
                break;
            default:
                ServerCmd.value=Command.Login
                ServerScreen.value=4
                ServerUsername.value=name2
                ServerPass.value=password2
                break;
        }
        ServerSubmit.click()
        //console.log("cmd",cmd,"blad2",blad2)
        break;
    default:
        alert(`zła komenda ${cmd}`)
        break;
}

function Cipher(string){//Encrypts password
    const key=3
    let cipher=""
    L=string.length
    for (let i = 0; i < L; i++) {
        let a=string.charCodeAt(i)
        a=a+key
        cipher=cipher+String.fromCharCode(a)
    }
    return cipher
}