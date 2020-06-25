var liaWithEditOrDeleteOnClick = function (todo, callback) {

	var $todoStr = $("<tr>"),
		$todoListItem1 = $("<td>").text(todo.petName),
		$todoListItem2 = $("<td>").text(todo.date),
		$todoListItem3 = $("<td>"),
		$todoListItem4 = $("<td>"),
		$todoEditLink = $("<a>").attr("href", "todos/" + todo._id),
		$todoRemoveLink = $("<a>").attr("href", "todos/" + todo._id);

	$todoEditLink.addClass("linkEdit");
	$todoRemoveLink.addClass("linkRemove");

	$todoRemoveLink.text("x");
	$todoRemoveLink.on("click", function () {
		$.ajax({
			url: "/todos/" + todo._id,
			type: "DELETE"
		}).done(function (responde) {
			callback();
		}).fail(function (err) {
			console.log("error on delete 'todo'!");
		});
		return false;
	});
	$todoListItem2.append($todoRemoveLink);

	$todoEditLink.text("x");
	$todoEditLink.on("click", function() {
		var newDate = prompt("Введите новую дату", todo.date);
		if (newDate !== null && newDate.trim() !== "") {
			$.ajax({
				"url": "/todos/" + todo._id,
				"type": "PUT",
				"data": { "date": newDate },
			}).done(function (responde) {
				callback();
			}).fail(function (err) {
				console.log("Произошла ошибка: " + err);
			});
		}
		return false;
	});
	$todoListItem3.append($todoEditLink);
	$todoListItem4.append($todoRemoveLink);
	$todoStr.append($todoListItem1);
	$todoStr.append($todoListItem2);
	$todoStr.append($todoListItem3);
	$todoStr.append($todoListItem4);
	return $todoStr;
}

var main = function (toDoObjects) {
	"use strict";
	// создание пустого массива с вкладками
	var tabs = [];
	// добавляем вкладку Новые
	tabs.push({
		"name": "Новые",
		// создаем функцию content
		// так, что она принимает обратный вызов
		"content": function(callback) {
			$.getJSON("todos.json", function (toDoObjects) {
				var $content = $("<table>");
				var $header = $("<tr>");
				var $pname = $("<td>").text("Кличка");
				var $_date = $("<td>").text("Дата");
				var $edit = $("<td>").text("Изменить");
				var $del = $("<td>").text("Удалить");
				
				$header.append($pname, $_date, $edit, $del);
				$content.append($header);
				for (var i = toDoObjects.length-1; i>=0; i--) {
					var $todoListItem = liaWithEditOrDeleteOnClick(toDoObjects[i], function() {
						$(".tabs a:first-child span").trigger("click");
					});
					$content.append($todoListItem);
				}
				callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	// добавляем вкладку Старые
	tabs.push({
		"name": "Старые",
		"content": function(callback) {
			$.getJSON("todos.json", function (toDoObjects) {
				var $content,
					i;
				var $content = $("<table>");
				var $header = $("<tr>");
				var $pname = $("<td>").text("Кличка");
				var $_date = $("<td>").text("Дата");
				var $edit = $("<td>").text("Изменить");
				var $del = $("<td>").text("Удалить");
				
				$header.append($pname, $_date, $edit, $del);
				$content.append($header);
				for (i = 0; i < toDoObjects.length; i++) {
					var $todoListItem = liaWithEditOrDeleteOnClick(toDoObjects[i], function() {
						$(".tabs a:nth-child(2) span").trigger("click");
					});
					$content.append($todoListItem);
				}
				callback(null, $content);
			}).fail(function(jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	// создаем вкладку Добавить
	tabs.push({
		"name": "Записаться",
		"content":function () {
			$.get("todos.json", function (toDoObjects) {	
				// создание $content для Добавить 
				var $textInput = $("<h3>").text("Введите кличку питомца: "),
					$input = $("<input>").addClass("petName"), 
					$textTag = $("<h3>").text("Введите дату приёма: "),
					$dateInput = $("<input>").addClass("date"),
					$button = $("<button>").text("Записаться"),
					$content1 = $("<ul>"), $content2 = $("<ul>");

				$content1.append($input);
				$content2.append($dateInput);

				$("main .content").append($textInput);
				$("main .content").append($content1);
				$("main .content").append($textTag);
				$("main .content").append($content2);
				$("main .content").append($button); 
				
				function btnfunc() {
					var petName = $input.val(),
						date = $dateInput.val(),
						// создаем новый элемент списка задач
						newToDo = {"petName":petName, "date":date};
					$.post("todos", newToDo, function(result) {
						$input.val("");
						$dateInput.val("");
						$(".tabs a:first-child span").trigger("click");
					});
				}
				$button.on("click", function() {
					btnfunc();
				});
				$('.tags').on('keydown',function(e){
					if (e.which === 13) {
						btnfunc();
					}
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
	$.getJSON("todos.json", function (toDoObjects) {
		main(toDoObjects);
	});
});
