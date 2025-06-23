
import * as Utils from "./Utils.js"

async function getHProjJSON(){
    return ((await fetch("../HProj.json")).json())
}

/**
 * returns the inneHTML of an element to the projects name, according to the HProj.json. if the project_name is undefined it will default to project_name
 * @param {Element} element 
 * @returns {string}
 */
export async function displayProjName(element){
    const HProj = (await getHProjJSON())
    element.innerHTML = (!HProj["project_name"]) ? "project_name" : HProj["project_name"]
}

export function sayHello(name){
    console.log("hello, " + name + "!")
}


//define your utilities here

/**
 * returns the greatest common factor among an array of numbers.
 * @param {number[]} list1
 * @param {...number} list2 
 * 
 * @returns {number}
 */
export function getGCF(list1 , ...list2){
    if(!Array.isArray(list1)) throw new Error("List must be an array")
    list1 = list1.filter(v => Number.isInteger(v))
    list2 = list2.filter(v => Number.isInteger(v))
    let full_list = Utils.joinArrs(list1, list2).sort((a,b) => a - b)

    for(let i = full_list[0]; i > 0; i--){
        if(full_list.every(v => Number.isInteger(v / i))) return i
    }
}

/**
 * Applies the greatest common factor among an array of numbers. divides the numbers by their gcf and returns the array
 * @param {number[]} list1
 * @param {...number} list2 
 * 
 * @returns {number[]}
 */
export function applyGCF(list1 , ...list2){
if(!Array.isArray(list1)) throw new Error("List must be an array")
    list1 = list1.filter(v => Number.isInteger(v))
    list2 = list2.filter(v => Number.isInteger(v))
    return Utils.joinArrs(list1, list2).map((v, i, a) => (v / getGCF(a)))
}

/**
 * returns the decimal part of a number
 * @param {number} number
 * @returns {number}
 */
export function getDecimal(number){
    if(typeof number != 'number') throw new Error("number must be a number")

    number = ((Number.isInteger(number)) ? number.toFixed(1) : number).toString()
    return parseInt(number.slice(number.lastIndexOf(".") + 1))

}

/**
 * Converts a value to a NDC (Normal Device Coordinate) baxed on the minimum and max value
 * @param {number} value 
 * @param {number} max 
 * @param {number} min 
 * 
 * @returns {number}
 */
export function valueToNDC(value, max, min){
    if(typeof value != "number") throw new Error("value must be a number")
    if(typeof max != "number") throw new Error("max must be a number")
    if(typeof min != "number") throw new Error("min must be a number")
    return ((value)  / (max - min))
}

/**
 * Converts  a NDC (Normal Device Coordinate) into a normal number based on minimum and max.
 * @param {number} value 
 * @param {number} max 
 * @param {number} min 
 * 
 * @returns {number}
 */
export function NDCToValue(value, max, min){
    if(typeof value != "number") throw new Error("value must be a number")
    if(typeof max != "number") throw new Error("max must be a number")
    if(typeof min != "number") throw new Error("min must be a number")
    
    return (value * (max - min))
}

/**
 * converts a number into a percentage of another number
 * @param {number} value 
 * @param {number} total
 */
export function valueToPercent(value, total){
    if(typeof value != "number") throw new Error("value must be an number.")
    if(typeof total != "number") throw new Error("total must be an number.")

    return (value / total)
}

/**
 * converts a percentage of another number into a value
 * @param {number} percent
 * @param {number} total 
 */
export function percentToValue(percent, total){
    if(typeof value != "number") throw new Error("value must be an number.")
    if(typeof total != "number") throw new Error("total must be an number.")
    
    return (percent * total)
}

// export class Vec

export class Vector2DWrapperClass{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x,y){
        this.#vector_interface = new Vector2DInterface(x,y)
    }

    #vector_interface = new Vector2DInterface()
    /**
     * 
     * @returns {Vector2DInterface}
     */
    getInterface(){
        return this.#vector_interface
    }

    toString(){
        return this.getInterface().toString()
    }
}

