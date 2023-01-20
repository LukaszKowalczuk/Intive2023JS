///////////////////////////////////////////////////
//ALL
//Screens
const ScreenUnlogged=document.querySelector("#screenUnlogged")
const ScreenRegister=document.querySelector("#screenRegister")
const ScreenLogIn=document.querySelector("#screenLogIn")
const ScreenLogged=document.querySelector("#screenLogged")
const ScreenWrapper=document.querySelector("#screenWrapper")
const Screen = {
    Unlogged: 1,
    Register: 2,
    LogIn: 3,
    Logged: 4
}
let cureentScreen=1
//Navigation Bar
const NavigationBar=document.querySelector('#naviBar')
const NavigationBarButtons=[
    "<button >Zaloguj</button>",
    "<button >Zarejestruj</button>",
    "<button >Wyloguj</button>"
]
const NavigationBarNames = {
    Zaloguj: 0,
    Zarejestruj: 1,
    Wyloguj: 2
}
let NavigationBarText=""
const NavigationBarSetting=[
    [1,1,0],
    [1,0,0],
    [0,1,0],
    [0,0,1]
]
//Variables
const Icons=["❌","📥","🛒","💸","📤"]
let mobileMode
let lastMobileMode
const root=document.querySelector(':root')
let windowH=window.innerHeightS
addEventListener("resize", onResize)
const Targeter=document.querySelector("#targeter")
//const LogIn=c :nth-child(1)')
//const Register=docu)ment.querySelector('#naviBar :nth-child(2)')
//const LogOut=document.querySelector('#naviBar :nth-child(3)')
//LogOut.forEach(element => element.addEventListener("click",() => { changeScreen(1) } ));
//Register.forEach(element => element.addEventListener("click",() => { changeScreen(2) } ));
//LogIn.forEach(element => element.addEventListener("click",() => { changeScreen(3) } ));
//LogOut.addEventListener("click",() => { changeScreen(1) } );
//Register.addEventListener("click",() => { changeScreen(2) } );
//LogIn.addEventListener("click",() => { changeScreen(3) } );


///////////////////////////////////////////////////
//S1

///////////////////////////////////////////////////
//S2
const RegisterForm=document.querySelector("#RegisterForm")
// const S2_Labels=document.querySelectorAll('#S2_wrapper label')
// const S2_Inputs=document.querySelectorAll('#S2_wrapper input')
const S2_Ps=document.querySelectorAll('#S2_wrapper p')

const S2_Name=document.querySelector("#S2_name")
const S2_Email=document.querySelector("#S2_email")
const S2_Email2=document.querySelector("#S2_email2")
const S2_Submit=document.querySelector("#S2_submit")
const S2_Password=document.querySelector("#S2_password")
const S2_PassProgresbar=document.querySelector("#S2_passProgresbar")

S2_Submit.addEventListener("click",()=>{
    S2_validateEmail()
    S2_validateUsrname()
})
RegisterForm.addEventListener("keyup",S2updateProgressBar)
const S2_Errors = {
    EmailTaken: 1,
    NameTaken: 2,

}
///////////////////////////////////////////////////
//S3
const S3_errorMsg=document.querySelector("#S3_errorMsg")
const S3_name=document.querySelector("#S3_name")
const S3_pass=document.querySelector("#S3_pass")
const S3_submit=document.querySelector("#S3_submit")

