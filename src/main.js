console.clear()
import * as myUtils from "./myUtils.js"
import * as Utils from "./Utils.js"
await myUtils.displayProjName(document.getElementById("page_heading"))

const canvas = document.getElementById("page_canvas")
const canvas_manager = new myUtils.HTMLCanvasManager(canvas)

const ctx = canvas_manager.getContext()
const content_container = document.getElementById("content_container")

const { width, height } = canvas.getBoundingClientRect();
const ratio = (width / height)
console.log("canvas width : " + width + ", canvas height: " + height);

canvas.width = width
canvas.height = height

// canvas.clientHeight = canvas.height




const Network = new Utils.INodeList(255, 3, true)

;(async () => {

    for(let i = 0; i < 100000; i++){
        canvas_manager.clearCanvas()
        let my_color = myUtils.RGB.parseRGB(Network.getNodeValueArr().reverse())
    

        Network.incrementList()

        ctx.fillStyle = my_color.formatToString()

        // console.log(my_color.formatToString())
    
        let position = new myUtils.Vector2D(0.25,0.25)
        let dimension = new myUtils.Dimension2D(0.5,0.5)
    
        canvas_manager.drawRect(position, dimension)
        console.log("Closing")
        await new Promise((res) => {
            setTimeout(() => res(), 1000)
            
        })
        console.log("OPEN")
    }
})()












//width / ratio = height?

//height * ratio = width?


// console.log(canvas_manager.getCanvasDimensions().getHeight() * canvas_manager.getCanvasRatio())



// canvas_manager.drawRect(position,dimension)

// let index_x = 0
// let index_y = 0

// let max_x = canvas.width
// let max_y = canvas.height
// let interval = setInterval(() => {
//     canvas_manager.getContext().fillStyle = "red"
//     canvas_manager.getContext().fillRect(index_x,0,1,4)
//     canvas_manager.getContext().fillStyle = "green"
//     canvas_manager.getContext().fillRect(1,index_y, 4,1)

//     if(index_x != max_x){
//         index_x++
//     }else{
//         // canvas_manager.getContext().fillStyle = "red"
//     }

//     if(index_y != max_y){
//         index_y++
//     }

//     console.log("x : " + index_x + " y: " + index_y)


//     if(index_x == max_x && index_y == max_y){ 
//         clearInterval(interval)
//     }

// }, 10)
