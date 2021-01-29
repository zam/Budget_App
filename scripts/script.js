var userList = [];

const MIN_USERNAME_LENGTH = 2;
const MIN_PASSWORD_LENGTH = 3;
const MAX_USERNAME_LENGTH = 12;
const MAX_PASSWORD_LENGTH = 16;


function UserInfo(username, password, email, balance){
    this.username = username;
    this.password = password;
    this.email = email;
    this.balance = balance;
    this.expenseitems = [];
}


class ExpenseItem {
    constructor(name, cost, owner) {
        this.name = name;
        this.cost = cost;
        this.owner = owner;
    }
}
createUser('test','test','test@test.com');



function createUser(inputUsername, inputPassword, inputEmail) {
    if (userList.length !== 0){
        for(let x = 0; x < userList.length; x++){
            if ( inputUsername === userList[x].username)
                usernameTaken = true;
            else 
                usernameTaken = false;
        }
        if ( usernameTaken === true )
            alert('Username is already taken');
        else{
            var newUser = new UserInfo(inputUsername, inputPassword,inputEmail, 0); 
            userList.push(newUser);
        }
    }else{
        var newUser = new UserInfo(inputUsername, inputPassword,inputEmail, 0); 
        userList.push(newUser);
    }
}

function get_balance(user) {


}

function deposit(user, amount) {
    amount = parseInt(amount)
    if (amount > 0){
        user.balance += amount;
        balance_p.innerHTML = `Balance: $${user.balance.toFixed(2)}`;
    }else{
        alert('Invalid amount');
    }
}

function withdraw(user, amount) {
    amount = parseInt(amount)

    if (user.balance < amount)
        alert('Insufficient balance')
    else{
        user.balance -= amount;
        balance_p.innerHTML = `Balance: $${user.balance.toFixed(2)}`;
    }

}

function send(sender, receiver, amount) {
    amount = parseInt(amount);
    let recv = userList.find(element => element.username === receiver);
    if (recv === undefined){
        alert(`User ${receiver} does not exist`);
    }else if (recv.username == sender.username){
        alert('Cannot send to your own account');
    }else{
        if (sender.balance < amount){
            alert('Insufficient balance')
        }else{
            sender.balance -= amount;
            balance_p.innerHTML = `Balance: $${sender.balance.toFixed(2)}`;
            recv.balance += amount;
        }
    }

}

function expense_tracker() {

}


function open_menu(menu) {
    console.log(menu);
     num_tabs = document.getElementsByClassName('menu-content');

    for(let x = 0; x < num_tabs.length; x++){
        num_tabs[x].classList.add('disabled');
    }
    var chosen_menu = `.${menu}-menu`;
    console.log(chosen_menu) 
    document.querySelector(chosen_menu).classList.remove('disabled');
}
/* wrong_arguments
user_already_exists
user_does_not_exists
not_enough_money
sender_does_not_exists
receiver_does_not_exists */
/* 
function insert_login_form () {

}

function insert_ */

function submitForm() {
    button_value = document.querySelector('.submit-button').value;
    if (button_value === 'login'){

    }else if (button_value ==='register') {

    }else{
        console.log('error');
    }
}

function changeTabs(value) {
    login_form = document.querySelector('.login-form');
    register_form = document.querySelector('.register-form');
    submit_button = document.querySelector('.submit-button');
    login_tab = document.querySelector('.login-tab');
    signup_tab = document.querySelector('.signup-tab')
    if(value === 'login'){
          if(!login_form.classList.contains('active')){
            login_form.classList.remove('disabled');
            register_form.classList.remove('active');
            login_form.classList.add('active');
            register_form.classList.add('disabled');
            submit_button.value = 'login';
            submit_button.innerHTML = 'LOGIN';
            login_tab.classList.add('underlined');
            signup_tab.classList.remove('underlined');
        }  
    }else{
        if(!register_form.classList.contains('active')){
            login_form.classList.add('disabled');
            register_form.classList.add('active');
            login_form.classList.remove('active');
            register_form.classList.remove('disabled');
            submit_button.value = 'register';
            submit_button.innerHTML = 'REGISTER';
            login_tab.classList.remove('underlined');
            signup_tab.classList.add('underlined');
        }  
    }    
}