const S3_Errors = {
    EmptyDataBase: 1,
    NoUser: 2,
    WrongPassword: 3,

}
///////////////////////////////////////////////////
//S4
const S4_userNameLabel=document.querySelector("#S4_userNameLabel")
const S4_table=document.querySelector("#S4_table")
const S4_Canvas=document.querySelector("#S4_Canvas")
const S4_Canvas2=document.querySelector("#S4_Canvas2")
const S4_popUpWindow=document.querySelector("#S4_popUpWindow")
const S4_popUpWindowText=document.querySelectorAll("#S4_popUpWindow p")
const S4_ClosePopUpBtn=document.querySelector("#S4_closePopUp")
const S4_popUp=document.querySelector("#S4_popUp")
S4_ClosePopUpBtn.addEventListener("click",S4_closePopUp)
S4_table.addEventListener("keydown",S4_clickTableRow)
let S4_popUpOn=false
///////////////////////////////////////////////////
//Functions
function onResize(){
    windowH=window.innerHeight
    windowH=String(windowH)+"px"
    ScreenWrapper.style.minHeight=windowH
}
function changeScreen(N){
    cleanup()
    ScreenUnlogged.style.display="none"
    ScreenRegister.style.display="none"
    ScreenLogIn.style.display="none"
    ScreenLogged.style.display="none"
    cureentScreen=N
    switch (N) {
        case Screen.Unlogged:
            ScreenUnlogged.style.display="inline"
            break;
        case Screen.Register:
            ScreenRegister.style.display="inline"
            break;
        case Screen.LogIn:
            ScreenLogIn.style.display="inline"
            break;
        case Screen.Logged:
            ScreenLogged.style.display="inline"
            break;
        default:
            console.log(`error in changeScreen function invalid value ${N}`)
    }
    changeNaviBar(N)
}

function changeNaviBar(N){
    NavigationBarText=""
    let setting=NavigationBarSetting[N-1]
    let linksId=[]
    for (let i = 0; i < setting.length; i++) {
        if (setting[i]==1) {
            NavigationBarText=NavigationBarText+NavigationBarButtons[i]
            linksId.push(i)
        }
    }
    NavigationBar.innerHTML=NavigationBarText
    let grabedButtton
    for (let i = 0; i < linksId.length; i++) {
        grabedButtton=document.querySelector(`#naviBar :nth-child(${i+1})`)
        switch (linksId[i]) {
            case NavigationBarNames.Zaloguj:
                grabedButtton.addEventListener("click",() => { changeScreen(Screen.LogIn) })
                break;
            case NavigationBarNames.Zarejestruj:
                grabedButtton.addEventListener("click",() => { changeScreen(Screen.Register) })
                break;
            case NavigationBarNames.Wyloguj:
                grabedButtton.addEventListener("click",() => { 
                    changeScreen(Screen.Unlogged) 
                    localStorage.removeItem("loggedUser")
                    localStorage.removeItem("loggedPass")
                })
                break;
            default:
                console.log(`error in changeNaviBar function invalid value ${linksId[i]}`)
                break;
        }
    }

}

function cleanup(){
    S2_Ps.forEach(P => P.innerHTML="")
    S3_errorMsg.innerHTML=""
    S4_userNameLabel.innerHTML=""
}


