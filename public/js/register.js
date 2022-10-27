
function checkPasswordLength() {
    var password = $('input[name=password]').val();
    if (password.length  < 8){
        $(".err_pass1").removeClass('success');
        $(".err_pass1").addClass('err_regis');
    }
    else{
        $(".err_pass1").addClass("success");
    }
}
function checkPasswordMatch() {
    var password = $('input[name=password]').val();
    var confirmPassword = $('input[name=repassword]').val();
    if (password != confirmPassword ){
        $(".err_pass2").removeClass('success');
        $(".err_pass2").addClass('err_regis');
    }
    else{
        $(".err_pass2").addClass("success");
    }
}
const check = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
function checkEmailMatch() {
    var email = $('input[name=email]').val();
    if(!check.test(email)) {
        $(".err_email").removeClass('success');
        $(".err_email").addClass('err_regis');
    }
    else{
        $(".err_email").addClass('success');
    }
}
function checkPhoneNumber(){
    var phonenumber = $('input[name=phonenumber]').val();
    if(phonenumber.length < 9){
        $(".err_phone").removeClass('success');
        $(".err_phone").addClass('err_regis');
    }
    else{
        $(".err_phone").addClass("success");
    }
}
function checkRegisterSuccess(){
    if($(".err_email").hasClass('success') && $(".err_pass1").hasClass('success') &&  $(".err_pass2").hasClass('success') && $(".err_phone").hasClass('success')&& $('input[name=username]').val() && $('input[name=fullname]').val()) {
        $('#submit').removeAttr("type").attr("type", "submit");
    }
    else{
        $('#submit').removeAttr("type").attr("type", "button");
    }
}
$(document).ready(function () {
    $("#txtNewPassword").keyup(checkPasswordLength);
    $("#txtConfirmPassword").keyup(checkPasswordMatch);
    $("#newEmail").keyup(checkEmailMatch);
    $("#txtPhonenumber").keyup(checkPhoneNumber);
    $("#newEmail,#txtNewPassword ,#txtConfirmPassword,#txtUsername,#txtFullname, #txtEmail, #txtPhonenumber").keyup(checkRegisterSuccess);
 })