export class Dimension2D extends Vector2DWrapperClass{

    /**
     * 
     * @param {number} width 
     * @param {number} height 
     */
    constructor(width, height){
        super(width,height)
    }
/**
     * 
     * @returns {number}
     */
    getWidth(){
        return this.getInterface().getX()
    }

    /**
     * 
     * @returns {number}
     */
    getHeight(){
        return this.getInterface().getY()
    }

    /**
     * 
     * @param {number} v 
     */
    setWidth(v){
        this.getInterface().setX(v)
    }
    /**
     * 
     * @param {number} v 
     */
    setHeight(v){
        this.getInterface().setY(v)
    }

}

export class Vector2D extends Vector2DWrapperClass{
    /**
     * 
     * @returns {number}
     */
    getX(){
        return this.getInterface().getX()
    }

    /**
     * 
     * @returns {number}
     */
    getY(){
        return this.getInterface().getY()
    }

    /**
     * 
     * @param {number} v 
     */
    setX(v){
        this.getInterface().setX(v)
    }
    /**
     * 
     * @param {number} v 
     */
    setY(v){
        this.getInterface().setY(v)
    }
}

export class Vector2DInterface{
    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x ,y){
        if(typeof x != "number" && x != undefined) throw new Error("x must be a number")
        if(typeof y != "number" && y != undefined) throw new Error("y must be a number")

        this.#x_value = (x == undefined) ? 0 : x
        this.#y_value = (y == undefined) ? 0 : y
    }

    #x_value
    #y_value

    /**
     * 
     * @returns {number}
     */
    getX(){
        return this.#x_value
    }
    
    /**
     * retuns the yValue of this vector
     * @returns {number}
     */
    getY(){
        return this.#y_value
    }

    /**
     * 
     * @param {number} x 
     */
    setX(x){
        if(typeof x != "number") throw new Error("x must be a number")
        this.#x_value = x
    }

    /**
     * 
     * @param {number} y 
     */
    setY(y){
        if(typeof y != "number") throw new Error("y must be a number")
        this.#y_value = y
    }

    /**
     * 
     * @returns {[]}
     */
    toArr(){
        return [this.getX(),this.getY()]
    }

    
    /**
     * stringifys the content in [(x) x (y)] format
     * 996
     * @returns {string}
     */
    toString(){
        return `${this.getX()} x ${this.getY()}`
    }
}


export class RGB{
    /**
     * Creates an RGB object to represent the specific color values of pixels on a screen. if a value is less than zero or undefined it will be defaulted to 0. If a value is greater than 255 it will scale back down to 255.
     * @param {number | undefined} red 
     * @param {number | undefined} green 
     * @param {number | undefined} blue 
     */
    constructor(red, green, blue){
        if(typeof red != "number" && red != undefined) throw new Error("Red must be an number!")

        if(typeof green != "number" && green != undefined) throw new Error("Green must be an number!")

        if(typeof blue != "number" && blue != undefined) throw new Error("Blue must be an number!")

        this.#colors = [(red == undefined || red < 0) ? 0 : (red > 255) ? 255 : red ,(green == undefined || green < 0) ? 0 : (green > 255) ? 255 : green , (blue == undefined || blue < 0) ? 0 : (blue > 255) ? 255 : blue]

    }

    #colors = []

    /**
     * returns the rgb value of the red color
     * @returns {number}
     */
    getRed(){
        return this.#colors[0]
    }

     /**
     * returns the rgb value of the green color
     * @returns {number}
     */
    getGreen(){
        return this.#colors[1]
    }

    /**
     * returns the rgb value of the blue color
     * @returns {number}
     */
    getBlue(){
        return this.#colors[2]
    }

    /**
     * sets the rgb value of the red color
     * @param {number} val
     */
    setRed(val){
        this.#colors[0] = ((val == undefined || val < 0) ? 0 : (val > 255) ? 255 : val)
    }

