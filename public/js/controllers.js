'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('MyCtrl1', function ($scope, socket) {
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });

    var socket = io.connect();
            var $messageForm = $('#messageForm');
            var $message = $('#message');
            var $chat = $('#chat');
            var $messageArea = $('#messageArea');
            var $userFormArea = $('#userFormArea');
            var $userForm = $('#userForm');
            var $users = $('#users');
            var $username = $('#username');
            $messageForm.submit(function(e){
                e.preventDefault();
                socket.emit('send message', $message.val());
                $message.val('');
            });
            socket.on('new message', function(data){
                $chat.append('<div class="well"><strong>'+ data.user +'</strong>: '
                + data.msg + '</div>');
            });
            $userForm.submit(function(e){
                e.preventDefault();
                socket.emit('new user', $username.val(), function(data){
                    if(data){
                        $userFormArea.hide();
                        $messageArea.show();
                    }
                });
                $username.val('');
            });
            socket.on('get users', function(data){
                var html = '';
                for (i=0; i< data.length; i++){
                    html += '<li class="list-group-item">'+ data[i] +'</li>' 
                }
                $users.html(html) 
            });


  }).
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here
  });
