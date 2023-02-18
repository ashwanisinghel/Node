export default class display{
    static addElement(data){
        const expenseList= document.querySelector('.exenseList');
        const li=document.createElement('li');
        li.innerHTML=`
                <li class="expenses" id="">
                ${data.amount} : ${data.type} - ${data.detail}
                    <span class="edit_delete">
                        <input type="button" class="editLi" value="Edit">
                        <input type="button" class="deleteLi" value="Delete">
                    </span>
                </li>
                    `
        expenseList.appendChild(li)
    }
}