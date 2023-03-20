class Display{
    static addElement(data){
        const expenseList= document.querySelector('.exenseList');
        const li=document.createElement('li');
        li.classList='expenses';
        // console.log(data)
        li.id=data.id;
        li.innerHTML=`
                ${data.amount} : ${data.type} - ${data.detail}
                    <span class="edit_delete">
                        <input type="button" class="editLi" value="Edit">
                        <input type="button" class="deleteLi" value="Delete">
                    </span>
                    `
        expenseList.appendChild(li)
    }

    static async removeElement(e,token){
        e.target.parentElement.parentElement.remove();
        let pk=e.target.parentElement.parentElement.id;
        try{
            const data= await Server.removeExp(pk,token);
            return data
        }catch(err){
            console.log(err)
        }
    }
}
class Server{
    static async addExpense(formData){
        try {
            const data= await axios.post('http://localhost:3000/expense/add',{data:formData,token:token})
            return data.data
        } catch (error) {
            console.log(error)
        }
    }

    static async fetchAll(token){
        try{
            const data= await axios.get('http://localhost:3000/expense/getall',{headers: {
                'Authorization': token,
            }})
            console.log(data)
            return data.data
        }
        catch(err){
            console.log(err)
        }
        
    }

    static async removeExp(pk,token){
        try{
            const data= await axios.delete('http://localhost:3000/expense/remove',{headers:{
                "Authorization":token,
                "pk":pk
            }})
            return data.data
        }catch(err){
            console.log(err)
        }
    }

}

const formEl= document.querySelector('.formEl');
const amount= document.querySelector('#amount');
const type= document.querySelector('#type');
const detail= document.querySelector('#detail');
const expenseList= document.querySelector('.exenseList');
const rzpbtn= document.querySelector('#rzpbtn');
const leaderboard= document.querySelector('.leaderboard');

const token= localStorage.getItem('userInfo');


const intilistioners= ()=>{
    document.addEventListener('DOMContentLoaded',fetchAllExp);
    formEl.addEventListener('submit',onFormSubmit);
    expenseList.addEventListener('click',onExpenseClick)
    rzpbtn.addEventListener('click',onRzpBtnClick)
}

let onFormSubmit= async(e) =>{
    e.preventDefault()
    const formData={
        amount:amount.value,
        type:type.value,
        detail:detail.value
    }
    try {
        const data=await Server.addExpense(formData);
        Display.addElement(data)
        amount.value=''
        type.value=''
        detail.value=''
    } catch (error) {
        console.log(error)
    }

    
}

let premiumUser =()=>{
    const premiumDiv= document.createElement('div');
    premiumDiv.classList='formDiv'
    premiumDiv.innerHTML=`<h3 id="premiumFlag">Premium User !🙌</h3>`
    formEl.appendChild(premiumDiv);
    rzpbtn.style.display='none'    
}
let premiumFeature = async()=>{
    const data= await axios.get('http://localhost:3000/expense/getExpensesGroupby',{headers: {
        'Authorization': token,
    }})
    let count=0;
    data.data.data[0].forEach((el)=>{
        const li= document.createElement('li');
        li.classList='listUsers';
        li.style.listStyle='none';
        count++;
        li.innerHTML=`${count}.  ${el.name} : ${el.amount_sum}`;
        leaderboard.appendChild(li)
    })
}


let fetchAllExp= async()=>{
    try{
        // console.log(token)
        let data=await Server.fetchAll(token)
        // console.log(data)
        data.resData.data.forEach(element => {
            Display.addElement(element);
        });
        if(data.resData.isPremium.isPremium === true){
            premiumUser();
            premiumFeature();
        }
    }catch(err){
        console.log(err)
    }
}

let onExpenseClick=async(e)=>{
    if(e.target.classList.contains('editLi')){
        const data = await Display.removeElement(e,token);
        amount.value=data.data.amount
        type.value=data.data.type
        detail.value=data.data.detail
    }else if(e.target.classList.contains('deleteLi')){
        const data = await Display.removeElement(e,token);
        
    }
}

let onRzpBtnClick= async(e)=>{
    try {
        const response=await axios.get('http://localhost:3000/purchase/premium',{headers:{"Authorization":token}})
        console.log(response)
        var options={
            "key":response.data.key_id,
            "order_id":response.data.order.id,
            "handler": async function(res){
                await axios.post('http://localhost:3000/purchase/premium',{
                    order_id:options.order_id,
                    payment_id:res.razorpay_payment_id
                },{headers:{"Authorization":token}})
                alert('You are Premium now')
                location.reload();
            }
        }
        const rzp1= new Razorpay(options);
        rzp1.open()
        e.preventDefault()
        rzp1.on('payment.failed',function(res){
            console.log(res);
            alert('something went wrong')
        })
    } catch (error) {
        console.log(error)
    }
    
    
}

    
intilistioners()