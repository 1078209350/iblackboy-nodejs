export const ok = ()=>{
    return {
        code: 20000,
        success: true,
        message: "成功！"
    }
}

export const fail = ()=> {
    return {
        code: 20001,
        success: false,
        message: "失败！"
    }
}
