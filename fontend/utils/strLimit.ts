export default function strLimit(str:string, maxLength:number, suffix = '...'):string{
    if(str.length <= maxLength){
        return str;
    }

    return str.substring(0, maxLength) + suffix;
}