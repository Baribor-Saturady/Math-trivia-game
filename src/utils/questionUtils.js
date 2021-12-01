/* eslint-disable no-eval */
const operators = ['/','*','+','-'];

/**
 * 
 * @param {*} s Start index to slice
 * @returns A random operator in the range of s-end 
 */
const getOperator = (s=0)=>operators[s+Math.floor(Math.random()*(4-s))];

const getFactors = (n)=>{
    let factors = [];

    for(let i=1; i<=n; ++i){
        if(n%i===0){
            factors.push(i);
        }
    }

    return factors;
}

const getMultDiv = (op)=>{
    let left = Math.floor(Math.random()*21)+1;
    let right;

    if(op==='*'){
        let choices = [1,2,3,left-1,left,left+1];
        right = choices[Math.floor(Math.random()*6)];
    }else{
        let choices = getFactors(left);
        right = choices[Math.floor(Math.random()*choices.length)];
    }
    
    let question = `${left} ${op} ${right}`;
    let answer = parseInt(eval(question));
    let temp = answer;
    let choices = [answer+1,answer+2];
    if(answer>1){
        choices.push(answer-1);
        answer-2>=0 && choices.push(answer-2);
    }
    answer = choices[Math.floor(Math.random()*choices.length)];
    let isValid = [true, false][Math.floor(Math.random()*2)];
    if(isValid) answer = temp;
    return [question, answer, isValid];
}


export const getQuestion = ()=>{
    let op = getOperator();
    let question, answer;

    if(op==='/' || op==='*'){
        return getMultDiv(op);
    }

    let num1 = Math.floor(Math.random()*100)+1;
    let num2 = Math.floor(Math.random()*100)+1;
    let left = Math.max(num1, num2);
    let right = (num1+num2)-left;
    question = `${left} ${op} ${right}`;
    answer = parseInt(eval(question));
    let temp = answer;
    let choices = [answer];
    for(let i=1; i<=3; ++i){
        if(answer-i>=0){
            choices.push(answer-i);
        }
        choices.push(answer+i);
    }
    answer = choices[Math.floor(Math.random()*choices.length)];
    let isValid = [true, false][Math.floor(Math.random()*2)];
    if(isValid) answer = temp;
    return [question, answer, isValid];

}

