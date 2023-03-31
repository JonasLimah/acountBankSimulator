
export const Boost = {
    changeValue : (value:string)=>{
    return parseFloat(value) || Number(value)
},
    VerifySing : (x:number)=>{
        return Math.sign(x)
    }

}