const formEl= document.querySelector('.formEl');
const email= document.querySelector('#email');
const password= document.querySelector('#password');
const error= document.querySelector('#error')

const initlistioner=()=>{
    formEl.addEventListener('submit',onFromSubmit)
}

const onFromSubmit= async(e)=>{
    e.preventDefault()
    const formData={
        email:email.value,
        password:password.value
    }
    try {
        const data= await axios.post('http://localhost:3000/user/login',formData)
        if(data.data==="user does'nt exist"){
            error.style.display='block'
            error.textContent=data.data
            error.style.color='red'
            setTimeout(() => {
                error.style.display='none';
            }, 1400);
        }
        else if (data.data.flag===true){
            localStorage.setItem('userInfo',data.data.token)
            window.location.href='expenseApp.html' 
        }else{
            error.style.display='block'
            error.textContent="Wrong Password"
            error.style.color='red'
            setTimeout(() => {
                error.style.display='none';
            }, 1400);
        }
    } catch (error) {
        console.log(error)
    }
}

initlistioner()