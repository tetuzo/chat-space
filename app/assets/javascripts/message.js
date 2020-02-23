$(function(){
  var buildHTML = function(message) {
    if (message.body && message.image) {
      console.log(message.image)
      var html = `
      <div class="chat-main__message-list__messagehaml" data-message-id=${message.id}>
        <div class="chat-main__message-list__message__post">
          <div class="chat-main__message-list__message__post__name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__message__post__day">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__message__comment">
          <p class="chat-main__message-list__message__comment__body">
            ${message.body}
          </p>
            <img class="chat-main__message-list__message__comment__image" src=${message.image}>
        </div>
      </div>`
    } else if (message.body) {
      var html = `
      <div class="chat-main__message-list__messagehaml" data-message-id=${message.id}>
        <div class="chat-main__message-list__message__post">
          <div class="chat-main__message-list__message__post__name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__message__post__day">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__message__comment">
          <p class="chat-main__message-list__message__comment__body">
            ${message.body}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      var html = `
      <div class="chat-main__message-list__messagehaml" data-message-id=${message.id}>
        <div class="chat-main__message-list__message__post">
          <div class="chat-main__message-list__message__post__name">
            ${message.user_name}
          </div>
          <div class="chat-main__message-list__message__post__day">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message-list__message__comment">
          <img src=${message.image} class="chat-main__message-list__message__comment__image">
        </div>
      </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
    var reloadMessages = function() {
      var last_message_id = $('.chat-main__message-list__messagehaml:last').data("message-id");
      console.log(last_message_id)
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
          $('.chat-main__message-list').append(insertHTML);
          $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert("自動更新できませんでした。");
     });
   };
   if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});