    /**
     * sets the rgb value of the green color
     * @param {number} val
     */
    setGreen(val){
        this.#colors[1] = ((val == undefined || val < 0) ? 0 : (val > 255) ? 255 : val)
    }

    /**
     * sets the rgb value of the blue color
     * @param {number} val
     */
    setBlue(val){
        this.#colors[2] = ((val == undefined || val < 0) ? 0 : (val > 255) ? 255 : val)
    }

    /**
     * returns a representaion of the rgb in object notation
     * @returns {{red : number, green : number, blue : number}}
     */
    getColorOBJ(){
        return {
            red : this.getRed(),
            green : this.getGreen(),
            blue : this.getBlue()
        }
    }

    /**
     * returns an array containing the RGB values
     * @returns {number[3]}
     */
    getColorArr(){
        return this.#colors
    }

    /**
     * formats the rbg into proper notation
     * @returns {string}
     */
    formatToString(){
        return `rgb(${this.getRed()},${this.getGreen()},${this.getBlue()})`
    }

    /**
     * parses an object or array into a RGB instance. does not check for undefined values. if any rgb value is undefined it will default to zero.
     * 
     * @param {number[3] | { red : number, green : number, blue : number}} object 
     * @returns 
     */
   static parseRGB(object){
        if(Array.isArray(object)){
            return new RGB(object[0], object[1], object[2])
        }else if(typeof object == "object"){
            return new RGB(object["red"], object["green"], object["blue"])
        }

        throw new Error("RGB must be an array or object")
        
    }

}



export class Rectangle{
    constructor(position, dimension, color){
        if(!(position instanceof Vector2D)) throw new Error("position must be a Vector2D")

        if(!(dimension instanceof Dimension2D)) throw new Error("dimensionb must be a Dimension2D")
        
        this.#position = position
        this.#dimension = dimension
        this.#color = color
    }

    #position
    #dimension
    #color

    getPosition(){
        return this.#position
    }

    getDimensions(){
        return this.#dimension
    }

    getRGB(){
        return this.#color
    }



    setPosition(position){
        if(!(position instanceof Vector2D)) throw new Error("position must be a Vector2D")

        this.#position = position
    }

    setDimensions(dimension){
        if(!(dimension instanceof Dimension2D)) throw new Error("dimensionb must be a Dimension2D")

        this.#dimension = dimension
    }

    setRGB(color){
        this.#color = color
    }

    increaseX(value){
        this.#position.setX(this.#position.getX() + value)
    }

    increaseY(value){
        this.#position.setX(this.#position.getX() + value)
    }

    increaseY(value){
        this.#dimension.setWidth(this.#dimension.getWidth() + value)
    }

    increaseHeight(value){
        this.#dimension.setHeight(this.#dimension.getHeight() + value)
    }



    


    localIntersects(rect){
        if(!(rect instanceof Rectangle)) throw new Error("Rect must be a rectanlge")
        
        
    }

    static intersects(rect1, rect2){

    }
}

/**browser utils go down here, they are incompativle with backend things like nodejs */

/**
 * 
 */
