class display{
    static addElement(data){
        const expenseList= document.querySelector('.exenseList');
        const li=document.createElement('li');
        li.classList='expenses'
        li.innerHTML=`
                ${data.amount} : ${data.type} - ${data.detail}
                    <span class="edit_delete">
                        <input type="button" class="editLi" value="Edit">
                        <input type="button" class="deleteLi" value="Delete">
                    </span>
                    `
        expenseList.appendChild(li)
    }
}

const formEl= document.querySelector('.formEl');
const amount= document.querySelector('#amount');
const type= document.querySelector('#type');
const detail= document.querySelector('#detail');
const expenseList= document.querySelector('#expenseList');

const intilistioners= ()=>{
    formEl.addEventListener('submit',onFormSubmit)
}

let onFormSubmit= (e) =>{
    e.preventDefault()
    const formData={
        amount:amount.value,
        type:type.value,
        detail:detail.value
    }

    display.addElement(formData)
}
intilistioners()