let txtinp = document.getElementById("textinput")
let tasks = document.querySelector(".tasks")
txtinp.addEventListener("keypress", (e)=>{
    if(e.key == "Enter"){
        let li = document.createElement("li")
        let task_no = document.querySelectorAll(".task").length
        li.innerHTML = `<input type="checkbox" name="" id="task${task_no+1}a">
                    <label class="" for="task${task_no+1}a">${txtinp.value}</label>`
        li.className = `task task${task_no+1} newtask`
        tasks.append(li);
        txtinp.value = "";

        //smooth animation
        requestAnimationFrame(()=>{
            li.classList.remove("newtask");
        })
    }
})
let task_label = document.querySelectorAll(".task label");
task_label.addEventListener("click", ()=>{
    console.log("yes")
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