function S2updateProgressBar(){
    let pass=S2_Password.value
    let L=pass.length
    let isl=0
    let isL=0
    let isNo=0
    let isS=0
    for (let i = 0; i < L; i++) {
        let a=pass.charCodeAt(i)
        if (a>=48 && a<=57) {
            isNo=10
        }else if(a>=65 && a<=90) {
            isL=26
        }else if(a>=97 && a<=122) {
            isl=26
        }else{
            isS=15
        }
    }
    let base=isl+isL+isNo+isS
    let strength=Math.pow(base,L)
    strength=Math.log10(strength)
    S2_PassProgresbar.value=String(strength)

    let r = document.querySelector(':root');
    if (strength<8){
        r.style.setProperty('--progressBarColor', 'red')
    }else if(strength<16){
        r.style.setProperty('--progressBarColor', 'yellow')
    }else{
        r.style.setProperty('--progressBarColor', 'lightgreen')
    }
}
function S2_writeErrors(N){//write errrors in p tags
    N.forEach(n => {
        switch (n) {
            case S2_Errors.EmailTaken:
                S2_Ps[0].innerHTML="Email zajęty"
                break;
            case S2_Errors.NameTaken:
                S2_Ps[2].innerHTML="Nazwa Użytkownika zajęta"
                break;
        
            default:
                break;
        }
    })

}
function S2_validateEmail(){//checks if emails in register form are same
    if(S2_Email.value != S2_Email2.value) {
		S2_Email2.setCustomValidity("Emaile nie są zgodne");
	} else {
		S2_Email2.setCustomValidity("");
	}
}
function S2_validateUsrname(){
    let blad=S2_checkUsername(S2_Name.value)
    switch (blad) {
        case 1:
            S2_Name.setCustomValidity("Nazwa użytkownika może składać się tylko z: małych i dużych liter, cyfr i znaków - _ [ ] \\ /")
            break;
        case 2:
            S2_Name.setCustomValidity("Nazwa użytkownika musi zawierać przynajmiej 5liter i jedną cyfrę")
            break;
        default:
            S2_Name.setCustomValidity("");
            break;
    }
}
function S2_checkUsername(string){
    // "0" 48
    // "9" 57
    // "A" 65
    // "Z" 90
    // "a" 97
    // "z" 122

    // "-" 45
    // "_" 95
    // "[" 91
    // "]" 93
    // "\" 92
    // "/" 47
    const ReqLetter=5
    const ReqNo=1
    let blad=0
    L=string.length
    let countLetter=0
    let countNo=0
    for (let i = 0; i < L; i++) {
        let a=string.charCodeAt(i)
        if ((a>=47 && a<=57)||(a>=65 && a<=93)||(a>=97 && a<=122)||a==45||a==95) {
            if ((a>=65 && a<=90)||(a>=97 && a<=122)) {
                countLetter=countLetter+1
            }
            if (a>=48 && a<=57) {
                countNo=countNo+1
            }
        }else{
            blad=1
            break
        }
        
    }
    if ((countLetter<ReqLetter||countNo<ReqNo)&&blad==0){
        blad=2
    }
    return blad
}
function S2_emailTaken(){//tell user that email is taken
	S2_Email.setCustomValidity("Email zajęty");
}
function S2_nameTaken(){//tell user that username is taken
	S2_Name.setCustomValidity("Nazwa zajęta");
}

function S3_writeErrors(N){
    N.forEach(n => {
        switch (n) {
            case S3_Errors.NoUser:
                S3_errorMsg.innerHTML=`Nie ma użytkownika ${ServerUsername} zarejestruj się`
                break;
            case S3_Errors.WrongPassword:
                S3_errorMsg.innerHTML="Złe hasło"
                break;
            case S3_Errors.EmptyDataBase:
                S3_errorMsg.innerHTML="Baza danych jest pusta zarejestruj się"
                break;       
            default:
                break;
        }
    })
}

function S4_setName(name) {
    S4_userNameLabel.innerHTML=`Witaj użytkowniku ${name}`
}

