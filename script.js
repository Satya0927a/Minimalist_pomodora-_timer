let txtinpform = document.getElementById("submitform")
let txtinp = document.getElementById("textinput")
let tasks = document.querySelector(".tasks")


//getting history using localstorage
if(localStorage.length != 0){
    for(let i = 0; i<localStorage.length; i++){
        let li_hist = document.createElement("li")
        let key = localStorage.key(i)
        li_hist.innerHTML = `${localStorage.getItem(key)}`
        li_hist.className = `task task${i+1}`;
        tasks.append(li_hist);
        console.log(`${key} ${localStorage.getItem(key)}`)
        
        
    }
}
//adding element
txtinpform.addEventListener("submit", (e)=>{
    e.preventDefault()
    let li = document.createElement("li")
    let task_no = document.querySelectorAll(".task").length
    li.innerHTML = `${txtinp.value}`
    li.className = `task task${task_no+1} newtask `
    localStorage.setItem(`task${task_no+1}`,`${txtinp.value}`)
    tasks.append(li);
    // console.log("entered")
    txtinp.value = "";

    //smooth animation
    requestAnimationFrame(()=>{
        li.classList.remove("newtask");
    })
    
})
//deleting tasks
let deltask = document.getElementById("deltask")
deltask.addEventListener("click", ()=>{
    //deleting li items using dom
    let taskitems = document.querySelectorAll(".tasks li");
    // localStorage.clear()
    taskitems.forEach((e)=>{
        e.remove()
    })
    //deleting data from localstorage
    localStorage.clear()
})

tasks.addEventListener("click",(e)=>{
    if(e.target.tagName.toLowerCase() === "li"){
        e.target.className = "linethrough"
        // console.log(e.target.classList)
        
    }
})


//timer
let timerstartbtn = document.getElementById("timerstartbtn");
let timerbreakbtn = document.getElementById("timerbreakbtn");
let sec = document.getElementById("sec");
let min = document.getElementById("min");


timerstartbtn.addEventListener("click", ()=>{
    let cycle = 1;
    timerrun(cycle)

})

//break time set
timerbreakbtn.addEventListener("click", ()=>{
   breaktimeset()
})
// console.log(timervalue)
function timerrun(cycle){
    let sec_value = parseInt(sec.textContent)
    let min_value = parseInt(min.textContent)
    if(sec_value < 60 &&  min_value < 60){
        let timer = setInterval(() => {
            if(sec_value == 0 && min_value == 0){
                if(cycle == 1){
                    alarm()
                    breaktimeset()
                    clearInterval(timer);
                    cycle--;
                    timerrun()
                    return;
                }
                else{
                    alarm()
                    clearInterval(timer);
                    return;
                }
            }
            else if(sec_value == 0){
                min_value--;
                // console.log(min_value)
                if(min_value>=10){
                    min.textContent = `${min_value}`
                }
                else{
                    min.textContent = `0${min_value}`
                }
                sec_value = 60;
            }
            sec_value--;
            if(sec_value>=10){
                sec.textContent = `${sec_value}`
            }
            else{
                sec.textContent = `0${sec_value}`
            }
            
        }, 1000);
    }
    else{
        alert("enter correct timer values")
    }
}

function breaktimeset(){
    min.textContent = "05";
    sec.textContent = "00"
}

function alarm(){
    let audio = new Audio("resources/output.mp3")
    audio.play()
}
