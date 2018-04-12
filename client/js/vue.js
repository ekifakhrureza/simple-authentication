
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
          console.log('ajajajajaja');
          let email = document.getElementById('email').value;
          let password = document.getElementById('password').value;
            console.log(email);
            console.log(password);
            axios.post('http://localhost:3000/users/login', {
                email: email,
                password: password
            }).then(data => {
                  console.log('masuk gak yaaaa'+data);
                     if(data.status===202){
                       alert('Wrong username/password')
                    }
                    else{
                        localStorage.setItem('token', data.data.token)
                        window.location.href = 'index.html';
                    }


                })
                .catch(err => {
                    console.log('aerrrorrrr');

                })
        },

        register : function(){
              console.log('abababababa');

            let email = document.getElementById('emailReg').value;
            let password = document.getElementById('passwordReg').value;
            console.log(email);
            console.log(password);
            axios.post('http://localhost:3000/users/register', {
                email: email,
                name : name,
                password: password

            })
                .then((data) => {

                })
                .catch(err => {
                   console.log(err);
                   alert(err.response.data.err.message)

                })
        }

    },


});
