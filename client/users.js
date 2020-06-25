
var liaWithEditOrDeleteOnClick = function (user, callback) {
	var $userListItem = $("<li>").text(user.username),
		$userEditLink = $("<a>").attr("href", "users/" + user._id),
		$userRemoveLink = $("<a>").attr("href", "users/" + user._id);

	$userEditLink.addClass("linkEdit");
	$userRemoveLink.addClass("linkRemove");

	$userRemoveLink.text("Удалить");
	$userRemoveLink.on("click", function () {
		$.ajax({
			url: "/users/" + user._id,
			type: "DELETE"
		}).done(function (responde) {
			callback();
		}).fail(function (err) {
			console.log("error on delete 'user'!");
		});
		return false;
	});
	$userListItem.append($userRemoveLink);

	$userEditLink.text("Редактировать");
	$userEditLink.on("click", function() {
		var newUsername = prompt("Введите новый никнейм", user.username);
		if (newUsername !== null && newUsername.trim() !== "") {
			$.ajax({
				"url": "/users/" + user._id,
				"type": "PUT",
				"data": { "username": newUsername },
			}).done(function (responde) {
				callback();
			}).fail(function (err) {
				console.log("Произошла ошибка: " + err);
			});
		}
		return false;
	});
	$userListItem.append($userEditLink);

	return $userListItem;
}

var main = function (userObjects) {
	"use strict";
	// создание пустого массива с вкладками
	var tabs = [];
	// добавляем вкладку Новые
	tabs.push({
		"name": "Пользователи",
		// создаем функцию content
		// так, что она принимает обратный вызов
		"content": function(callback) {
			$.getJSON("users.json", function (userObjects) {
				var $content = $("<ul>");
				for (var i = userObjects.length-1; i>=0; i--) {
					var $userListItem = liaWithEditOrDeleteOnClick(userObjects[i], function() {
						$(".tabs a:first-child span").trigger("click");
					});
					$content.append($userListItem);
				}
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	

	// создаем вкладку Добавить
	tabs.push({
		"name": "Добавить",
		"content":function () {
			$.get("users.json", function (userObjects) {	
				// создание $content для Добавить 
				var $textInput = $("<h3>").text("Введите никнейм: "),
					$input = $("<input>").addClass("username"), 
					$button = $("<button>").text("Добавить"),
					$content1 = $("<ul>"), $content2 = $("<ul>");


				$("main .content").append($textInput);
				$("main .content").append($input);
				$("main .content").append($button);
				$("main .content").append($content1); 
				
				function btnfunc() {
					var username = $input.val(),
						newUser = {"username":username};
					$.post("users", newUser, function(result) {
						$input.val("");
						$(".tabs a:first-child span").trigger("click");
					});
				}
				$button.on("click", function() {
					btnfunc();
				});
			});
		}
	});

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href",""),
			$spanElement = $("<span>").text(tab.name);
		$aElement.append($spanElement);
		$("main .tabs").append($aElement);

		$spanElement.on("click", function () {
			var $content;
			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .content").empty();
			tab.content(function (err, $content) {
				if (err !== null) {
					alert ("Возникла проблема при обработке запроса: " + err);
				} else {
					$("main .content").append($content);
				}
			});
			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");
}

$(document).ready(function() {
	$.getJSON("users.json", function (userObjects) {
		main(userObjects);
	});
});
