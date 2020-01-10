$(function(){
  function buildHTML(message){

    if (message.image) {
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
            <img src=${message.image} size: "200x125">
        </div>`
      return html;
    } else {
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
        </div>`
      return html
    };
  }
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
});