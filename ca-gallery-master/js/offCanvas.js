function openCanvas(){
    document.querySelector('.offcanvas-btn').classList.toggle('offcanvas-btn-open');
    document.querySelector('.offcanvas-aside').classList.toggle('offcanvas-aside-open');    
}

$(function () {
    $('.SendEmail').click(function (event) {
        
    //   var email = ${'#name'};
      var subject = 'Test';
      var emailBody = 'Hi Sample,';
      var attach = 'path';
      console.log(event);
      
      
      window.open('https://mail.google.com/mail/?view=cm&fs=1&to= me@example.com &su= SUBJECT &body= BODY', '_blank') ;

          
    });
  });