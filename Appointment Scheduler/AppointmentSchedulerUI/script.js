class Appointment{
    static add(obj){
        let li=document.createElement('li');
        li.id=`${obj.id}`;
        li.innerHTML=`${obj.name} : ${obj.email} , ${obj.phone} <span><input type="submit" class="deleteLi" value="Delete"><input type="submit" class="editLi" value="Edit"></span>`;
        const appList=document.querySelector('.appList');
        appList.appendChild(li); 
    }

    static async delete(e){
        e.target.parentElement.parentElement.remove();
        let pk=e.target.parentElement.parentElement.id;
        const res=await Database.deleteByPk(pk);
    }

    static async edit(e){
        let pk=e.target.parentElement.parentElement.id;
        let data= await Database.getByPk(pk);
        await Appointment.delete(e);
        return data;
    }
}

class Database{
    static async post(obj){
        try {
            const response=await axios.post('http://localhost:8080/api/',obj)
            return response.data
        } catch (error) {
            console.log(error)
        }
    }

    static async get(){
        try{
            let res=await axios.get('http://localhost:8080/api/')
            return res.data
        }catch(err){
            console.log(err)
        }
    }

    static async getByPk(pk){
        try {
            let res=await axios.get(`http://localhost:8080/api/${pk}`)
            return res.data
        } catch (error) {
            console.log(err)
        }
    }
    static async deleteByPk(pk){
        try {
            let res=await axios.delete(`http://localhost:8080/api/${pk}`)
            return res.data;
        } catch (error) {
            console.log(err)
        }
    }
}

let formEl=document.querySelector('.formEl');
let nameEl= document.querySelector('#name');
let emailEl= document.querySelector('#email');
let phoneEl= document.querySelector('#phone');
let appList= document.querySelector('.appList')

initListioners();

function initListioners(){
    document.addEventListener('DOMContentLoaded',getAppointments);
    formEl.addEventListener('submit',onFormSubmit);
    appList.addEventListener('click',deleteAppointment);
    appList.addEventListener('click',editAppointment);
}

async function onFormSubmit(e){
    e.preventDefault();
    let obj={
        name:nameEl.value,
        email:emailEl.value,
        phone:phoneEl.value
    };

    const responseObj= await Database.post(obj);
    Appointment.add(responseObj);
    nameEl.value='';
    emailEl.value='';
    phoneEl.value='';
}

async function getAppointments(){
    const responseObj= await Database.get();
    responseObj.forEach(element => {
        Appointment.add(element)
    });
}

async function deleteAppointment(e){
    if(e.target.classList.contains('deleteLi')){
        Appointment.delete(e);
    }
}

async function editAppointment(e){
    if(e.target.classList.contains('editLi')){
        let responseObj = await Appointment.edit(e)
        nameEl.value=responseObj.name;
        emailEl.value=responseObj.email;
        phoneEl.value=responseObj.phone;
    }
}