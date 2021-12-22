const input=document.querySelector('#input')
const word=document.querySelector('.word');
const win=document.querySelector('.win');
const modalStart=document.querySelector('.modal-start')//for start
const btnStart=document.querySelector('.btn-start')//for start
const modalEnd=document.querySelector('.modal-end')//for ending
const btnEnd=document.querySelector('.btn-end')//for ending
const scoreTextEnd=document.querySelector('.score-end');
const timeEls=document.querySelector('.els');
const scoreText=document.querySelector('.point');
const level=document.querySelector('#level');
const submit=document.querySelector('#submit');
const btnSetting=document.querySelector('.btn-setting');
const nav=document.getElementById("nav")
const wordObj=[
"کارخانه",
"رستم و اسفندیار",
"خورشت قرمه سبزی",
"کیمیاگران کوهستان",
"دریاچه نمک",
"طهمورث",
"روزی روزگاری",
"اصفهان نصف جهان",
"آش کشک خالته",
"جنگل های گرمسیری",
"نگین انگشتری",
"مروارید درخشان",
"دره مرجانی",
"سنگ چخماق",
"خروش از خم چرخ چاچی",
"مزرعه",
]
let time=10;
let score=localStorage.getItem('score')!==null?localStorage.getItem('score'):Number(0)
let timeInterval
let curIndex
let difficaulty=localStorage.getItem('difficaulty')!=='null'?localStorage.getItem('difficaulty'):'medium';
level.value=localStorage.getItem('difficaulty')!=='null'?localStorage.getItem('difficaulty'):'medium';
submit.addEventListener("change",(e)=>{
   level.value=e.target.value
   localStorage.setItem('difficaulty',level.value)
})

window.addEventListener("DOMContentLoaded",()=>{
 
	modalStart.classList.remove("hide")
	modalEnd.classList.add('hide')
    addWord()
    scoreText.textContent=score
    input.focus()
})

/*hide and show modal start*/
btnStart.addEventListener("click", ()=>{
    modalStart.classList.add("hide")
    input.focus()
    timeInterval=setInterval(startTimer,1000)
})
//اhide modal end and start game again
btnEnd.addEventListener("click", ()=>{
    modalEnd.classList.add("hide")
    timeInterval=setInterval(startTimer,1000)
    input.focus()
})
//Timer
const startTimer=()=>{
	
		time--;
       timeEls.textContent=time+'s'
       if(time==0){
       	gameOver()
       	time=10
        timeEls.textContent=time+'s'
       	clearInterval(timeInterval)

       }
	
}
//change word
const getRandomWord=()=>{
	let randIndex
	while(1){
	randIndex=Math.floor(Math.random()*wordObj.length)
    if(!curIndex){
    	curIndex=randIndex
    	break
    }
    else if(curIndex!==randIndex){
    	curIndex=randIndex
    	break
    }
	}
return wordObj[randIndex]
}

//add word 
const addWord=()=>{
 	word.textContent=getRandomWord()
}
//update score
const upScore=()=>{
	score++;
	scoreText.textContent=score

}
//end of game
const gameOver=()=>{
  modalEnd.classList.remove('hide')
  scoreTextEnd.textContent=score
  input.value=""
  localStorage.setItem('score',score)
  addWord()
}
//Typing
input.addEventListener("input",(e)=>{
  
  if(e.target.value.trim()===word.textContent){
     upScore()
     addWord()
     e.target.value=""
     if(difficaulty=='easy'){
     time+=7	
     }
     else if(difficaulty=='medium'){
     	time+=5
     }
     else{
     	time+=3
     }
  }
})

//hide navbar
btnSetting.addEventListener("click", ()=>{
   nav.classList.toggle('hide')
})