function validateForm () {
    form_type = document.querySelector('.submit-button').value;
    if(form_type==='register'){
        register_username = document.querySelector('#register-username').value;
        register_password = document.querySelector('#register-password').value;
        register_email = document.querySelector('#register-email').value;

        if (register_username.length <= MIN_USERNAME_LENGTH || register_username.length > MAX_USERNAME_LENGTH){
            isUsernameValid = false;
            alert('Username must be 3 to 11 characters');
        }else{
            isUsernameValid = true;
        }    
        if (register_password.length <= MIN_PASSWORD_LENGTH || register_password.length > MAX_PASSWORD_LENGTH){
            isPasswordValid = false;
            alert('Password must be 4 to 15 characters');
        }else{
            isPasswordValid = true;
        }

        isEmailValid = validateEmail(register_email);

        if ( isPasswordValid === true && isUsernameValid === true && isEmailValid === true){
            if (userList.length === 0){
                createUser(register_username, register_password, register_email);
                alert('Registration successful. Please login');
                changeTabs('login');
            }else{
                if(doesUserExist(register_username) === true){
                    alert('Username is taken.');
                }else{
                    createUser(register_username, register_password, register_email);
                    alert('Registration successful. Please login');
                    clearFields();
                    changeTabs('login');
                }
            }
        }
        

    }else{
        
        login_username = document.querySelector('#login-username').value;
        login_password = document.querySelector('#login-password').value;

        for(let x = 0; x < userList.length; x++){
            if(login_username === userList[x].username){
               userExists = true;
               if(login_password === userList[x].password){
                   login(userList[x]);
                   clearFields();
               }else
                alert('Invalid username or password');
            }else{
                userExists = false;
            }
        }
        
    }

}