function S4_getData(){//gets user data
    let adress="https://api.npoint.io/38edf0c5f3eb9ac768bd"
    getTransactions(adress)
    async function getTransactions(adress){
        let file=await fetch(adress)
        let obj=await file.json()
        let data=await obj.transactions
        let data2=await obj.transacationTypes
        S4_draw(data,data2)
    }
}
async function S4_draw(data,data2){//uses data to draw charts and tables
    let L=data.length
    let amount=[]
    let balance=[]
    let date=[]
    let description=[]
    let type=[]
    data.forEach(d =>{
        date.push(d.date)
    })
    let sdata=data
    for (let i = 0; i < L-1; i++) {//sorting
        for (let j = i; j < L; j++) {
            let d1=date[i].split("-")
            let d2=date[j].split("-")
            let zamien=false
            if (d1[0]<d2[0]) {
                zamien=true
            }else if (d1[0]==d2[0]) {
                if (d1[1]<d2[1]) {
                    zamien=true
                } else if(d1[1]==d2[1]) {
                    if (d1[2]<d2[2]) {
                        zamien=true
                    }
                }
            }
            if (zamien) {
                let sdataPlaceholder=sdata[i];
                let datePlaceholder=date[i];
                sdata[i]=sdata[j]
                sdata[j]=sdataPlaceholder
                date[i]=date[j]
                date[j]=datePlaceholder
            }
        }
    }
    date=[]
    sdata.forEach(d =>{//get data from struct
        amount.push(d.amount)
        balance.push(d.balance)
        date.push(d.date)
        description.push(d.description)
        type.push(d.type)
    })

    S4_drawPieChart(L,type,data2)
    S4_drawBarChart(L,date,balance)
    S4_fillTable(L,amount,balance,date,description,type,data2)
}
function S4_drawPieChart(L,type,data2){
    let count=[0,0,0,0]
    let percent=[0,0,0,0]
    for (let i = 0; i < L; i++) {//counts transaction types
        count[type[i]-1]+=1        
    }
    let all=0
    for (let i = 0; i < count.length; i++) {
        all = all+count[i]       
    }
    for (let i = 0; i < count.length; i++) {
        percent[i]=100*count[i]/all     
    }
    let dataPie = {
        labels: [
          data2[1],
          data2[2],
          data2[3],
          data2[4]
        ],
        datasets: [{
          label: 'Część',
          data: [],
          backgroundColor: [
            'rgb(175,238,238)',
            'rgb(255,255,153)',
            'rgb(124,252,0)',
            'rgb(220,20,60)'
          ],
          hoverOffset: 100
        }]
    }
    dataPie.datasets[0].data =percent
    new Chart(S4_Canvas2, {
        type: 'pie',
        data: dataPie
    })
}
function S4_drawBarChart(L,date,balance){
    //console.log("L","date","balance",L,date,balance)
    list=[date[0]]
    Id=[0]
    for (let i = 1; i< L; i++) {//makes list of dates and creates indexing key
        let nalezy=false
        for (let j = 0; j < list.length; j++) {
            if (date[i]===list[j]){
                Id[i]=j
                nalezy=true
            }
        }
        if (nalezy==false){
            list.push(date[i])
            Id[i]=list.length-1
        }
        
    }
    let dataBar = {
        labels: ["1 styczeń 2023",
        "2 styczeń 2023",
        "3 styczeń 2023"],
      datasets: [
        {
            label: 'saldo',
            data: [250,140,220],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: ['rgba(75, 192, 192, 0.2)','rgba(175, 192, 92, 0.2)','rgba(175, 92, 192, 0.2)'],
            borderWidth: 2,
        }
      ]
    }
    let Red='rgba(200, 50, 50, 1)';
    let RedBorder='rgba(255, 150, 150, 0.5)';
    let Green='rgba(0, 150, 80, 1)';
    let GreenBorder='rgba(0, 255, 150, 0.5)';
    
    let bal=[]
    let backCl=[]
    let bordCl=[]
    for (let i = 0; i < list.length; i++) {

        bal.push(0)
        backCl.push(Red)
        bordCl.push(RedBorder)
    }
    for (let i = L; i >= 0; i--) {//adds up income and expenses for each date
        bal[Id[i]]=balance[i]
    }
    //bal[0]=-5000
    for (let i = 0; i < list.length; i++){
        if (bal[i]>0){
            backCl[i]=Green
            bordCl[i]=GreenBorder
        }
    }
    dataBar.labels=list.reverse()
    dataBar.datasets[0].data=bal.reverse()
    dataBar.datasets[0].borderColor=bordCl.reverse()
    dataBar.datasets[0].backgroundColor=backCl.reverse()
    nigger=dataBar
    new Chart(S4_Canvas, {
             type: 'bar',
             data: dataBar,
             options: {
                scales: {
                  y: {
                    grid: {
                      //color: 'black'
                      color: function(context) {
                            if (context.tick.value == 0) {
                                return 'black'
                            } 
                        }
                        
                      
                    }
                  }
                }
              }
    })
}
function S4_fillTable(L,amount,balance,date,description,type,data2){
    for (let i = 0; i < L; i++) {
        let row=S4_table.insertRow(i+1)
        let cell1 = row.insertCell(0)
        let cell2 = row.insertCell(1)
        let cell3 = row.insertCell(2)
        let cell4 = row.insertCell(3)
        let cell5 = row.insertCell(4)
        cell1.innerHTML=date[i]
        cell1.className="T_date"
        cell2.innerHTML=Icons[type[i]]
        cell2.className="T_type"
        cell3.innerHTML=description[i]+'<br>'+data2[type[i]]
        cell3.className="T_description"
        cell4.innerHTML=amount[i]
        cell4.className="T_amount"
        cell5.innerHTML=balance[i]
        cell5.className="T_balance"
        let id="tablerow"+i
        row.setAttribute('id', id)
        id="#"+id
        row.addEventListener("click",()=>{S4_popUpWindowShow(date[i], Icons[type[i]], description[i], data2[type[i]], amount[i], balance[i],id)})
        row.setAttribute('tabindex', i+1)
        row.setAttribute('role',"button")
    }
}
function S4_popUpWindowShow(date, icon, desc, type, amount, balance,id){
    //console.log("clicked table",date, icon, desc, type, amount, balance)
    let text=[
        "data: "+date,
        "typ: "+icon+" "+type,
        "opis: "+desc,
        "wartosc: "+amount,
        "saldo: "+balance
    ]
    let L=S4_popUpWindowText.length
    for (let i = 0; i < L; i++) {
        S4_popUpWindowText[i].innerHTML=text[i]       
    }
    if (mobileMode==true){
        //console.log(id)
        S4_popUp.style.visibility="visible"
        Targeter.href=id
        Targeter.click()
        S4_popUpOn=true
    }
}
function S4_closePopUp(){
    Targeter.href="#targeter"
    Targeter.click()
    S4_popUp.style.visibility="hidden"
    S4_popUpOn=false
}
function S4_clickTableRow(event){
    if (mobileMode==1 && event.target.nodeName==="TR" && event.key==="Enter" ){
        event.target.click()
    }
}
///////////////////////////////////////////////////
//On start
//checks if user uses mobile
setInterval(()=>{
    mobileMode=getComputedStyle(root)
    mobileMode=mobileMode.getPropertyValue('--mobile')
    //mobileMode=Boolean(mobileMode)
    if (mobileMode!=lastMobileMode && S4_popUpOn){//closes pop up on exiting mobile mode
        if (mobileMode==false) {
            S4_closePopUp()
        }
    }
    //console.log(cureentScreen)
    if (cureentScreen!=Screen.Logged && S4_popUpOn){//closes popup on logout
        S4_closePopUp()
    }
    lastMobileMode=mobileMode
},1000)
onResize()//fix background

