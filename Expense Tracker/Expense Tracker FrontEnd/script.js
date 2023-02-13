const signUpform=document.querySelector('#signUpForm')
const nameEl=document.querySelector('#name')
const emailEl=document.querySelector('#email')
const passwordEl= document.querySelector('#password')
const error= document.querySelector('#error')

function initlistioner(){
    signUpform.addEventListener('submit',signUpformSubmit)
}

const signUpformSubmit=async(e)=>{
    e.preventDefault()
    try {
        const formData={
            name:nameEl.value,
            email:emailEl.value,
            password:passwordEl.value
        }
        if(formData.name!='' && formData.email!='' && formData.password!=''){
            const data=await axios.post('http://localhost:3000/user/signup',formData)
            // console.log(data.data)
            if(data.data=='Existing User try Sign In'){
                error.textContent=data.data
                error.style.color='red'
            }else{
                error.textContent='Account Created'
                error.style.color='green'
                nameEl.value=''
                emailEl.value=''
                passwordEl.value=''
            }
        }else{
            error.textContent='Fill some values in remaining empty fields'
            error.style.color='red'
        }
    } catch (error) {
        console.log(err)
    }
}

initlistioner();