function login (user){
    document.querySelector('.main-menu').classList.add('disabled');
    userpage_div = document.createElement('div');
    userpage_div.classList.add('user-page');
    usermenu_div = document.createElement('div');
    usermenu_div.classList.add('user-menu');
    actions_div = document.createElement('div');
    actions_div.classList.add('action-menu');
    
    deposit_div = document.createElement('div');
    deposit_div.classList.add('menu-content');
    deposit_div.classList.add('deposit-menu');
    deposit_div.classList.add('disabled');
    deposit_form = document.createElement('form');
    deposit_form.setAttribute('method','post');
    deposit_label = document.createElement('label');
    deposit_label.innerHTML = 'Enter amount to deposit';
    deposit_input = document.createElement('input');
    deposit_input.classList.add('transact-input');
    deposit_input.id = 'deposit-input';
    deposit_input.setAttribute('type','number');
    deposit_submit = document.createElement('button');
    deposit_submit.innerHTML = 'DEPOSIT';
    deposit_submit.classList.add('transact-button')
    deposit_form.appendChild(deposit_label);
    deposit_form.appendChild(deposit_input); 
    
    withdraw_div = document.createElement('div');
    withdraw_div.classList.add('menu-content');
    withdraw_div.classList.add('withdraw-menu');
    withdraw_div.classList.add('disabled');
    withdraw_form = document.createElement('form');
    withdraw_form.setAttribute('method','post');
    withdraw_label = document.createElement('label');
    withdraw_label.innerHTML = 'Enter amount to withdraw';
    withdraw_input = document.createElement('input');
    withdraw_input.classList.add('transact-input');
    withdraw_input.id = 'withdraw-input';
    withdraw_input.setAttribute('type','number');
    withdraw_submit = document.createElement('button');
    withdraw_submit.innerHTML = 'WITHDRAW';
    withdraw_submit.classList.add('transact-button')
    withdraw_form.appendChild(withdraw_label);
    withdraw_form.appendChild(withdraw_input);
    
    send_div = document.createElement('div');
    send_div.classList.add('menu-content');
    send_div.classList.add('send-menu');
    send_div.classList.add('disabled');
    send_form = document.createElement('form');
    send_form.setAttribute('method','post');

    send_label = document.createElement('label');
    send_label.innerHTML = 'Enter amount to send';
    send_input = document.createElement('input');
    send_input.classList.add('transact-input');
    send_input.id = 'send-input';
    send_input.setAttribute('type','number');

    recipient_label = document.createElement('label');
    recipient_label.innerHTML = 'Enter recipient';
    recipient_input = document.createElement('input');
    recipient_input.classList.add('transact-input');
    recipient_input.id = 'recipient-input';
    recipient_input.setAttribute('type','text');

    send_submit = document.createElement('button');
    send_submit.innerHTML = 'SEND';
    send_submit.classList.add('transact-button');
    send_form.appendChild(recipient_label);
    send_form.appendChild(recipient_input); 
    send_form.appendChild(send_label);
    send_form.appendChild(send_input); 

    expense_div = document.createElement('div');
    expense_div.classList.add('expense-menu');
    expense_div.classList.add('disabled');
    expense_div.classList.add('menu-content');

    expense_name_label = document.createElement('label');
    expense_name_label.innerHTML = 'Name';
    expense_name_input = document.createElement('input')
    expense_name_input.setAttribute('type', 'text');
    expense_name_input.classList.add('expense-input');

    expense_cost_label = document.createElement('label');
    expense_cost_label.innerHTML = 'Cost';
    expense_cost_input = document.createElement('input')
    expense_cost_input.setAttribute('type', 'number');
    expense_cost_input.classList.add('expense-input');

    add_expense_button = document.createElement('button');
    add_expense_button.innerHTML = 'Add Expense';
    add_expense_button.classList.add('add-expense');

    add_expense_area = document.createElement('div')
    add_expense_area.classList.add('add-expense-area');



    deposit_button = document.createElement('button');
    deposit_button.value = 'deposit';
    deposit_button.innerHTML = 'Deposit';
    deposit_button.classList.add('menu-button');
    


    withdraw_button = document.createElement('button');
    withdraw_button.value = 'withdraw';
    withdraw_button.classList.add('menu-button');
    withdraw_button.innerHTML = 'Withdraw';
   
    

    send_button = document.createElement('button');
    send_button.value = 'send';
    send_button.classList.add('menu-button');
    send_button.innerHTML = 'Send Money';
    

    expense_tracker_button = document.createElement('button');
    expense_tracker_button.value = 'expense-tracker';
    expense_tracker_button.classList.add('menu-button');
    expense_tracker_button.innerHTML = 'Expense Tracker';
    

    user_detail_div = document.createElement('div');
    user_detail_div.classList.add('user-details');
    user_p = document.createElement('p');
    user_p.innerHTML = user.username;
    user_p.classList.add('user-info');
    balance_p = document.createElement('p');
    balance_p.innerHTML = `Balance: $${user.balance}`;
    balance_p.classList.add('user-info');

    logout_button = document.createElement('button');
    logout_button.classList.add('logout-button');
    logout_button.innerHTML = "LOGOUT";
    logout_button.addEventListener('click', logout);

    button_div = document.createElement('div');
    button_div.classList.add('button-list');

    transact_area_div = document.createElement('div');
    transact_area_div.classList.add('transaction-area');

    document.body.appendChild(userpage_div);
    document.querySelector('.user-page').appendChild(usermenu_div);
    document.querySelector('.user-page').appendChild(actions_div);
    

    document.querySelector('.user-menu').appendChild(user_detail_div);
    document.querySelector('.user-menu').appendChild(logout_button);

    document.querySelector('.user-details').appendChild(user_p);
    document.querySelector('.user-details').appendChild(balance_p);

    document.querySelector('.action-menu').appendChild(button_div);
    document.querySelector('.action-menu').appendChild(transact_area_div);

    document.querySelector('.transaction-area').appendChild(deposit_div);
    document.querySelector('.deposit-menu').appendChild(deposit_form)
    document.querySelector('.deposit-menu').appendChild(deposit_submit)
    
    document.querySelector('.transaction-area').appendChild(withdraw_div);
    document.querySelector('.withdraw-menu').appendChild(withdraw_form)
    document.querySelector('.withdraw-menu').appendChild(withdraw_submit)

    document.querySelector('.transaction-area').appendChild(send_div);
    document.querySelector('.send-menu').appendChild(send_form)
    document.querySelector('.send-menu').appendChild(send_submit)

    document.querySelector('.transaction-area').append(expense_div);
    document.querySelector('.expense-menu').append(add_expense_area);
    document.querySelector('.add-expense-area').append(expense_name_label);
    document.querySelector('.add-expense-area').append(expense_name_input);
    document.querySelector('.add-expense-area').append(expense_cost_label);
    document.querySelector('.add-expense-area').append(expense_cost_input);
    document.querySelector('.add-expense-area').append(add_expense_button);



    document.querySelector('.button-list').appendChild(deposit_button);
    document.querySelector('.button-list').appendChild(withdraw_button);
    document.querySelector('.button-list').appendChild(send_button); 
    document.querySelector('.button-list').appendChild(expense_tracker_button); 
    
    send_button.addEventListener('click', () =>open_menu('send'));
    deposit_button.addEventListener('click', () => open_menu('deposit'));
    withdraw_button.addEventListener('click', () => open_menu('withdraw'))
    expense_tracker_button.addEventListener('click', () => open_menu('expense'));
    
    deposit_submit.addEventListener('click', function() {
        var amt = document.querySelector('#deposit-input').value
        deposit(user, amt);
    })

    withdraw_submit.addEventListener('click', function() {
        var amt = document.querySelector('#withdraw-input').value
        withdraw(user, amt);
    })

    send_submit.addEventListener('click', function() {
        var amt = document.querySelector('#send-input').value;
        var recp = document.querySelector('#recipient-input').value;
        send(user, recp, amt);
    })



}    

function logout() {
    document.querySelector('.user-page').remove();
    document.querySelector('.main-menu').classList.remove('disabled');
    clearFields();

}

function doesUserExist (checkname) {
    var exists;
    for (let x = 0; x < userList.length; x++){
        if (checkname === userList[x].username)
            exists = true;
        else
            exists = false;
    }
    return exists;
}

function validateEmail (val_email) {
    var regex_exp = /\S+@\S+\.\S+/;
    if (regex_exp.test(val_email) === true) {
        var found  = userList.find(ele => ele.email === val_email)
        if (found === undefined)
            return true;
        else{
            alert('Email address is already in use')
            return false;
        }

    }else{
        alert('Please enter a valid email-address');
        return false;
    }

}

function clearFields () {
    document.querySelector('#login-username').value = '';
    document.querySelector('#login-password').value = '';
    document.querySelector('#register-username').value = '';
    document.querySelector('#register-password').value = '';
    document.querySelector('#register-email').value = '';
}

function createExpenseItem (name, cost) {

}