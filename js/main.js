let elForm = document.querySelector(".form")
let elList = document.querySelector(".list")

let modalWrapper = document.querySelector(".wrapper")
let elModal = document.querySelector(".modal")

let allCount = document.querySelector(".all-count")
let complatedCount = document.querySelector(".complated-count")
let unComplatedount = document.querySelector(".uncomplated-count")

let allBtn = document.querySelector(".all-btn")
let complatedBtn = document.querySelector(".complated-btn")
let unComplatedBtn = document.querySelector(".uncomplated-btn")

let elChooseInput = document.querySelector(".choose-input")
let elChoosenImg = document.querySelector(".choose-img")


let todos = JSON.parse(window.localStorage.getItem("todos")) || []
let choosen = null


elForm.addEventListener("submit", function(e){
    e.preventDefault()
    const data = {
        id:todos.length + 1,
        value:e.target[0].value,
        imgUrl:elChoosenImg,
        isComplated:false
    }
    todos.push(data)
    window.localStorage.setItem("todos", JSON.stringify(todos))
    elChoosenImg.src = "  "
    renderTodos(todos, elList)
    e.target.reset()
})

function renderTodos(arr, list){
    list.innerHtml = ""
    arr.foreach((item, index) => {
        let elItem = document.querySelector("li")
        elItem.className = `flex items-center relative justify-between ${item.isComplated ? "before:w-[60%] before:h-[2px] before:bg-black before:aboslute before:top-0 before-bottom-0 before:my-auto opacity-50" : ""}`
        elItem.innerHTML = `
        <div>
           <span class="font-bold text-[20px] text-slate-500">${index+1}</span>
           <span class="font-bold text-[22px]">${item.value}</span>
        </div>
        <div class="flex item-center gap-5">
            <img src=${item.imgUrl} width="100" height="70"/>
            <input onclick={changeCheckbox(${item.id})} type="checkbox" class="form-checkbox">
            <button onclick={updateTodos(${item.id})} class="todo-update bg-green-600 hover:opacity-50 duration-300 text-white font-semibold p-3 rounded-lg">Update</button>
            <button onclick={todoDeleteBtnClick(${item.id})} class="todo-delete bg-red-600 hover:opacity-50 duration-300 text-white font-semibold p-3 rounded-lg">Delete</button>
        </div>
        `

        list.appendChild(elItem)
    })
    allCount.textContent = todos.length
    complatedCount.textContent = todos.filter(item => item.isComplated == true).length
    unComplatedCount.textContent = todos.filter(item => item.isComplated == false).length
}
 renderTodos(todos, elList)

elChooseInput.addEventListener("change", function(e){
    elChoosenImg.setAttribute("src", URL.createObjectURL(e.target.files[0]))
    choosen = URL.createObjectURL(e.target.files[0])
})

function todoDeleteBtnsWrapperClick(id) {
    const findIndex = todos.findIndex(item => item.id == id)
    todos.splice(findIndex, 1)
    renderTodos(todos, elList)
    window.localStorage.setItem("todos", JSON.stringify(todos))
}


function changeCheckbox(id){
    const findedObj = todos.find(item => item.id == id)
    findedObj.isComplated = !findedObj.isComplated
    renderTodos(todos, elList)
    window.localStorage.setItem("todos", JSON.stringify(todos))

}


function updateTodo(id){
    modalWrapper.classList.add("!top-0")
    elModal.classList.add("!scale-100")
    const updateObj = todos.find(item => item.id == id)
    elModal.innerHTML = `
      <div class="p-5 flex itemscenter">
       <input value="${updateObj.value}" class="update-value py-3 w-[75%] pl-5 border-[1.5px] border-slate-500 rounded-lg outline-none focus:shadow-lg focus:shadow-blue-500" placeholer="Update todo" type="text" name="update-todo">
       <button onclick={updateTodoBtnClick(${id})} class="bg-blue-400 w-[25%] p-2.5 font-semibold text-white rounded-lg text-[20px]">Update</button>
      </div>
    `
}


function updateTodoBtnClick(id){
    const updateObj = todos.find(item => item.id == id)
    let newValue = document.querySelector(".update-value").value
    updateObj.value = newValue
    modalWrapper.classList.remove("!top-0")
    elModal.classList.remove("!scale-100")
    renderTodos(todos,elList)
    window.localStorage.setItem("todos", JSON.stringify(todos))
}

modalWrapper.addEventListener("click", function(e){
    if(e.target.id == "wrapper"){
        modalWrapper.classList.remove("!top-0")
        elModal.classList.remove("!scale-100")
    }
})

allBtn.addEventListener("click", function(){
    renderTodos(todos, elList)
})

complatedBtn.addEventListener("click", function(){
    const complatedList = todos.filter(item => item.isComplated == true)
    renderTodos(complatedList, elList)

})

unComplatedBtn.addEventListener("click", function(){
    const complatedList = todos.filter(item => item.isComplated == false)
    renderTodos(unComplatedList, elList)

})