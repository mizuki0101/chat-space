$(function(){
  
  function buildHTML(message){
    var img ="";
    if (message.image){
    var img = `<img src = ${message.image} ">`
    }
    var html =
        `<div class="chatmain-message__data" data-message-id=${message.id} >
            <div class="chatmain-message__data__info">
              <p class="chatmain-message__data__info--taker">
                ${message.user_name}
              </p>
              <p class="chatmain-message__data__info--date">
                ${message.created_at}
              </p>
            </div>
            <p class="chatmain-message__data__text">
            </p>
              <p class="chatmain-message__data__text__content">
                ${message.content}
              </p>
            ${img}
        </div>`
    return html;
  };
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chatmain-message').append(html);
      $('.chatmain-message').animate({ scrollTop: $('.chatmain-message')[0].scrollHeight});
      $('form')[0].reset();
      $('.form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
   });
  });


  var reloadMessages = function() {
    last_message_id = $('.chatmain-message__data:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chatmain-message').append(insertHTML);
      $('.chatmain-message').animate({ scrollTop: $('.chatmain-message')[0].scrollHeight});
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
  }
});