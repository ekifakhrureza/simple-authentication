
$(document).on('click.bs.dropdown.data-api', '.dropdown-menu', function (e) {
    e.stopPropagation();
});
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { 'token': localStorage.getItem('token') }
});

new Vue({
    el: '#app',
    data: {
        carts: [],
        products: [],
        totalQty: 0,
        errormessage :'',
        checkToken: localStorage.getItem('token')
    },
    methods: {

        login() {
            let email = document.querySelector('input#email').value;
            let password = document.querySelector('input#password').value;
            axios.post('http://localhost:3000/users/login', {
                email: email,
                password: password
            })
                .then((data) => {
                     if(data.status===202){
                       alert('Wrong username/password')
                    }
                    else{
                        localStorage.setItem('id', data.data.id)
                        localStorage.setItem('token', data.data.token)
                        window.location.href = 'index.html';
                    }


                })
                .catch(err => {
                //    alert('Connection problem')

                })
        },

        register : function(){

            let email = document.querySelector('input#emailReg').value;
            let name = document.querySelector('input#nameReg').value;
            let password = document.querySelector('input#passwordReg').value;
            axios.post('http://localhost:3000/users/register', {
                email: email,
                name : name,
                password: password

            })
                .then((data) => {
                     if(data.status===202){
                       alert('Wrong username/password')
                    }
                    else{
                        localStorage.setItem('id', data.data.id)
                        localStorage.setItem('token', data.data.token)
                        window.location.href = 'index.html';

                    }


                })
                .catch(err => {
                   console.log(err);
                   alert(err.response.data.err.message)

                })
        }

    },


});