const QueryString=window.location.search//gets response from server
const UrlParams=new URLSearchParams(QueryString)
const ServerCmd=Number(UrlParams.get("ServerCmd"))
const ServerScreen=Number(UrlParams.get("ServerScreen"))
const ServerUsername=UrlParams.get("ServerUsername")
const ServerPass=UrlParams.get("ServerPass")


switch (ServerCmd) {//loads correct screen
    case 20:
        changeScreen(ServerScreen)
        S2_writeErrors([S2_Errors.EmailTaken])
        //S2_emailTaken()
        //S2_Submit.click()
        break;
    case 21:
        changeScreen(ServerScreen)
        S2_writeErrors([S2_Errors.NameTaken])
        //S2_nameTaken()
        //S2_Submit.click()
        break;
    case 22:
        changeScreen(ServerScreen)
        S2_writeErrors([S2_Errors.EmailTaken,S2_Errors.NameTaken])
        //S2_emailTaken()
        //S2_nameTaken()
        //S2_Submit.click()
        break;
    case 30:
        changeScreen(ServerScreen)
        S3_writeErrors([S3_Errors.EmptyDataBase])
        break
    case 31:
        changeScreen(ServerScreen)
        S3_writeErrors([S3_Errors.WrongPassword])
        localStorage.removeItem("loggedUser")
        localStorage.removeItem("loggedPass")
        break
    case 32:
        changeScreen(ServerScreen)
        S3_writeErrors([S3_Errors.NoUser])
        break
    case 40:
        changeScreen(ServerScreen)
        S4_setName(ServerUsername)
        localStorage.setItem("loggedUser",ServerUsername)
        localStorage.setItem("loggedPass",ServerPass)
        S4_getData()
        break;
    default:
        if (localStorage.getItem("loggedUser")==null){
            changeScreen(Screen.Unlogged)
            //console.log("niezalogowany")
        }else{//try to log in
            //console.log("zalogowany")
            changeScreen(Screen.LogIn)
            S3_name.value=localStorage.getItem("loggedUser")
            S3_pass.value=localStorage.getItem("loggedPass")
            S3_submit.click()
        }
    
        break;
}