export class HTMLCanvasManager{
    /**
     * A canvas manager meant to make drawing and using the canvas easier. Passing in the window object will allow the canvas manager to automatically adjust the canvas when the window is resized
     * @param {HTMLCanvasElement} canvas 
     * @param {Window | undefined} window 
     */
    constructor(canvas, window){
        if(!(canvas instanceof HTMLCanvasElement)) throw new Error("canvas must be a HTMLCanvasElement")
        if(!(window instanceof Window) && window != undefined) throw new Error("window must be a Window object or undefined.")

        this.#canvas = canvas
        this.#window = window

        if(window){
            this.#window.addEventListener("resize", (ev) => {
            
            })
        }

        const { width, height } = canvas.getBoundingClientRect();

        this.#canvas.width = width
        this.#canvas.height = height
    }

    #canvas 
    #window



    //front buffer at buffer 0, back_buffer at buffer 0.


    /**
     * returns the html canvas
     * @returns {HTMLCanvasElement}
     */
    getCanvas(){
        return this.#canvas
    }

    /**
     * Returns the width of the canvas
     * @returns {number}
     */
    getWidth(){
        return this.#canvas.getBoundingClientRect().width
    }

    /**
     * Returns the width of the canvas
     * @returns {number}
     */
    getHeight(){
        return this.#canvas.getBoundingClientRect().height
    }

    /**
     * returns the canva dimensions as a 2d Vector
     * @returns {Dimension2D}
     */
    getCanvasDimensions(){
        return new Dimension2D(this.getWidth(),this.getHeight())
    }

    /**
     * returns the canvas proportions as a 2d Vector
     * @returns {Vector2D}
     */
    getCanvasProportions(){
        let gcf = applyGCF([this.getCanvasDimensions().getWidth(), this.getCanvasDimensions().getHeight()])

        return new Vector2D(gcf[0], gcf[1])
    }

    /**
     * returns the canvas context.
     * @returns {CanvasRenderingContext2D}
     */
    getContext(){
        return this.#canvas.getContext('2d')
    }

    getSinglePixelPercentWidth(){
        return Number.parseFloat((1 / this.getWidth()))
    }

    getSinglePixelPercentHeight(){
        return Number.parseFloat((1 / this.getHeight()))
    }

    /**
     * 
     * @returns {number}
     */
    getCanvasRatio(){
        return (this.getWidth() / this.getHeight())
    }

    /**
     * returns a percentage of the window width. the percentage should be in decimal form.
     * @param {number} percent
     * @returns {number} 
     */
    getPercentOfWidth(percent){
        if(typeof percent != "number") throw new Error("Percent must be a number.")
        
        return ((this.getWidth()) * percent)
    }

    /**
     * returns a percentage of the window height. the percentage should be in decimal form.
     * @param {number} percent 
     * @returns {number}
     */ 
    getPercentOfHeight(percent){
        if(typeof percent != "number") throw new Error("Percent must be a number.")
        return ((this.getHeight()) * (percent))
    }
    
    
    /**
     * returns a percentage of the window width and floors it. the percentage should be in decimal form.
     * @param {number} percent
     * @returns {number} 
     */
    getFloorPercentOfWidth(percent){
        return Math.round(this.getPercentOfWidth(percent))
    }

    clearCanvas(){
        this.getContext().clearRect(0,0, this.getWidth(), this.getHeight())
    }

    
    /**
     * returns a percentage of the window height and floors it. the percentage should be in decimal form.
     * @param {number} percent 
     * @returns {number}
     */
    getFloorPercentOfHeight(percent){
        return Math.round(this.getPercentOfHeight(percent))
    }

    /**
     * 
     * @param {Dimension2D} dimension 
     * @returns {Dimension2D}
     */
    getFloorPercentOfCanvas(dimension){
        return new Dimension2D(this.getFloorPercentOfWidth(dimension.getWidth()), this.getFloorPercentOfHeight(dimension.getHeight()))
    }

    /**
     * 
     * @param {Vector2DWrapperClass} vector 
     */
    validationVector(vector){
        if(!(vector instanceof Vector2DWrapperClass)) throw new Error("vector must be an insance of Vector2DWrapperClass")
    }

    /**
     * 
     * @param {Vector2D} position 
     * @param {Dimension2D} dimensions 
     * @returns 
     */

    drawRect(position, dimensions){
        if(!(position instanceof Vector2D)) throw new Error("Position must be an instance of Vector2D")
        if(!(dimensions instanceof Dimension2D)) throw new Error("dimentsions must be an instance of dimension2D")
        
        
        position = this.getFloorPercentOfCanvas(new Dimension2D(position.getX(), position.getY()))
  

        position = new Vector2D(position.getWidth(), position.getHeight())

        dimensions = this.getFloorPercentOfCanvas(dimensions)

        // console.log("after : " + dimensions.toString())
        

        

        this.getContext().fillRect(position.getX(), position.getY(), dimensions.getWidth(), dimensions.getHeight())
    }
}