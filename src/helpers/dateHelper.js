function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

Date.prototype.toLightString=function (){
    return this.getUTCFullYear() +
        '.' + pad(this.getUTCMonth() + 1) +
        '.' + pad(this.getUTCDate())

}

export function lightDate(date){
    return pad(date.getMonth()+1)+'.'+pad(date.getDate())+'.'+pad(date.getFullYear())
}